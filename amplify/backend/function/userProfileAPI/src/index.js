// amplify/backend/function/userProfileAPI/src/index.js
// Example Lambda function for User Profile API

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const cognito = new AWS.CognitoIdentityServiceProvider();

const USERS_TABLE = process.env.USERS_TABLE;
const USER_POOL_ID = process.env.USER_POOL_ID;

function createResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
}

function getUserFromEvent(event) {
  const claims = event.requestContext.authorizer.claims;
  return {
    userId: claims.sub,
    email: claims.email,
    name: claims.name || claims.email,
    role: claims['custom:role'] || 'Officer',
  };
}

exports.handler = async (event) => {
  console.log('Event:', JSON.stringify(event, null, 2));

  const user = getUserFromEvent(event);
  const httpMethod = event.httpMethod;
  const path = event.path;

  try {
    // ==================== GET CURRENT USER PROFILE ====================
    if (httpMethod === 'GET' && path === '/users/profile') {
      const params = {
        TableName: USERS_TABLE,
        Key: { id: user.userId },
      };

      const result = await dynamodb.get(params).promise();

      if (!result.Item) {
        // If user doesn't exist in DynamoDB, create from Cognito info
        const newUser = {
          id: user.userId,
          email: user.email,
          fullName: user.name,
          role: user.role,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        await dynamodb.put({
          TableName: USERS_TABLE,
          Item: newUser,
        }).promise();

        return createResponse(200, newUser);
      }

      return createResponse(200, result.Item);
    }

    // ==================== UPDATE CURRENT USER PROFILE ====================
    if (httpMethod === 'PUT' && path === '/users/profile') {
      const body = JSON.parse(event.body);
      const now = new Date().toISOString();

      // Get current profile first
      const getParams = {
        TableName: USERS_TABLE,
        Key: { id: user.userId },
      };

      const existing = await dynamodb.get(getParams).promise();

      if (!existing.Item) {
        return createResponse(404, { message: 'User profile not found' });
      }

      // Build update expression dynamically based on what's being updated
      let updateExpression = 'set #updatedAt = :updatedAt';
      const expressionAttributeNames = {
        '#updatedAt': 'updatedAt',
      };
      const expressionAttributeValues = {
        ':updatedAt': now,
      };

      // Allow updating these fields
      const allowedFields = ['fullName', 'phone', 'department', 'position', 'publicServiceNumber'];

      allowedFields.forEach(field => {
        if (body[field] !== undefined) {
          updateExpression += `, #${field} = :${field}`;
          expressionAttributeNames[`#${field}`] = field;
          expressionAttributeValues[`:${field}`] = body[field];
        }
      });

      // Update in DynamoDB
      const updateParams = {
        TableName: USERS_TABLE,
        Key: { id: user.userId },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW',
      };

      const result = await dynamodb.update(updateParams).promise();

      // CRITICAL: Also update Cognito user attributes for consistency
      try {
        const cognitoParams = {
          UserPoolId: USER_POOL_ID,
          Username: user.email,
          UserAttributes: [],
        };

        if (body.fullName) {
          cognitoParams.UserAttributes.push({
            Name: 'name',
            Value: body.fullName,
          });
        }

        if (body.phone) {
          cognitoParams.UserAttributes.push({
            Name: 'phone_number',
            Value: body.phone,
          });
        }

        if (cognitoParams.UserAttributes.length > 0) {
          await cognito.adminUpdateUserAttributes(cognitoParams).promise();
        }
      } catch (cognitoError) {
        console.error('Error updating Cognito attributes:', cognitoError);
        // Continue even if Cognito update fails - DynamoDB is source of truth
      }

      // CRITICAL: Return the updated profile
      // The frontend hook will receive this and update state
      return createResponse(200, result.Attributes);
    }

    // ==================== GET ALL USERS (Super Admin only) ====================
    if (httpMethod === 'GET' && path === '/users') {
      if (user.role !== 'SuperAdmin') {
        return createResponse(403, { message: 'Only Super Admins can view all users' });
      }

      const params = {
        TableName: USERS_TABLE,
      };

      const result = await dynamodb.scan(params).promise();

      return createResponse(200, result.Items);
    }

    // ==================== GET USER BY ID (Super Admin/Engineer) ====================
    if (httpMethod === 'GET' && path.startsWith('/users/') && path !== '/users/profile') {
      if (user.role === 'Officer') {
        return createResponse(403, { message: 'Officers cannot view other user profiles' });
      }

      const userId = path.split('/')[2];

      const params = {
        TableName: USERS_TABLE,
        Key: { id: userId },
      };

      const result = await dynamodb.get(params).promise();

      if (!result.Item) {
        return createResponse(404, { message: 'User not found' });
      }

      return createResponse(200, result.Item);
    }

    // ==================== CREATE NEW USER (Super Admin only) ====================
    if (httpMethod === 'POST' && path === '/users') {
      if (user.role !== 'SuperAdmin') {
        return createResponse(403, { message: 'Only Super Admins can create users' });
      }

      const body = JSON.parse(event.body);
      const now = new Date().toISOString();

      // First create user in Cognito
      const cognitoParams = {
        UserPoolId: USER_POOL_ID,
        Username: body.email,
        UserAttributes: [
          { Name: 'email', Value: body.email },
          { Name: 'email_verified', Value: 'true' },
          { Name: 'name', Value: body.fullName },
          { Name: 'custom:role', Value: body.role },
        ],
        TemporaryPassword: body.temporaryPassword || 'TempPass123!',
      };

      const cognitoResult = await cognito.adminCreateUser(cognitoParams).promise();
      const newUserId = cognitoResult.User.Username;

      // Then create in DynamoDB
      const newUser = {
        id: newUserId,
        email: body.email,
        fullName: body.fullName,
        phone: body.phone || '',
        department: body.department || '',
        position: body.position || '',
        role: body.role,
        publicServiceNumber: body.publicServiceNumber || '',
        createdAt: now,
        updatedAt: now,
      };

      await dynamodb.put({
        TableName: USERS_TABLE,
        Item: newUser,
      }).promise();

      return createResponse(201, newUser);
    }

    // ==================== DELETE USER (Super Admin only) ====================
    if (httpMethod === 'DELETE' && path.startsWith('/users/')) {
      if (user.role !== 'SuperAdmin') {
        return createResponse(403, { message: 'Only Super Admins can delete users' });
      }

      const userId = path.split('/')[2];

      // Don't allow deleting self
      if (userId === user.userId) {
        return createResponse(400, { message: 'Cannot delete your own account' });
      }

      // Get user email for Cognito deletion
      const getParams = {
        TableName: USERS_TABLE,
        Key: { id: userId },
      };

      const existing = await dynamodb.get(getParams).promise();

      if (!existing.Item) {
        return createResponse(404, { message: 'User not found' });
      }

      // Delete from Cognito
      try {
        await cognito.adminDeleteUser({
          UserPoolId: USER_POOL_ID,
          Username: existing.Item.email,
        }).promise();
      } catch (cognitoError) {
        console.error('Error deleting from Cognito:', cognitoError);
        // Continue with DynamoDB deletion even if Cognito fails
      }

      // Delete from DynamoDB
      const deleteParams = {
        TableName: USERS_TABLE,
        Key: { id: userId },
      };

      await dynamodb.delete(deleteParams).promise();

      return createResponse(200, { message: 'User deleted successfully' });
    }

    return createResponse(404, { message: 'Route not found' });

  } catch (error) {
    console.error('Error:', error);
    return createResponse(500, { 
      message: 'Internal server error',
      error: error.message 
    });
  }
};
