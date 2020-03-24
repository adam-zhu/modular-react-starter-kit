import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { ACTION_TYPES as ExampleModuleActionTypes } from "Shared/Modules/ExampleModule/reducer";

const ExampleModule = lazy(() => import("Shared/Modules/ExampleModule/module"));

const About = () => {
  const data = useSelector(rootState => rootState.About.data);

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
        <ExampleModule
          onMountActions={[
            {
              type: ExampleModuleActionTypes.SET,
              payload: { exampleData: "set by user context" }
            }
          ]}
        />
      </Suspense>
    </>
  );
};

export default About;
