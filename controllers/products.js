const { query } = require('express');
const Product = require('../models/product');

// test route
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({})
    .sort('name')
    .select('name price')
    .limit(10)
    .skip(10);
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({}).sort('company name price');
  res.status(200).json({ products, nbHits: products.length });
};

const searchForProducts = async (req, res) => {
  const { featured, company, name, sort, select } = req.query;
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

  // sorting
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  // selecting
  if (select) {
    const selectList = select.split(',').join(' ');
    result = result.select(selectList);
  }

  // pagination & limit
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;

  res.status(200).json({ products, nbHits: products.length });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
  searchForProducts,
};
