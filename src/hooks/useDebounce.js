import React, { useEffect, useState } from "react";
/**
 * Custom React hook for debouncing a value.
 * @param {string} query - The value to be debounced.
 * @param {number} delay - The delay (in milliseconds) before updating the debounced value.
 * @returns {Object} An object containing the debounced value.
 */
export const useDebounce = (query, delay) => {
  const [optimized, setOptimized] = useState(query);

  useEffect(() => {
    /**
     * Timer to delay updating the debounced value.
     * @type {NodeJS.Timeout}
     */
    const timer = setTimeout(() => {
      setOptimized(query);
    }, delay);


    return () => {
      clearTimeout(timer);
    };
  }, [query, delay]);

  return { optimized };
};
