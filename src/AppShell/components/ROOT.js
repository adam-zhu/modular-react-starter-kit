import React, { useEffect } from "react";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import GlobalHeader from "./GlobalHeader";
import Routes from "Routes";

const AppShell = () => {
  return (
    <Router>
      <GlobalHeader />
      <AppShellContent />
    </Router>
  );
};

const AppShellContent = () => {
  const location = useLocation();
  const { pathname, search, hash } = location;

  // reset window scroll if browser location has changed
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <Routes />;
};

export default AppShell;
