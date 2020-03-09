import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ROUTES } from "Routes";
import { ModuleContext } from "../module";
import { getFormattedUserData } from "../selectors";

const GlobalHeader = () => {
  const MODULE_KEY = useContext(ModuleContext);
  const userData = useSelector(getFormattedUserData(MODULE_KEY));
  const activeStyle = {
    fontWeight: "bold",
    color: "gray"
  };

  return (
    <header id="global-header">
      <div className="logo">👌🤠👍</div>
      <nav>
        <NavLink activeStyle={activeStyle} to={ROUTES.HOME.path} exact strict>
          Home
        </NavLink>
        <NavLink activeStyle={activeStyle} to={ROUTES.ABOUT.path} exact>
          About
        </NavLink>
      </nav>
      {userData ? userData : userData === null ? "ERROR!" : <progress />}
    </header>
  );
};

export default GlobalHeader;
