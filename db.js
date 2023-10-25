const mongoose = require("mongoose");
const connectToMongoose = () => {
  mongoose
    .connect(process.env.mongoConnUri)
    .then(() => console.log("Connected!"))
    .catch((e) => console.log(`Error: ${e}`));
};

module.exports = { connectToMongoose };
