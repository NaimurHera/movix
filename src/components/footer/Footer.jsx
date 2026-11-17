import { FaFacebookF, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
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
         <Link to={"https://naimurrahmanhira.com/"}>
            <b>
              Naimur Rahman Hira
            </b>
         </Link>
          , a professional Full stack web developer and UI UX designer
        </div>
        
      </Container>
    </footer>
  );
};

export default Footer;
