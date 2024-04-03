import React, { useEffect, useState } from "react";

export const useDebounce = (query, delay) => {
  const [optimized, setOptimized] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOptimized(query);
    }, delay);


    return () => {
      clearTimeout(timer);
    };
  }, [query, delay]);

  return { optimized };
};
