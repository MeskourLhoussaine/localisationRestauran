
import React from "react";

import { NavLink } from "react-router-dom";
import Search from "./Search";
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


function Header() {
    return ( 
      <header>
        <Nav variant="tabs" defaultActiveKey="/home" className="navbar navbar-expand-lg navbar-light bg-danger" >
        <Nav.Item >
        <NavLink className="nav-link" to="/" activeClassName="active" style={{color:"#000000"}}>
                Home
              </NavLink>
        </Nav.Item>
        <Nav.Item>
        <NavLink className="nav-link" to="/ville" activeClassName="active" style={{color:"#000000",backgroundColor:"#dc3545"}}>
                Ville
              </NavLink>
        </Nav.Item>
        <Nav.Item>
        <NavLink className="nav-link" to="/zone" activeClassName="active" style={{color:"#000000",backgroundColor:" #dc3545"}}>
                Zone
              </NavLink>
        </Nav.Item>

        <Nav.Item>
        <NavLink className="nav-link" to="/zoneByVille" activeClassName="active" style={{color:"#000000",backgroundColor:"#dc3545"}}>
                ZonByville
              </NavLink>
        </Nav.Item>

        <Nav.Item>
        <NavLink className="nav-link" to="/restaurant" activeClassName="active" style={{color:"#000000",backgroundColor:"#dc3545"}}>
                Restaurant
              </NavLink>
        </Nav.Item>
     <Nav.Item>
     <NavLink className="nav-link" to="/serie" activeClassName="active" style={{color:"#000000",backgroundColor:"#dc3545"}} >
                Serie
              </NavLink>
     </Nav.Item>
     <Nav.Item>
     <NavLink className="nav-link" to="/specialite" activeClassName="active" style={{color:"#000000" , backgroundColor:"#dc3545"}}>
                Specialite
              </NavLink>
     </Nav.Item>
     
     <DropdownButton id="dropdown-basic-button" title="Dropdown button" variant="secondary" style={{paddingLeft:"530px"}}>
      <Dropdown.Item href="#/action-1" style={{backgroundColor:"#cc5233"}}>Map</Dropdown.Item>
      <Dropdown.Item href="/zoneByVille" style={{backgroundColor:"#bf4c40"}}>Zone Par Ville</Dropdown.Item>
      <Dropdown.Item href="/RestaurantByZoneV" style={{backgroundColor:"#b2474c"}}> Restaurant par Zone et Ville</Dropdown.Item>
    </DropdownButton>

      </Nav>
      </header>
    );
  }
  export default Header;

  /*
  <NavDropdown title="Recherche"  id="navbarScrollingDropdown" style={{paddingLeft:"600px" }}>
    <NavDropdown.Item href="/zoneByVille" className="nav-link" to="/specialite" activeClassName="active">Zone Par Ville</NavDropdown.Item>
    <NavDropdown.Item href="/RestaurantByZoneV">
    Restaurant par Zone et Ville
    </NavDropdown.Item>
    <NavDropdown.Divider />
    <NavDropdown.Item href="#action5">
     Restaurant par Specialite
    </NavDropdown.Item>
  </NavDropdown>*/ 