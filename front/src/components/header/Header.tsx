import cl from './Header.module.scss'
import logoImg from './../../assets/logo.png'
import { AppBar, Avatar, Box, IconButton, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

const Header = () => {
  return <AppBar position="static" color={'transparent'} className={cl.headerWrap}>
      <Box className={cl.header}>
        <img src={logoImg} alt="logoImg"/>
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
        menu list
      </nav>
    </AppBar>;
};

export default Header;














