import { useState, useRef, useEffect } from "react";
import { TiHome } from "react-icons/ti";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserMd } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import logo from "/lg1.png";
import "../styles/Navbar.css";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const navbarRef = useRef(null);
  const navigateTo = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navigateToPage = (path) => {
    navigateTo(path);
    setShow(false);
  };

  return (
    <>
      <nav ref={navbarRef} className={`navbar ${show ? "show" : ""}`}>
        <div className="logo-container">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className={`links ${show ? "open" : ""}`}>
          <div onClick={() => navigateToPage("/")}>
            <TiHome />
            <span>Home</span>
          </div>
          <div onClick={() => navigateToPage("/doctors")}>
            <FaUserMd/>
            <span>Doctors</span>
          </div>
          <div onClick={() => navigateToPage("/admitted-patients")}>
            <FaUserMd/>
            <span>Patients</span>
          </div>
          <div onClick={() => navigateToPage("/doctor/addnew")}>
            <IoPersonAddSharp />
            <span>Add New Doctor</span>
          </div>
          <div onClick={() => (window.location.href = "http://localhost:5173/")}>
            <TiHome />
            <span>Go to Frontend</span>
          </div>
        </div>
        <div className="hamburger-wrapper">
          <GiHamburgerMenu
            className="hamburger"
            onClick={() => setShow((prev) => !prev)}
          />
        </div>
      </nav>
      {show && <div className="overlay" onClick={() => setShow(false)}></div>}
    </>
  );
};

export default Navbar;
