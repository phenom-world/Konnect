import React from "react";
import { useSelector } from "react-redux";

import Loading from "./Loading";

const Notify = () => {
  const { alert } = useSelector((state) => state);

  return <div>{alert.loading && <Loading />}</div>;
};

export default Notify;
