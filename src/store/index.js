import { applyMiddleware } from "redux";
import { createStore as createDynamicStore } from "redux-dynamic-modules";
import { getSagaExtension } from "redux-dynamic-modules-saga";

import monitorReducersEnhancer from "./enhancers/monitorReducers";
import loggerMiddleware from "./middleware/logger";

export default function configureStore(preloadedState) {
  const generate_middlewares = () => {
    if (process.env.NODE_ENV !== "production") {
      return [loggerMiddleware];
    }

    return [];
  };
  const middlewares = generate_middlewares();
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const generate_enhancers = () => {
    if (process.env.NODE_ENV !== "production") {
      return [middlewareEnhancer, monitorReducersEnhancer];
    }

    return [middlewareEnhancer];
  };

  return createDynamicStore({
    initialState: preloadedState,
    enhancements: [generate_enhancers()],
    extensions: [getSagaExtension()]
  });
}
