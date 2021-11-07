const { query } = require('express');
const Product = require('../models/product');

// test route
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).sort('name -price');
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products, nbHits: products.length });
};

const searchForProducts = async (req, res) => {
  const { featured, company, name, sort } = req.query;
  const queryObject = {};

  // query string parameter filters
  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  let result = Product.find(queryObject);

  if (sort) {
    console.log(sort);
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  const products = await result;

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
  searchForProducts,
};
