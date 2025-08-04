// Simulate fetching products from a fake API
export const fetchProducts = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products = Array.from({ length: 25 }, (_, i) => ({
        id: i + 1,
        name: `Product ${i + 1}`,
      }));
      resolve(products);
    }, 1000);
  });
};
