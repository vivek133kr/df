import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, onPageChange }) => {
  const handlePageChange = (selectedItem) => {
    onPageChange(selectedItem.selected + 1);
  };

  return (
    <ReactPaginate
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageChange}
      previousLabel="<<"
      nextLabel=">>"
      breakLabel="..."
      containerClassName="pagination"
      activeClassName="active"
    />
  );
};

export default Pagination;
