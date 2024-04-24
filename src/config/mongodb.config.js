import mongoose from "mongoose";
import ApplicationError from "../middlewares/ErrorHandler.middleware.js";

//mongoose Connection configuration
async function ConnectMongoose() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database is connected with the application");
  } catch (error) {
    console.log(error);
    throw new ApplicationError(
      "Can't connect to the database, please try again later",
      500
    );
  }
}

export default ConnectMongoose;
