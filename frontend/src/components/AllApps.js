import React, { useContext, useEffect, useState } from "react";
import contextCreator from "../context/contextCreator";
import Pagination from "./Pagination";
import SingleApp from "./SingleApp";
import UpdateApp from "./UpdateApp";

const AllApps = () => {
  const context = useContext(contextCreator);
  const { apps, updateApp, deleteApp } = context;
  //Pagination
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(20)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  if(loading){
    <h2>Loading...</h2>
  }

  //Get Current Posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = apps.slice(indexOfFirstPost, indexOfLastPost)

  //Update logic with UpdateApp and SingleApp Component
  const [show, setShow] = useState(false);
  const [appUp, setAppUp] = useState({
    title: "",
    shortDesc: "",
    longDesc: "",
    link: "",
    category: "",
  });

  const updateTrigger = (app) => {
    showModal();
    setAppUp({
      id: app._id,
      title: app.title,
      shortDesc: app.shortDesc,
      longDesc: app.longDesc,
      link: app.link,
      category: app.category,
    });
  };

  const showModal = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const onChangeUp = (e) => {
    setAppUp({ ...appUp, [e.target.name]: e.target.value });
  };

  const updateSubmit = (appid) => {
    updateApp(
      appid,
      appUp.title,
      appUp.shortDesc,
      appUp.longDesc,
      appUp.category,
      appUp.link
    );
    setShow(false);
  };
  //Update logic End

  //Delete Logic
  const deleteTrigger = (appid) => {
    deleteApp(appid);
  };

  return (
    <>
      <UpdateApp
        updateSubmit={updateSubmit}
        onChangeUp={onChangeUp}
        appUp={appUp}
        show={show}
        handleClose={handleClose}
      />
      <div className="container my-2">
        <div className="row">
          {currentPosts.map((a) => {
            return (
              <SingleApp
                deleteTrigger={deleteTrigger}
                app={a}
                updateTrigger={updateTrigger}
                key={a._id}
                id={a._id}
                title={a.title}
                description={a.shortDesc}
                date={a.date}
              />
            );
          })}
        </div>
      </div>
      <div className="container">
      <Pagination postsPerPage={postsPerPage} totalPosts={apps.length} paginate={paginate} />
      </div>
    </>
  );
};

export default AllApps;
