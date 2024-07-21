import mongoose from "mongoose";

const mongodb = process.env.mongodb;

export const connectDB = async () => {
  const { connection } = await mongoose.connect(mongodb);
  console.log(`Mongodb is connected with ${connection.host}`);
};
