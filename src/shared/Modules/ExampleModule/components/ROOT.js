import React, { useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getExampleData } from "../selectors";
import ModuleContext from "../module";

const ExampleModule = ({ MODULE_KEY }) => {
  const exampleData = useSelector(
    getExampleData(useContext(ModuleContext) || MODULE_KEY)
  );

  return (
    <div
      style={{
        padding: "1rem",
        margin: "0.5rem 0",
        background: "dimgray",
        color: "white"
      }}
    >
      <h6>Example Module</h6>
      {exampleData ? (
        <pre>{JSON.stringify(exampleData, null, 2)}</pre>
      ) : exampleData === null ? (
        "error loading data"
      ) : (
        <progress />
      )}
    </div>
  );
};

export default ExampleModule;
