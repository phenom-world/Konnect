import React from "react";
import Menu from "./Menu";
import Search from "./Search";
import Logo from "../Logo";

const Header = () => {
  return (
    <div className="header bg-light">
      <nav
        className="navbar navbar-expand-lg navbar-light 
            bg-light justify-content-between align-middle"
      >
        <div className="logo">
          <h1 className="navbar-brand text-uppercase p-0 m-0" onClick={() => window.scrollTo({ top: 0 })}>
            <div className="d-flex align-items-center justify-content-center mb-4 w-full">
              <Logo />
            </div>{" "}
          </h1>
        </div>

        <Search />

        <Menu />
      </nav>
    </div>
  );
};

export default Header;
