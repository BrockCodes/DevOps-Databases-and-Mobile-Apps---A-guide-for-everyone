To connect MongoDB Atlas to AWS IAM with privilege access levels using functions, you can follow these steps:

First, create an AWS Lambda function that will act as a bridge between MongoDB Atlas and AWS IAM. This function should be written in a language that is supported by AWS Lambda, such as Node.js or Python.

Next, you will need to configure your MongoDB Atlas cluster to use AWS IAM as the authentication mechanism. This can be done through the MongoDB Atlas web interface by selecting the cluster and navigating to the “Security” tab.

Once you have configured your cluster to use AWS IAM, you will need to create an IAM role that grants the necessary permissions to access the MongoDB Atlas cluster. This IAM role should have a policy attached to it that grants access to the Lambda function you created in step 1.

Finally, you can invoke the Lambda function from your application to authenticate with AWS IAM and access the MongoDB Atlas cluster. The function should check the user’s credentials and determine their access privileges before allowing them to perform any operations on the database.

Here is an example Node.js code for the AWS Lambda function, this is from AWS side to Atlas, but you can swap it around. I usually just use this method.:
'''
const { MongoClient } = require('mongodb');
const AWS = require('aws-sdk');
const iam = new AWS.IAM();

exports.handler = async (event) => {
  const username = event.requestContext.authorizer.claims['cognito:username'];
  const dbName = 'mydatabase';

  // Assume IAM role to access MongoDB Atlas
  const params = {
    RoleArn: 'arn:aws:iam::123456789012:role/my-role',
    RoleSessionName: 'session1'
  };
  const credentials = await iam.assumeRole(params).promise();
  
  // Connect to MongoDB Atlas
  const uri = `mongodb+srv://${credentials.AccessKeyId}:${credentials.SecretAccessKey}@mycluster.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  
  // Get user's access privileges
  const db = client.db(dbName);
  const user = await db.collection('users').findOne({ username: username });
  const privileges = user.privileges;
  
  // Perform database operation based on user's access privileges
  // ...
  
  // Disconnect from MongoDB Atlas
  await client.close();

  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
};
'''
In this example, the Lambda function assumes an IAM role to access the MongoDB Atlas cluster, retrieves the user’s access privileges from the database, and performs a database operation based on those privileges. You can customize this function to meet the specific needs of your application.
