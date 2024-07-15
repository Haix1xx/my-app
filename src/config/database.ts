import mongoose from "mongoose";

let connected = false;

const connectDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("already connected");
    return;
  }

  try {
    let MONGO_URI = process.env.MONGO_URI;
    if (!MONGO_URI) {
      console.log("Missing connection string");
      return;
    }
    await mongoose.connect(MONGO_URI);
    connected = true;
    console.log("Connection database successfully");
  } catch (err) {
    console.log("Connected fail");
  }
};

export default connectDatabase;
