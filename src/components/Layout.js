
import React from "react";

import { NavLink } from "react-router-dom";
import Search from "./Search";
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

function Header() {
    return (
      <header className="navbar navbar-expand-lg navbar-light bg-danger">
        <nav className="container-fluid">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
              <NavLink className="nav-link" to="/" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ville" activeClassName="active">
                Ville
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/zone" activeClassName="active">
                Zone
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/zoneByVille" activeClassName="active">
                Zone par ville
              </NavLink>
            </li>
            
            <li className="nav-item">
              <NavLink className="nav-link" to="/ajouter-restaurant" activeClassName="active">
                Restaurant
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/serie" activeClassName="active">
                Serie
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/specialite" activeClassName="active">
                Specialite
              </NavLink>
            </li>
            <li>
            
  <NavDropdown title="Recherche" id="navbarScrollingDropdown" style={{paddingLeft:"700px"}}>
    <NavDropdown.Item href="/zoneByVille" className="nav-link" to="/specialite" activeClassName="active">Zone Par Ville</NavDropdown.Item>
    <NavDropdown.Item href="/RestaurantByZoneV">
    Restaurant par Zone et Ville
    </NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item href="#action5">
     Restaurant par Specialite
    </NavDropdown.Item>
  </NavDropdown>
  
            </li>
          </ul>
        </nav>
      </header>
    );
  }
  export default Header;