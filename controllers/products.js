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
  const { featured, company, name } = req.query;
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

  const products = await Product.find(queryObject);
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
  searchForProducts,
};
