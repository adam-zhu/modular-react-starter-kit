import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SAGAS } from "../sagas";

const ExampleModule = props => {
  const exampleData = useSelector(
    rootState => rootState.ExampleModule.exampleData
  );
  const dispatch = useDispatch();
  const reloadDataHandler = e =>
    dispatch({
      type: SAGAS.fetchExampleData.trigger,
      showLoading: true
    });

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
        <>
          <pre>{JSON.stringify(exampleData, null, 2)}</pre>
          <br />
          <button onClick={reloadDataHandler}>Reload Data</button>
        </>
      ) : exampleData === null ? (
        "error loading data"
      ) : (
        <progress />
      )}
    </div>
  );
};

export default ExampleModule;
