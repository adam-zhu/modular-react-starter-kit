import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import GlobalHeader from "./GlobalHeader";

const GlobalEffects = () => {
  const location = useLocation();
  const { pathname, search, hash } = location;

  // reset window scroll if browser location has changed
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const GlobalAppShell = ({ children }) => {
  return (
    <>
      <GlobalEffects />
      <GlobalHeader />
      {children}
    </>
  );
};

export default GlobalAppShell;
