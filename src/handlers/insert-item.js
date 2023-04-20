const { getMongoConnection } = require("../services/mongoDB.client");

exports.insertItem = async (event) => {
  console.log(event);
  try {
    const mongoClient = await getMongoConnection();

    const result = await mongoClient
      .db("masterclassDB")
      .collection("bookd")
      .insertOne(JSON.parse(event.body));

    await mongoClient.close();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Item was inserted",
        id: result.insertedId.toString(),
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "An error occured while inserting the item",
        errorMessage: err,
      }),
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
  }
};
