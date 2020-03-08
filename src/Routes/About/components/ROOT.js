import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../selectors";

const About = () => {
  const data = useSelector(getData);

  return (
    <>
      <h6>About page content 👍</h6>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : data === null ? (
        "error loading data"
      ) : (
        <progress />
      )}
    </>
  );
};

export default About;
