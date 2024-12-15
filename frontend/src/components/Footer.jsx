import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/lg1.png" alt="logo" className="logo-img" />
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/appointment"}>Appointment</Link>
            </li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contact</h4>
          <ul>
            <li>
              <FaPhone /> <span>+254 752958033</span>
            </li>
            <li>
              <MdEmail /> <span>kithinjimutwir1@gmail.com</span>
            </li>
            <li>
              <FaLocationArrow /> <span>Nairobi, Kenya</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Hospital Management System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
