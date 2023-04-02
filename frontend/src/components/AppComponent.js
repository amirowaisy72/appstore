import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import contextCreator from "../context/contextCreator";
import AllApps from "./AllApps";
import SearchApps from "./SearchApps";

const Categories = () => {
  const context = useContext(contextCreator);
  const { AppsShow } = context;

  useEffect(()=>{
    AppsShow('all', '')
  }, [])

  const [data, setData] = useState([]);
  let location = useLocation();

  //API Call
  const host = "http://localhost:5000";
  const fetchData = async () => {
    const response = await fetch(`${host}/apps/allcategories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* Categories  */}
      <div className="container">
        <ul className="nav nav-tabs">
          {data.map((d) => {
            return (
              <li
                key={d}
                className="nav-item"
                onClick={() => {
                  AppsShow('getCategories',d)
                }}
              >
                <Link
                  className={`nav-link ${
                    location.pathname == `/` + d ? "active" : ""
                  }`}
                  aria-current="page"
                  to=""
                >
                  {d}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Search Bar */}
      <SearchApps />
      <AllApps />
    </>
  );
};

export default Categories;
