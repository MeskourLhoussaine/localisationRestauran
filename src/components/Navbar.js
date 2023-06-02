import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../style/nav.css";
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
function Navbar() {
	const navRef = useRef();

	const showNavbar = () => {
		navRef.current.classList.toggle(
			"responsive_nav"
		);
	};

	return (
		<header>
			
			<nav ref={navRef}>
			    <Nav.Item>
				<a href="/#">Home</a>
				</Nav.Item>
				<Nav.Item>
				<a href="/ville">Ville</a>
				</Nav.Item>
				<Nav.Item>
				<a href="/zone">Zone</a>
				</Nav.Item>
				
				<Nav.Item>
				<a href="/restaurant"> Restaurant</a>
				</Nav.Item>
				<Nav.Item>
				<a href="/serie"> Serie</a>
				</Nav.Item>
				<Nav.Item>
				<a href="/specialite"> Specialite</a>
				</Nav.Item>
	 <DropdownButton id="dropdown-basic-button" title="Recherche" variant="danger" style={{paddingLeft:"700px"}}>
      <Dropdown.Item href="#/action-1" style={{backgroundColor:"#cc5233"}}>Map</Dropdown.Item>
      <Dropdown.Item href="/zoneByVille" style={{backgroundColor:"#bf4c40"}}>Zone Par Ville</Dropdown.Item>
      <Dropdown.Item href="/RestaurantByZoneV" style={{backgroundColor:"#b2474c"}}> Restaurant par Zone et Ville</Dropdown.Item>
    </DropdownButton>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
			</nav>
			<button
				className="nav-btn"
				onClick={showNavbar}>
				<FaBars />
			</button>
		</header>
	);
}

export default Navbar;