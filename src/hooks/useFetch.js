import { useState, useEffect } from 'react';
import axios from 'axios';
/**
 * Custom React hook for fetching table data.
 * @param {string} apiUrl - The URL to fetch data from.
 * @param {Object} apiHeaders - The headers to be included in the request.
 * @param {number} currentPage - The current page number.
 * @param {number} inputLimit - The limit for the number of items per page.
 * @param {string} optimized - The optimized value for debouncing search.
 * @returns {Object} An object containing loading state, data, and total pages.
 */
const useFetch = (apiUrl, apiHeaders, currentPage, inputLimit, optimized) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
      /**
     * Function to fetch table data from the API.
     * @returns {void}
     */
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(apiUrl, {
          params: {
            namePrefix: optimized,
            limit: inputLimit,
            offset: (currentPage - 1) * inputLimit,
          },
          headers: {
            [apiHeaders.RAPIDAPI_KEY]: process.env.REACT_APP_RAPIDAPI_KEY,
            [apiHeaders.RAPIDAPI_HOST]: process.env.REACT_APP_RAPIDAPI_HOST,
          },
        });
        setData(response.data.data);
        setTotalPages(Math.ceil(response.data.metadata.totalCount / inputLimit));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    fetchData();
  }, [apiUrl, apiHeaders, currentPage, inputLimit, optimized]);

  return { loading, data, totalPages };
};

export default useFetch;
