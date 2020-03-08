import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes";

const GlobalHeader = () => {
  const { user } = useSelector(rootState => rootState.GLOBAL);

  return (
    <header id="global-header">
      <div className="logo">👌🤠👍</div>
      <nav>
        <Link to={ROUTES.HOME.path}>Home</Link>
        <Link to={ROUTES.ABOUT.path}>About</Link>
      </nav>
      {user ? (
        <>
          <strong>{user.name}</strong>
          <span>{user.email}</span>
        </>
      ) : user === null ? (
        "ERROR!"
      ) : (
        <progress />
      )}
    </header>
  );
};

export default GlobalHeader;
