import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from './Features/Products/ProductSlice';
import Loader from './Components/Common/Loader';
import Pagination from './Components/Common/Pagination';
import  { showToast} from './Components/Common/ToastAlert';
import ToastAlert from './Components/Common/ToastAlert';


const App = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getProducts())
      .unwrap()
      .then(() => showToast('Products loaded successfully!'))
      .catch(() => showToast('Failed to load products', 'error'));
  }, [dispatch]);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginatedItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Product List</h1>
      <ToastAlert />
      {loading ? (
        <Loader />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <ul className="space-y-2">
            {paginatedItems.map((product) => (
              <li key={product.id} className="p-3 border rounded shadow">
                {product.name}
              </li>
            ))}
          </ul>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}
    </div>
  );
};

export default App;
