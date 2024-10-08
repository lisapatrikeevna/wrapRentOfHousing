import cl from './Header.module.scss'
import logoImg from './../../assets/logo.png'
import { AppBar, Avatar, Box, Container, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../router";

const Header = () => {
  const navigate = useNavigate()



  return <AppBar position="static" color={'transparent'} className={cl.headerWrap}>
      <Box className={cl.header}>
        <img src={logoImg} alt="logoImg" onClick={()=>navigate(PATH.home)}/>
        <Toolbar variant="dense" className={cl.rightBlock}>
          <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
            <MenuIcon/>
          </IconButton>
          <Avatar sx={{width: 26, height: 26}}>
            <PermIdentityIcon color='inherit'/>
          </Avatar>
        </Toolbar>
      </Box>

    <nav className={cl.navbar}>
      <Container component="ul">
        <li><Link to={PATH.home}>Home</Link></li>
        <li><Link to={PATH.about}>About</Link></li>
        <li><Link to={PATH.privacyPolicy}>PrivacyPolicy</Link></li>
        <li><Link to={PATH.itemRealty}>itemRealty</Link></li>
        {/*<li><Link to="/real-estate">Real Estate List</Link></li>*/}
      </Container>
    </nav>
  </AppBar>;
};

export default Header;














