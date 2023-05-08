import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import Container from "../container/Container";
import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <ul className="menuItems">
          <li className="menuItem">Terms Of Use</li>
          <li className="menuItem">Privacy-Policy</li>
          <li className="menuItem">About</li>
          <li className="menuItem">FAQ</li>
        </ul>
        <div className="infoText">
          This web app is built using react js, RTK query and scss. You can get all kinds of movie information using
          this app. Try searching some movie names in the search box at the very top. You will get information about
          that movie. This web app is developed by{" "}
          <a href="https://www.facebook.com/NaimurHera/">Md. Naimur Rahman Hira</a>, a professional front-end web
          developer.
        </div>
        <div className="socialIcons">
          <a href="https://www.facebook.com/NaimurHera/" target="_blank" rel="noreferrer">
            <span className="icon">
              <FaFacebookF />
            </span>
          </a>
          <span className="icon">
            <FaInstagram />
          </span>
          <span className="icon">
            <FaTwitter />
          </span>
          <span className="icon">
            <FaLinkedin />
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
