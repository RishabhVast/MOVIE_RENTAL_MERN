import React from "react";
import _ from "lodash";

const Pagination = (props) => {
  const { currentPage, itemsCount, pageSize, onPageChange } = props;
 
  const totalPages = Math.ceil(itemsCount / pageSize);
  if (totalPages === 1) return;
  const pages = _.range(1, totalPages + 1);

  return (
    <div className="my-4">
      <div className="flex justify-center">
        <nav aria-label="Page navigation example">
          <ul className="flex list-style-none">
            
            {pages.map((page) => (
              <li key={page} className="page-item">
                <a
                  onClick={() => onPageChange(page)}
                  className={
                    page === currentPage
                      ? "page-link relative block py-1.5 px-3 border-0 bg-red-600 outline-none transition-all duration-300 rounded-full text-white hover:text-white hover:bg-red-600 shadow-md focus:shadow-md"
                      : "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded-full text-black hover:text-white hover:bg-red-600 focus:shadow-none"
                  }
                >
                  {page}
                </a>
              </li>
            ))}
            
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
