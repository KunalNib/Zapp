
import 'dotenv/config';
import mongoose from "mongoose";
import { Product } from '../models/productModel.js';
import { products } from "./data.js";

const MONGO_URI = 'mongodb+srv://kunalnibrad297_db_user:QOmMsgjJDM08lVCG@zapp.mmj5nuk.mongodb.net/?appName=ZAPP';

const seedProducts = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");

    await Product.deleteMany(); // optional: clears old data

    await Product.insertMany(products);

    console.log("Dummy products inserted successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();