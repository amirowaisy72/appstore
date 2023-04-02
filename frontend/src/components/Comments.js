import React, { useContext, useState } from "react";
import contextCreator from "../context/contextCreator";

const Comments = () => {
  const admin = localStorage.getItem("admin")
  let by = ""
  if(!admin){
    by = "User"
  }else{
    by = "Admin"
  }
  const [comment, setComment] = useState({ name: "", by: by, comment: "" });
  const context = useContext(contextCreator);
  const { comments, appid, addComment } = context;

  const onChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addComment(appid, comment.name, comment.by, comment.comment)
    setComment({ name: comment.name, by: "User", comment: "" });
  };

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div
            className="card shadow-0 border"
            style={{ backgroundColor: "#f0f2f5" }}
          >
            <div className="card-body p-4">
              <form autoComplete="off" onSubmit={handleSubmit}>
                {admin ? <input
                  type="text"
                  id="name"
                  name="name"
                  value="Admin"
                  onChange={onChange}
                  className="form-control"
                  placeholder="Name" disabled
                />:<input
                type="text"
                id="name"
                name="name"
                value={comment.name}
                onChange={onChange}
                className="form-control"
                placeholder="Name"
              />}
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="comment"
                    name="comment"
                    value={comment.comment}
                    onChange={onChange}
                    className="form-control"
                    placeholder="Type comment..." required
                  />
                  <button className="btn btn-sm my-2 btn-primary">
                    Submit
                  </button>
                </div>
              </form>

              {comments.map((c) => {
                return (
                  <div key={c._id} className="card mb-4">
                    <div className="card-body">
                      <p>{c.comment}</p>

                      <div className="d-flex justify-content-between">
                        <div className="d-flex flex-row align-items-center">
                          <p className="small mb-0 ms-2">
                            {c.name} | {c.by}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
