import mongoose from "mongoose";

const connectDB = async (dbUrl) => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Mongo DB Connected...");
  } catch (error) {
    console.error("DB connection failed:", error.message);
    throw error;
  }
};

export default connectDB;
