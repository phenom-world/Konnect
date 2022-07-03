import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "../components/NotFound";
import { useSelector } from "react-redux";

const generatePage = (pageName) => {
  if (pageName) {
    try {
      const component = () => require(`../pages/${pageName}`).default;

      let Component = React.createElement(component());
      return Component;
    } catch {
      return <NotFound />;
    }
  } else if (pageName !== "") {
    return <NotFound />;
  }
};
const PageRender = () => {
  const { page, id } = useParams();
  const { auth } = useSelector((state) => state);

  let pageName = "";

  if (auth.token) {
    if (id) {
      pageName = `${page}/[id]`;
    } else {
      pageName = `${page}`;
    }
  }

  return generatePage(pageName);
};

export default PageRender;
