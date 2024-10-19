import { Box, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../router";
import cl from './Footer.module.scss'
import logoImg from "../../assets/logo.png";

const Footer = () => {
const navigate = useNavigate();

  return (<Box className={cl.footerWrap}>
    <Container className={cl.footer} >
      <img src={logoImg} alt="logoImg" onClick={() => navigate(PATH.home)}/>
      <Container component="ul">
        <li><Link to={PATH.home}>Home</Link></li>
        <li><Link to={PATH.about}>About</Link></li>
        <li><Link to={PATH.privacyPolicy}>PrivacyPolicy</Link></li>
      </Container>
    </Container>

  </Box>);
};

export default Footer;
