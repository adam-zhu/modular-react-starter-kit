import React, { lazy, Suspense, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../selectors";
import { ModuleContext } from "../module";

const ExampleModule = lazy(() => import("Shared/Modules/ExampleModule/module"));

const Home = () => {
  const data = useSelector(getData(useContext(ModuleContext).MODULE_KEY));

  // can access child module state
  const HomePageExampleModule1State = useSelector(
    rootState => rootState["HomePageExampleModule1"]
  );
  // will be undefined during first render of parent module
  // since child module not yet mounted)
  console.log({ HomePageExampleModule1State });

  return (
    <>
      <h6>Home page content 👍</h6>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : data === null ? (
        "error loading data"
      ) : (
        <progress />
      )}
      <Suspense fallback={"loading ExampleModule..."}>
        <ExampleModule MODULE_KEY="HomePageExampleModule1" />
        <ExampleModule MODULE_KEY="HomePageExampleModule2" />
      </Suspense>
    </>
  );
};

export default Home;
