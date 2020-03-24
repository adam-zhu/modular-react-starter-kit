import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { ROUTES } from "Routes";
import { getFormattedUserData } from "../selectors";

const GlobalHeader = () => {
  const userData = useSelector(getFormattedUserData);
  const activeStyle = {
    fontWeight: "bold",
    color: "gray"
  };

  return (
    <header id="global-header">
      <div className="logo">👌🤠👍</div>
      <nav>
        <NavLink activeStyle={activeStyle} to={ROUTES.Home.path} exact strict>
          Home
        </NavLink>
        <NavLink activeStyle={activeStyle} to={ROUTES.About.path} exact>
          About
        </NavLink>
      </nav>
      {userData ? userData : userData === undefined ? <progress /> : "ERROR!"}
    </header>
  );
};

export default GlobalHeader;
