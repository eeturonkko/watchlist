import React from "react";
import "./SearchBar.css";

const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
}) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="search-input"
      />
      <button className="search-button" onClick={onSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
