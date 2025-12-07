// amplify/backend/function/serviceRequestsAPI/src/index.js
// Example Lambda function for Service Requests API

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = process.env.SERVICE_REQUESTS_TABLE;

// Helper to create response
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

// Get user info from Cognito token
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
    // ==================== GET ALL SERVICE REQUESTS ====================
    if (httpMethod === 'GET' && path === '/service-requests') {
      let params = {
        TableName: TABLE_NAME,
      };

      // Officers can only see their own requests
      if (user.role === 'Officer') {
        params.FilterExpression = 'requesterId = :userId';
        params.ExpressionAttributeValues = {
          ':userId': user.userId,
        };
      }

      const result = await dynamodb.scan(params).promise();
      
      // Sort by createdAt descending
      const sortedItems = result.Items.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return createResponse(200, sortedItems);
    }

    // ==================== GET MY REQUESTS (Officer specific) ====================
    if (httpMethod === 'GET' && path === '/service-requests/my-requests') {
      const params = {
        TableName: TABLE_NAME,
        FilterExpression: 'requesterId = :userId',
        ExpressionAttributeValues: {
          ':userId': user.userId,
        },
      };

      const result = await dynamodb.scan(params).promise();
      
      const sortedItems = result.Items.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      return createResponse(200, sortedItems);
    }

    // ==================== GET SERVICE REQUEST BY ID ====================
    if (httpMethod === 'GET' && path.startsWith('/service-requests/') && !path.includes('/status')) {
      const id = path.split('/')[2];

      const params = {
        TableName: TABLE_NAME,
        Key: { id },
      };

      const result = await dynamodb.get(params).promise();

      if (!result.Item) {
        return createResponse(404, { message: 'Service request not found' });
      }

      // Check if user has permission to view this request
      if (user.role === 'Officer' && result.Item.requesterId !== user.userId) {
        return createResponse(403, { message: 'You do not have permission to view this request' });
      }

      return createResponse(200, result.Item);
    }

    // ==================== CREATE SERVICE REQUEST ====================
    if (httpMethod === 'POST' && path === '/service-requests') {
      const body = JSON.parse(event.body);

      const now = new Date().toISOString();
      const item = {
        id: `SR-${Date.now()}`,
        title: body.title,
        description: body.description,
        category: body.category || 'other',
        status: 'pending',
        priority: body.priority || 'medium',
        requesterId: user.userId,
        requesterName: user.name,
        requesterEmail: user.email,
        attachments: body.attachments || [],
        notes: body.notes || '',
        createdAt: now,
        updatedAt: now,
      };

      const params = {
        TableName: TABLE_NAME,
        Item: item,
      };

      await dynamodb.put(params).promise();

      return createResponse(201, item);
    }

    // ==================== UPDATE SERVICE REQUEST ====================
    if (httpMethod === 'PUT' && path.startsWith('/service-requests/') && !path.includes('/status')) {
      const id = path.split('/')[2];
      const body = JSON.parse(event.body);

      // First, get the existing request
      const getParams = {
        TableName: TABLE_NAME,
        Key: { id },
      };

      const existing = await dynamodb.get(getParams).promise();

      if (!existing.Item) {
        return createResponse(404, { message: 'Service request not found' });
      }

      // Check permissions
      if (user.role === 'Officer' && existing.Item.requesterId !== user.userId) {
        return createResponse(403, { message: 'You do not have permission to update this request' });
      }

      const now = new Date().toISOString();

      const updateParams = {
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: 'set #title = :title, #description = :description, #category = :category, #priority = :priority, #notes = :notes, #updatedAt = :updatedAt',
        ExpressionAttributeNames: {
          '#title': 'title',
          '#description': 'description',
          '#category': 'category',
          '#priority': 'priority',
          '#notes': 'notes',
          '#updatedAt': 'updatedAt',
        },
        ExpressionAttributeValues: {
          ':title': body.title || existing.Item.title,
          ':description': body.description || existing.Item.description,
          ':category': body.category || existing.Item.category,
          ':priority': body.priority || existing.Item.priority,
          ':notes': body.notes || existing.Item.notes,
          ':updatedAt': now,
        },
        ReturnValues: 'ALL_NEW',
      };

      const result = await dynamodb.update(updateParams).promise();

      return createResponse(200, result.Attributes);
    }

    // ==================== UPDATE REQUEST STATUS (Engineer/Admin) ====================
    if (httpMethod === 'PATCH' && path.includes('/status')) {
      const id = path.split('/')[2];
      const body = JSON.parse(event.body);

      // Only Engineers and SuperAdmins can update status
      if (user.role === 'Officer') {
        return createResponse(403, { message: 'You do not have permission to update request status' });
      }

      const now = new Date().toISOString();

      const updateParams = {
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: 'set #status = :status, #notes = :notes, #updatedAt = :updatedAt',
        ExpressionAttributeNames: {
          '#status': 'status',
          '#notes': 'notes',
          '#updatedAt': 'updatedAt',
        },
        ExpressionAttributeValues: {
          ':status': body.status,
          ':notes': body.notes || '',
          ':updatedAt': now,
        },
        ReturnValues: 'ALL_NEW',
      };

      const result = await dynamodb.update(updateParams).promise();

      // CRITICAL: This update will now be visible to all users when they refetch
      // The officer's dashboard will show the updated status on next poll/refresh

      return createResponse(200, result.Attributes);
    }

    // ==================== ASSIGN TO ENGINEER ====================
    if (httpMethod === 'PATCH' && path.includes('/assign')) {
      const id = path.split('/')[2];
      const body = JSON.parse(event.body);

      // Only Engineers and SuperAdmins can assign
      if (user.role === 'Officer') {
        return createResponse(403, { message: 'You do not have permission to assign requests' });
      }

      const now = new Date().toISOString();

      const updateParams = {
        TableName: TABLE_NAME,
        Key: { id },
        UpdateExpression: 'set assignedEngineerId = :engineerId, #updatedAt = :updatedAt',
        ExpressionAttributeNames: {
          '#updatedAt': 'updatedAt',
        },
        ExpressionAttributeValues: {
          ':engineerId': body.engineerId,
          ':updatedAt': now,
        },
        ReturnValues: 'ALL_NEW',
      };

      const result = await dynamodb.update(updateParams).promise();

      return createResponse(200, result.Attributes);
    }

    // ==================== DELETE SERVICE REQUEST ====================
    if (httpMethod === 'DELETE' && path.startsWith('/service-requests/')) {
      const id = path.split('/')[2];

      // Get the request first to check permissions
      const getParams = {
        TableName: TABLE_NAME,
        Key: { id },
      };

      const existing = await dynamodb.get(getParams).promise();

      if (!existing.Item) {
        return createResponse(404, { message: 'Service request not found' });
      }

      // Officers can only delete their own requests, Admins can delete any
      if (user.role === 'Officer' && existing.Item.requesterId !== user.userId) {
        return createResponse(403, { message: 'You do not have permission to delete this request' });
      }

      const deleteParams = {
        TableName: TABLE_NAME,
        Key: { id },
      };

      await dynamodb.delete(deleteParams).promise();

      return createResponse(200, { message: 'Service request deleted successfully' });
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
