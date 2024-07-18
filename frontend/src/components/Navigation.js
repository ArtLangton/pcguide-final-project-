import { NavLink } from 'react-router-dom';
import logo1 from '../images/logo/logo1.png';
import logo2 from '../images/logo/logo2.png';
import logo3 from '../images/logo/logo3.png';
import logo4 from '../images/logo/logo4.png';
import logo5 from '../images/logo/logo5.png';
import logo6 from '../images/logo/logo6.png';
import logo7 from '../images/logo/logo7.png';
import logo8 from '../images/logo/logo8.png';
import profileIcon from '../images/user.png';
import { useEffect, useState } from 'react';
import { API_ENDPOINT } from '../utils/endPoint';

function Navigation({ setIsLoggedIn, isLoggedIn }) {
  const [logo, setLogo] = useState(logo1);
  const messages = [
    "Welcome!",
    "Any components",
    "Convenient service",
    "All the information",
    "For a better understanding of PC assembly",
    "Build a computer yourself, easy."
  ];

  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Change logo on page load
    const logos = [logo1, logo2, logo3, logo4, logo5, logo6, logo7, logo8];
    const randomLogo = logos[Math.floor(Math.random() * logos.length)];
    setLogo(randomLogo);

    // Change message every 3 seconds
    let index = 0;
    const messageInterval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        index = (index + 1) % messages.length;
        setCurrentMessage(messages[index]);
        setFade(false);
      }, 900);
    }, 6000);

    return () => clearInterval(messageInterval);
  }, []);

  const logoutHandler = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_ENDPOINT}/logout`, {
      method: 'POST',
      credentials: 'include'
    });
    setIsLoggedIn(false);
  };

  return (
    <header>
      <div className="left-menu">
        <NavLink to="/">
          <img src={logo} alt="logo" width="100%" height="80px" />
        </NavLink>
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
          Home
        </NavLink>
        <NavLink to="/need-help" className={({ isActive }) => isActive ? "nav-link-active nav-link-need-help" : "nav-link nav-link-need-help"}>
          Need help?
        </NavLink>
      </div>

      <div className={`header-message ${fade ? 'fade' : ''}`}>{currentMessage}</div>

      <div className="right-menu">
        {!isLoggedIn && (
          <>
            <NavLink to="/register" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
              Register
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => isActive ? "nav-link-active" : "nav-link"}>
              Login
            </NavLink>
          </>
        )}
        {isLoggedIn && (
          <>
            <NavLink to="#">
              <button onClick={logoutHandler}>Logout</button>
            </NavLink>
            <NavLink to="/user">
              <img src={profileIcon} alt='user-profile' />
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
}

export default Navigation;
