import React from "react";
import { Link, NavLink } from "react-router-dom";
import './index.css';
import logo from '../images/conekta-logo.svg';

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-color">
      <div className="container">
        <Link to={"/"} className="navbar-brand">
        <a href="/"><img src={logo}alt="conekta logo"/></a>
        </Link>
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink to={"/"} className="nav-link">
              Formulario
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin"} className="nav-link">
              Administrador
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
