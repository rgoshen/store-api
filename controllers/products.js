const getAllProductsStatic = async (req, res) => {
  res.status(200).json({ msg: 'testing products route' });
};
const getAllProducts = async (req, res) => {
  res.status(200).json({ msg: 'products route' });
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
