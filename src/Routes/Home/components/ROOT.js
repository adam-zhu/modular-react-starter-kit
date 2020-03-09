import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getData } from "../selectors";
import { ModuleContext } from "../module";
import ExampleModule from "Shared/Modules/ExampleModule/module";

const Home = ({ MODULE_KEY }) => {
  const data = useSelector(getData(useContext(ModuleContext) || MODULE_KEY));

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
      <ExampleModule MODULE_KEY="HomePageExampleModule1" />
      <ExampleModule MODULE_KEY="HomePageExampleModule2" />
    </>
  );
};

export default Home;
