import React from "react";
import "../styles/SearchBar.css";

const SearchBar = ({
  value,
  onChange,
  onSearch,
  placeholder = "Search...",
  checked,
  setChecked,
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

      <div className="search-checkbox-container">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          id="search-multiple"
        />
        <label htmlFor="search-multiple">Search multiple</label>
      </div>
    </div>
  );
};

export default SearchBar;
