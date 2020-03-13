import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import GlobalHeader from "./GlobalHeader";

const AppShellRootComponent = ({ children }) => {
  const location = useLocation();
  const { pathname, search, hash } = location;

  // reset window scroll if browser location has changed
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <GlobalHeader />
      {children}
    </>
  );
};

export default AppShellRootComponent;
