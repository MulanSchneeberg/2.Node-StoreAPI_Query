// this file populate empty projects DB with products.json

const Product = require("./model/products");
const connectDB = require("./db/connect");
const all_products = require("./products.json");
require("dotenv").config();
const popuate = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Product.deleteMany();
    console.log("Cleaned all the old products in DB");
    const products = await Product.create(all_products);
    console.log("Populated the DB with new products");
    process.exit(0); // Important
  } catch (error) {
    console.log(err);
    process.exit(1); // Important
  }
};
popuate();
