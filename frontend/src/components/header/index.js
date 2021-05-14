import React from "react";
import { BiHelpCircle } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import Logo from "../assets/logo-topo.png";
import "./header.css";

const Header = () => {
  return (
    <Container>
      <header className="header-container">
        <div className="nav-bar">
          <Link to="/">
            <img src={Logo} className="logo" alt="Centro Integrado de Saúde" />
          </Link>
          <ul className="nav-options">
            <li className="nav-option">
              <BiHelpCircle size="1.5rem" style={{ marginRight: 5 }} />
              (45) 2105-9099
            </li>
            <li className="nav-option">
              <CgProfile size="1.5rem" />
              <Link to="/login">{"Entre e agende uma consulta"}</Link>
            </li>
          </ul>
        </div>
      </header>
    </Container>
  );
};

export default Header;
