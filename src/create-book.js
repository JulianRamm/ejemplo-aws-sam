const AWS = require("aws-sdk");
const crypto = require("crypto");

const generateUUID = () => crypto.randomBytes(16).toString("hex");

// Initialising the DynamoDB SDK
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const { title } = JSON.parse(event.body);
  const params = {
    TableName: "books",
    Item: {
      id: generateUUID(),
      title: title
    }
  };
  try {
    const data = await documentClient.put(params).promise();
    const response = {
      statusCode: 200
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e)
    };
  }
};