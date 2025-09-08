import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

const getProducts = async (page = 1, limit = 5) => {
  const response = await axios.get(`${API_URL}?limit=${limit}&skip=${(page - 1) * limit}`);
  return response.data.products;
};

const productService = {
  getProducts,
};

export default productService;
