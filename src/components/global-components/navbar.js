import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import LCKLogo from '../../assets/images/WhiteLCKLogo.jpg';
import DropDownButton from "../../assets/images/DropDownButtonWhite.png";
import "./navbar.css";
import ExternalNavLink from "./external-nav-link";

function Navbar() {
  const [showNavElements, setShowNavElements] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleNavElements = () => {
    setShowNavElements(!showNavElements);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src={LCKLogo} alt="LCK Logo" />
        </div>
        <div className={`nav-elements ${showNavElements && "active"}`}>
          <ul>
          <li>
              <NavLink to="/">STANDINGS</NavLink>
            </li>
            <li>
              <NavLink to="/matches">MATCHES</NavLink>
            </li>
            <li>
              <NavLink to="/teams">TEAMS</NavLink>
            </li>
            <li>
              <NavLink to="/players">PLAYERS</NavLink>
            </li>
            <li>
              <NavLink to="/champions">CHAMPIONS</NavLink>
            </li>
            {isSmallScreen && (
              <li>
                <button className="fetch-data-button">FETCH DATA</button>
              </li>
            )}
            <li>
              <ExternalNavLink to="https://lolesports.com/schedule?leagues=lck">
                LOL E-SPORTS
              </ExternalNavLink>
            </li>
          </ul>
        </div>

        {!isSmallScreen && (
          <div id="fetch-data-button-container">
            <button className="fetch-data-button">FETCH DATA</button>
          </div>
        )}
        <div className="nav-elements-button" onClick={toggleNavElements}>
          <img src={DropDownButton} alt="Drop Down Button" />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
