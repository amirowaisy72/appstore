import React, { useContext } from "react";
import { Link } from "react-router-dom";
import contextCreator from "../context/contextCreator";

const Description = () => {
  const context = useContext(contextCreator);
  const { detail } = context;
  return (
    <>
      <div className="container">
        <h3>Details of {detail.title}</h3>
        <div dangerouslySetInnerHTML={{__html:detail.longDesc}} />
        <Link to={detail.link} target="_blank">
          <button type="button" className="btn btn-success btn-lg btn-block">
            Go Directly to Downloading Page
          </button>
        </Link>
      </div>
    </>
  );
};

export default Description;
