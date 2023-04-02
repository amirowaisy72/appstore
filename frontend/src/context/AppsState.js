import React, { useEffect, useState } from "react";
import context from "./contextCreator";

const AppsState = (props) => {
  const host = "http://localhost:5000";
  const [apps, setApps] = useState([]); // Apps to be displayed
  const [detail, setDetail] = useState({});
  const [comments, setComments] = useState([]);
  const [appid, setAppId] = useState(null);

  const takeAppId = (id) => {
    setAppId(id);
  };

  //Get All Apps
  const getApps = async () => {
    const response = await fetch(`${host}/apps/getAll`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    return json
  };

  //Navbar, AppComponent, SearchApps
  const AppsShow = async(request, data) => {
    if(request == 'all'){
      const result = await getApps()
      setApps(result)
    }else if(request == 'getCategories'){
      const result = await getAppsC(data)
      setApps(result)
    }else if(request == 'searchApps'){
      const result = await searchApps(data)
      setApps(result)
    }
  }

  //Get Apps Based on category
  const getAppsC = async (category) => {
    const response = await fetch(`${host}/apps/appscategory`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category }),
    });
    const json = await response.json();
    return json
  };

  //Get detail of an app
  const getDetails = async (id) => {
    const response = await fetch(`${host}/apps/detail/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setDetail(json);
  };

  //Get Comments of an app
  const getComments = async (id) => {
    const response = await fetch(`${host}/comments/getcomments/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    setComments(json);
  };

  //Add Comment
  const addComment = async (appid, name, by, comment) => {
    const response = await fetch(`${host}/comments/addcomment/${appid}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, by, comment }),
    });
    getComments(appid);
  };

  //Search Apps
  const searchApps = async (keyword) => {
    const response = await fetch(`${host}/apps/appsearch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword }),
    });
    const json = await response.json();
    return json
  };

  //Update App
  const updateApp = async (
    appid,
    title,
    shortDesc,
    longDesc,
    category,
    link
  ) => {
    const response = await fetch(`${host}/apps/updateapp/${appid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, shortDesc, longDesc, category, link }),
    });
    const json = await response.json();

    //Logic to edit in client
    let newApps = JSON.parse(JSON.stringify(apps));
    for (let index = 0; index < newApps.length; index++) {
      const element = newApps[index];
      if (element._id == appid) {
        newApps[index].title = title;
        newApps[index].shortDesc = shortDesc;
        newApps[index].longDesc = longDesc;
        newApps[index].category = category;
        newApps[index].link = link;
        break;
      }
    }
    setApps(newApps);
  };

  //Delete app
  const deleteApp = async (appid) => {
    // API Call
    const response = await fetch(`${host}/apps/deleteapp/${appid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    //Delete Clinet side
    const newApps = apps.filter((app) => {
      return app._id !== appid;
    });
    setApps(newApps);
  };

  //Add App
  const addApp = async (
    title,
    shortDesc,
    longDesc,
    category,
    link) => {
    const response = await fetch(`${host}/apps/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title,
        shortDesc,
        longDesc,
        category,
        link }),
    });
    const json = await response.json()
    return json
  };


  return (
    <context.Provider
      value={{
        appid,
        apps,
        detail,
        comments,
        getAppsC,
        getDetails,
        getComments,
        takeAppId,
        addComment,
        searchApps,
        updateApp,
        deleteApp,
        addApp,   
        AppsShow,
      }}
    >
      {props.children}
    </context.Provider>
  );
};

export default AppsState;
