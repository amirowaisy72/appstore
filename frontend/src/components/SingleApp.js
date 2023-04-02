import moment, { months } from "moment/moment";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import contextCreator from "../context/contextCreator";
import { HashLink } from 'react-router-hash-link';

const SingleApp = (props) => {
  const admin = localStorage.getItem("admin");
  const context = useContext(contextCreator);
  const { getDetails, getComments, takeAppId } = context;
  const startDate = props.date;
  const timeEnd = Date.now();

  const dateConverter = (startDate, timeEnd, type) => {
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(timeEnd);
    let result = moment(newStartDate).diff(newEndDate, type);
    return result;
  };

  const timeMaker = () => {
    const years = dateConverter(startDate, timeEnd, "years");
    const month = dateConverter(startDate, timeEnd, "months");
    const days = dateConverter(startDate, timeEnd, "days");
    const hours = dateConverter(startDate, timeEnd, "hours");
    const minutes = dateConverter(startDate, timeEnd, "minutes");
    if (years != 0) {
      return Math.abs(years) + " Years ago";
    } else if (month != 0) {
      return Math.abs(month) + " Months ago";
    } else if (days != 0) {
      return Math.abs(days) + " Days ago";
    } else if (hours != 0) {
      return Math.abs(hours) + " Hours ago";
    } else if (minutes != 0) {
      return Math.abs(minutes) + " Minutes ago";
    } else {
      return "Just now";
    }
  };

  const time = timeMaker();

  return (
    <div className="col-md-3 my-1">
      <div className="card" style={{ width: "18rem" }}>
        <div className="card-body">
          <HashLink
            to="/appDescription/#desc"
            onClick={() => {
              getDetails(props.id);
              getComments(props.id);
              takeAppId(props.id);
            }}
            style={{ textDecoration: "none", color: "black" }}
          >
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.description}</p>
            <small>{time}</small>
          </HashLink>
          {admin ? (
            <>
              <i
                className="fa-solid fa-pen-to-square mx-2"
                onClick={() => {
                  props.updateTrigger(props.app);
                }}
              ></i>
              <i
                className="fa-solid fa-trash"
                onClick={() => {
                  props.deleteTrigger(props.id);
                }}
              ></i>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleApp;
