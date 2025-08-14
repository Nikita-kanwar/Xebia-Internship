import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [...Array(totalPages).keys()].map(n => n + 1);

  return (
    <div className="flex space-x-2 justify-center my-4">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded ${currentPage === page ? 'bg-blue-500 text-white' : 'bg-white text-black'}`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
