const { MongoClient } = require("mongodb");
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

const getMongoConnection = async () => {
  const secretsManagerClient = new SecretsManagerClient({
    region: process.env.REGION,
  });

  try {
    // You will need to manually add a this in AWS Secrets Manager having the name and key: mongoUriDemo
    const mongoUri = await secretsManagerClient.send(
      new GetSecretValueCommand({
        SecretId: "mongoUriDemo",
      })
    );

    const client = new MongoClient(
      JSON.parse(mongoUri.SecretString).mongoUriDemo
    );

    const connection = await client.connect();
    return connection;
  } catch (error) {
    throw error;
  }
};

module.exports = { getMongoConnection };
