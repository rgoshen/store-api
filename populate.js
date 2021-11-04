require('dotenv').config();

const connectDB = require('./db/connect');
const Product = require('./models/product');

// mock data
const jsonProducts = require('./products.json');

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Product.deleteMany(); // cleans out the db
    await Product.create(jsonProducts); // loads test data from json
    console.log('====================================');
    console.log('success');
    console.log('====================================');
    process.exit(0); // exits process successfully once done
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
    process.exit(1); // exits process with error once done
  }
};

start();
