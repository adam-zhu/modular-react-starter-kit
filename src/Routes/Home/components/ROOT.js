import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { SAGAS as ExampleModuleSagas } from "Shared/Modules/ExampleModule/sagas";

const ExampleModule = lazy(() => import("Shared/Modules/ExampleModule/module"));

const Home = () => {
  const data = useSelector(rootState => rootState.Home.data);

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
        <ExampleModule
          onMountActions={[
            {
              type: ExampleModuleSagas.fetchExampleData.trigger
            }
          ]}
        />
      </Suspense>
    </>
  );
};

export default Home;
