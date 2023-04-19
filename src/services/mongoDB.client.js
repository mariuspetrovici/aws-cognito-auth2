const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://assist-masterclass:ASSISTmasterclass@js-masterclass-cluster.nsih42i.mongodb.net/?retryWrites=true&w=majority";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version

const getMongoConnection = async () => {
  const client = new MongoClient(uri);

  const connection = await client.connect();
  return connection;
};

module.exports = { getMongoConnection };
