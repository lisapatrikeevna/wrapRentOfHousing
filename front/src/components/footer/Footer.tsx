import cl from "../header/Header.module.scss";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";
import { PATH } from "../../router";

const Footer = () => {


  return (<div>
    footer
    <nav className={cl.navbar}>
      <Container component="ul">
        <li><Link to={PATH.home}>Home</Link></li>
        <li><Link to={PATH.about}>About</Link></li>
        <li><Link to={PATH.privacyPolicy}>PrivacyPolicy</Link></li>
        {/*<li><Link to={PATH.itemRealty}>itemRealty</Link></li>*/}
        {/*<li><Link to="/real-estate">Real Estate List</Link></li>*/}
      </Container>
    </nav>
  </div>);
};

export default Footer;
