import React, { useState, useEffect } from "react";
import "./index.css";
import Search from "../searchBox/SearchBox";
import CustomTable from "../table/table";
import Pagination from "../pagination/pagination";
import LimitInput from "../limitInput/limitInput";
import { useDebounce } from "../../hooks/useDebounce";
import { apiHeaders, apiUrl } from "../../constants";
import useFetch from "../../hooks/useFetch";

const SearchPlaces = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [inputLimit, setInputLimit] = useState(10);
  const { optimized } = useDebounce(search, 500);
  const { loading, data, totalPages } = useFetch(
    apiUrl.GET_CITIES,
    apiHeaders,
    currentPage,
    inputLimit,
    optimized
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleLimitChange = (value) => {
    setInputLimit(value);
  };

  const handleFocusShortcut = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "/") {
      event.preventDefault();
      document.getElementById("search-input").focus();
    }
  };

  //to activate input box on click of 'CTRL+/'
  useEffect(() => {
    document.addEventListener("keydown", handleFocusShortcut);
    return () => {
      document.removeEventListener("keydown", handleFocusShortcut);
    };
  }, []);

  return (
    <div className="wrapper">
      <div className="limit">
        <Search onSearch={handleSearch} search={search} />
        <LimitInput limit={inputLimit} onChange={handleLimitChange} />
      </div>
      <CustomTable data={data} loading={loading} />
      <div className="pagination">
        {!loading && data.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPlaces;
