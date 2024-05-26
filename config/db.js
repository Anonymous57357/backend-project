import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      process.env.CLOUD_DB_CONN_STR,
    );
    console.log(
      `MONGODB connection successfull !! DB HOST: ${connectionInstance.connection.host}`
        .cyan.underline.bold,
    );
  } catch (err) {
    console.log(`MONGODB connection FAILED: ${err.message}`.red.underline.bold);
    process.exit(1);
  }
};

export default connectDB;
