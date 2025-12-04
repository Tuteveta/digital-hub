import { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminAddUserToGroupCommand } from '@aws-sdk/client-cognito-identity-provider';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

const cognitoClient = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });
const sesClient = new SESClient({ region: process.env.AWS_REGION });

export const handler = async (event: any) => {
  const { 
    email, 
    fullName, 
    publicServiceNumber,
    applicationId 
  } = JSON.parse(event.body);

  try {
    // 1. Create Cognito User
    const createUserCommand = new AdminCreateUserCommand({
      UserPoolId: process.env.USER_POOL_ID,
      Username: email,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
        {
          Name: 'email_verified',
          Value: 'true',
        },
        {
          Name: 'name',
          Value: fullName,
        },
        {
          Name: 'custom:publicServiceNumber',
          Value: publicServiceNumber,
        },
        {
          Name: 'custom:role',
          Value: 'officer',
        },
      ],
      DesiredDeliveryMediums: ['EMAIL'],
      MessageAction: 'SUPPRESS', // We'll send our own email
    });

    const createUserResponse = await cognitoClient.send(createUserCommand);

    // 2. Add User to "Officers" Group
    const addToGroupCommand = new AdminAddUserToGroupCommand({
      UserPoolId: process.env.USER_POOL_ID,
      Username: email,
      GroupName: 'Officers',
    });

    await cognitoClient.send(addToGroupCommand);

    // 3. Generate Temporary Password
    const tempPassword = generateSecurePassword();

    // 4. Set Temporary Password
    const setPasswordCommand = new AdminSetUserPasswordCommand({
      UserPoolId: process.env.USER_POOL_ID,
      Username: email,
      Password: tempPassword,
      Permanent: false, // User must change on first login
    });

    await cognitoClient.send(setPasswordCommand);

    // 5. Send Welcome Email with Credentials
    await sendWelcomeEmail(email, fullName, tempPassword, applicationId);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Officer account created successfully',
        username: email,
      }),
    };
  } catch (error) {
    console.error('Error creating officer account:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Failed to create officer account',
        error: error.message,
      }),
    };
  }
};

function generateSecurePassword(): string {
  const length = 12;
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
  let password = '';
  
  // Ensure at least one of each required character type
  password += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]; // Uppercase
  password += 'abcdefghijklmnopqrstuvwxyz'[Math.floor(Math.random() * 26)]; // Lowercase
  password += '0123456789'[Math.floor(Math.random() * 10)]; // Number
  password += '!@#$%^&*'[Math.floor(Math.random() * 8)]; // Special
  
  // Fill remaining characters
  for (let i = password.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
}

async function sendWelcomeEmail(email: string, fullName: string, tempPassword: string, applicationId: string) {
  const emailParams = {
    Source: process.env.FROM_EMAIL || 'noreply@digital.gov.pg',
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Subject: {
        Data: '🎉 Your Officer Account Has Been Approved - Digital Hub',
      },
      Body: {
        Html: {
          Data: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #f97316 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                .credentials { background: white; border: 2px solid #f97316; border-radius: 8px; padding: 20px; margin: 20px 0; }
                .credential-row { margin: 10px 0; }
                .credential-label { font-weight: bold; color: #666; }
                .credential-value { font-family: monospace; background: #f0f0f0; padding: 8px; border-radius: 4px; display: inline-block; }
                .button { display: inline-block; background: #f97316; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
                .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
                .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🎉 Welcome to Digital Hub!</h1>
                </div>
                <div class="content">
                  <h2>Dear ${fullName},</h2>
                  
                  <p>Congratulations! Your officer application (Reference: <strong>${applicationId}</strong>) has been approved.</p>
                  
                  <p>Your account has been created and you can now access the Digital Hub platform.</p>
                  
                  <div class="credentials">
                    <h3>Your Login Credentials</h3>
                    <div class="credential-row">
                      <div class="credential-label">Email / Username:</div>
                      <div class="credential-value">${email}</div>
                    </div>
                    <div class="credential-row">
                      <div class="credential-label">Temporary Password:</div>
                      <div class="credential-value">${tempPassword}</div>
                    </div>
                  </div>
                  
                  <div class="warning">
                    <strong>⚠️ Important Security Notice:</strong>
                    <ul>
                      <li>This is a temporary password that expires after first use</li>
                      <li>You will be required to change your password upon first login</li>
                      <li>Never share your password with anyone</li>
                      <li>Choose a strong, unique password</li>
                    </ul>
                  </div>
                  
                  <center>
                    <a href="https://hub.digital.gov.pg" class="button">Sign In to Digital Hub</a>
                  </center>
                  
                  <h3>Next Steps:</h3>
                  <ol>
                    <li>Click the "Sign In" button above</li>
                    <li>Enter your email and temporary password</li>
                    <li>Create a new secure password when prompted</li>
                    <li>Complete your profile setup</li>
                    <li>Start exploring the platform!</li>
                  </ol>
                  
                  <p>If you have any questions or need assistance, please contact our support team.</p>
                  
                  <p>Best regards,<br>
                  <strong>Digital Hub Team</strong></p>
                  
                  <div class="footer">
                    <p>© 2025 Digital Hub. All rights reserved.</p>
                    <p>This is an automated message. Please do not reply to this email.</p>
                  </div>
                </div>
              </div>
            </body>
            </html>
          `,
        },
        Text: {
          Data: `
Dear ${fullName},

Congratulations! Your officer application (Reference: ${applicationId}) has been approved.

Your Login Credentials:
Email / Username: ${email}
Temporary Password: ${tempPassword}

IMPORTANT: This is a temporary password. You must change it upon first login.

Sign in at: https://hub.digital.gov.pg

Next Steps:
1. Click the sign in link above
2. Enter your email and temporary password
3. Create a new secure password when prompted
4. Complete your profile setup
5. Start exploring the platform!

Best regards,
Digital Hub Team

© 2025 Digital Hub. All rights reserved.
          `,
        },
      },
    },
  };

  await sesClient.send(new SendEmailCommand(emailParams));
}