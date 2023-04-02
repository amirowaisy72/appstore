import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const UpdateApp = (props) => {

  const handleClick = (e) => {
    e.preventDefault();
    // handleClose();
  };

  

//   const updateApp = (app) => {
//     setShow(true);
//     // setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag })
//   };

  return (
    <Modal show={props.show} onHide={()=>{props.handleClose()}}>
      <div>
        <div className="container my-3">
          <h2>Update App</h2>
          <form>
            <div className="form-group my-2">
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                aria-describedby="emailHelp"
                placeholder="Enter Title"
                value={props.appUp.title}
                onChange={props.onChangeUp}
              />
            </div>
            <div className="form-group my-2">
              <input
                type="text"
                className="form-control"
                id="shortDesc"
                name="shortDesc"
                placeholder="Short Description"
                value={props.appUp.shortDesc}
                onChange={props.onChangeUp}
              />
            </div>
            <div className="form-group">
                <textarea
                  className="form-control"
                  id="longDesc"
                  name="longDesc"
                  placeholder="Long Description"
                  value={props.appUp.longDesc}
                  onChange={props.onChangeUp}
                  autoComplete="off"
                  cols="30"
                  rows="25"
                ></textarea>
              </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                placeholder="Category"
                value={props.appUp.category}
                onChange={props.onChangeUp}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                id="link"
                name="link"
                placeholder="Link"
                value={props.appUp.link}
                onChange={props.onChangeUp}
              />
            </div>
            <div
              disabled={
                props.appUp.title.length < 3 ||
                props.appUp.shortDesc.length < 3 ||
                props.appUp.longDesc.length < 3 ||
                props.appUp.link.length < 3
              }
              onClick={()=>{props.updateSubmit(props.appUp.id)}}
              className="btn btn-primary my-3"
            >
              Update App
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default UpdateApp;
