import React, { useContext, useState } from "react";
import contextCreator from "../../context/contextCreator";

const Admin = () => {
  const [app, setApp] = useState({
    title: "",
    shortDesc: "",
    longDesc: "",
    link: "",
    category: "",
  });

  const [auth, setAuth] = useState({
    username: "",
    password: "",
  });

  const onChangeAuth = (e) => {
    setAuth({ ...auth, [e.target.name]: e.target.value });
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if (
      auth.username == "amirowaisyisagoodboy" &&
      auth.password == "amirowaisyisagoodboy"
    ) {
      localStorage.setItem("admin", true);
      console.log(auth.username)
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("admin");
  };

  const context = useContext(contextCreator);
  const { addApp } = context;

  const onChangeUp = (e) => {
    setApp({ ...app, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await addApp(
      app.title,
      app.shortDesc,
      app.longDesc,
      app.category,
      app.link
    );
    if (response.success == true) {
      setApp({title: "",
      shortDesc: "",
      longDesc: "",
      link: "",
      category: "",})
    }
  };

  //Authentication
  const admin = localStorage.getItem("admin");

  return (
    <>
      {admin ? (
        <form>
          <div>
            <div className="container my-3">
              <hr />
              <button className="btn btn-primary" onClick={handleLogout}>
                Logout
              </button>
              <h2 className="text-center">Add App</h2>

              <div className="form-group my-2">
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="title"
                  aria-describedby="emailHelp"
                  placeholder="Enter Title"
                  value={app.title}
                  onChange={onChangeUp}
                  autoComplete="off"
                />
              </div>
              <div className="form-group my-2">
                <input
                  type="text"
                  className="form-control"
                  id="shortDesc"
                  name="shortDesc"
                  placeholder="Short Description"
                  value={app.shortDesc}
                  onChange={onChangeUp}
                  autoComplete="off"
                />
              </div>
              <div className="form-group">
                <textarea
                  className="form-control"
                  id="longDesc"
                  name="longDesc"
                  placeholder="Long Description"
                  value={app.longDesc}
                  onChange={onChangeUp}
                  autoComplete="off"
                  cols="30"
                  rows="25"
                ></textarea>
              </div>
              <div className="form-group my-2">
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  name="category"
                  placeholder="Category"
                  value={app.category}
                  onChange={onChangeUp}
                  autoComplete="off"
                />
              </div>
              <div className="form-group my-2">
                <input
                  type="text"
                  className="form-control"
                  id="link"
                  name="link"
                  placeholder="Link"
                  value={app.link}
                  onChange={onChangeUp}
                  autoComplete="off"
                />
              </div>
              <button
                disabled={
                  app.title.length < 3 ||
                  app.shortDesc.length < 3 ||
                  app.longDesc.length < 3 ||
                  app.link.length < 3
                }
                onClick={handleClick}
                className="btn btn-primary my-3"
              >
                Add App
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className="container">
          <form>
            <div className="form-group my-2">
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                aria-describedby="emailHelp"
                placeholder="Enter Username"
                value={auth.username}
                onChange={onChangeAuth}
                autoComplete="off"
              />
            </div>
            <div className="form-group my-2">
              <input
                type="text"
                className="form-control"
                id="password"
                name="password"
                aria-describedby="emailHelp"
                placeholder="Enter Password"
                value={auth.password}
                onChange={onChangeAuth}
                autoComplete="off"
              />
            </div>
            <button className="btn btn-primary" onClick={handleAuth}>
              Login
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Admin;
