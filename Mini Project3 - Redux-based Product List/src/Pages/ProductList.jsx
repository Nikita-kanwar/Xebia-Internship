import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../Features/Products/ProductSlice';
import Loader from '../Components/Common/Loader';
import CustomPagination from '../Components/Common/Pagination';
import { showToast } from '../Components/Common/Toast';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(state => state.products);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    dispatch(fetchProducts({ page, limit }))
      .unwrap()
      .then(() => showToast('success', 'Products loaded successfully'))
      .catch(() => showToast('error', 'Failed to load products'));
  }, [dispatch, page]);

  if (loading) return <Loader />;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Product List</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
      <CustomPagination totalPages={10} currentPage={page} onChange={setPage} />
    </div>
  );
};

export default ProductList;
