const express = require('express');
const router = express.Router();

const {
  getAllProducts,
  getAllProductsStatic,
  searchForProducts,
} = require('../controllers/products');

router.route('/').get(getAllProducts);
router.route('/query').get(searchForProducts);
router.route('/static').get(getAllProductsStatic);

module.exports = router;
