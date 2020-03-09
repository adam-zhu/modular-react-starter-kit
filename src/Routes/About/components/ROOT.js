import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../selectors";
import { ModuleContext } from "../module";
import ExampleModule from "Shared/Modules/ExampleModule/module";

const About = ({ MODULE_KEY }) => {
  const data = useSelector(getData(useContext(ModuleContext) || MODULE_KEY));

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
      <ExampleModule MODULE_KEY="AboutPageExampleModule1" />
      <ExampleModule MODULE_KEY="AboutPageExampleModule2" />
    </>
  );
};

export default About;
