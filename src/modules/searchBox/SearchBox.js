import React from "react";
import "./SearchBox.css";

const Search = ({ onSearch, search }) => {
  return (
    <div className="search-box">
      <input
        type="text"
        id="search-input"
        value={search}
        onChange={onSearch}
        placeholder="Start searching"
        className="search-input"
      />
      <span className="keyboard-shortcut">CTRL + /</span>
    </div>
  );
};

export default Search;
