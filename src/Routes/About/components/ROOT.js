import React, { lazy, Suspense, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../selectors";
import { ModuleContext } from "../module";

const ExampleModule = lazy(() => import("Shared/Modules/ExampleModule/module"));

const About = () => {
  const data = useSelector(getData(useContext(ModuleContext).MODULE_KEY));

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
      <Suspense fallback={"loading ExampleModule..."}>
        <ExampleModule MODULE_KEY="AboutPageExampleModule1" />
        <ExampleModule MODULE_KEY="AboutPageExampleModule2" />
      </Suspense>
    </>
  );
};

export default About;
