const { getMongoConnection } = require("../services/mongoDB.client");

exports.getAllItemsHandler = async (event) => {
  try {
    const mongoClient = await getMongoConnection();

    const result = await mongoClient
      .db("masterclassDB")
      .collection("bookd")
      .find({})
      .toArray();

    await mongoClient.close();
    console.log(result);
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (err) {
    console.log(err);
    return { statusCode: 500, body: JSON.stringify(err) };
  }
};
