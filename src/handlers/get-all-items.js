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
    return {
      statusCode: 200,
      body: JSON.stringify(result),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occured while fetching all the items",
        errorMessage: err,
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
