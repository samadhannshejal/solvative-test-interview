import React, { useState, useEffect } from "react";
import "./index.css";
import axios from "axios";
import Search from "../searchBox/SearchBox";
import CustomTable from "../table/table";
import Pagination from "../pagination/pagination";
import LimitInput from "../limitInput/limitInput";
import { useDebounce } from "../../hooks/useDebounce";
import { apiHeaders, apiUrl } from "../../constants";

const SearchPlaces = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [inputLimit, setInputLimit] = useState(10);
  const { optimized } = useDebounce(search, 500);

  console.log(optimized);
  const getTableData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        apiUrl.GET_CITIES,
        {
          params: {
            namePrefix: optimized,
            limit: inputLimit,
            offset: (currentPage - 1) * inputLimit,
          },
          headers: {
            [apiHeaders.RAPIDAPI_KEY]:process.env.REACT_APP_RAPIDAPI_KEY,
            [apiHeaders.RAPIDAPI_HOST]: process.env.REACT_APP_RAPIDAPI_HOST,
          },
        }
      );
      setData(response.data.data);
      setTotalPages(Math.ceil(response.data.metadata.totalCount / inputLimit));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

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

  useEffect(() => {
    getTableData();
  }, [currentPage, inputLimit, optimized]);

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
