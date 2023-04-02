import React, { useContext } from "react";
import contextCreator from "../context/contextCreator";

const SearchApps = () => {
    const context = useContext(contextCreator)
    const { AppsShow } = context

    const handleSearch = (e) => {
      AppsShow('searchApps', e.target.value)
    }
  return (
    <div className="container">
      <div className="input-group rounded">
        <input
          type="search"
          className="form-control rounded"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon" onChange={handleSearch}
        />
      </div>
    </div>
  );
};

export default SearchApps;
