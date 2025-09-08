import React from 'react';
import { Pagination } from '@mui/material';

const CustomPagination = ({ totalPages, currentPage, onChange }) => (
  <Pagination
    count={totalPages}
    page={currentPage}
    onChange={(e, value) => onChange(value)}
    color="primary"
  />
);

export default CustomPagination;
