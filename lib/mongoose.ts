import mongoose from "mongoose";

let isConnected = false;
export async function connectDb() {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) return console.log("Provide MongoDB URI");
  if (!isConnected) console.log("Already Connected to MongoDB");
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.log(`Error Occured: ${error.message}`);
  }
}
