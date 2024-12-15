
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import "../styles/Footer.css";

const Footer = () => {
  

  return (
    <>
      <footer className={"container"}>
        <hr />
        <div className="content">
          <div>
            <img src="/lg1.png" alt="logo" className="logo-img"/>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/appointment"}>Appointment</Link>
              <Link to={"/about"}>About</Link>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <div>
              <FaPhone />
              <span>+254 752958033</span>
            </div>
            <div>
              <MdEmail />
              <span>kithinjimutwir1@gmail.com</span>
            </div>
            <div>
              <FaLocationArrow />
              <span>Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
