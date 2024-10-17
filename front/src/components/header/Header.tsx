import cl from './Header.module.scss'
import logoImg from './../../assets/logo.png'
import { AppBar, Avatar, Box, Container, Modal, Toolbar, Typography } from '@mui/material'
// import MenuIcon from '@mui/icons-material/Menu'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link, useNavigate } from "react-router-dom";
import { PATH } from "../../router";
import FiltersModal from "../filtersModal/FiltersModal";
import { useSelector } from "react-redux";
import { RootStateType } from "../../bll/store";
import { UserType } from "../../bll/auth/auth.type";
import { useState } from "react";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Header = () => {
  const navigate = useNavigate()
  const user=useSelector<RootStateType,UserType|null>(state=>state.app.user)
  const[open, setOpen] = useState<boolean>(false)
  const modalHandler = ()=>{
    setOpen(!open)
  }
  const avatarHandler=()=>{
    console.log('user', user);
    !!user? modalHandler : navigate(PATH.login)
  }



  return <>
    <AppBar position="static" color={'transparent'} className={cl.headerWrap}>
      <Box className={cl.header}>
        <img src={logoImg} alt="logoImg" onClick={()=>navigate(PATH.home)}/>
        <Toolbar variant="dense" className={cl.rightBlock}>
          <FiltersModal/>
          {/*<IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>*/}
          {/*  <MenuIcon/>*/}
          {/*</IconButton>*/}
          <Avatar sx={{width: 26, height: 26}} onClick={avatarHandler}>
            <PermIdentityIcon color='inherit'/>
          </Avatar>

        </Toolbar>
      </Box>

    <nav className={cl.navbar}>
      <Container component="ul">
        <li><Link to={PATH.home}>Home</Link></li>
        <li><Link to={PATH.about}>About</Link></li>
        <li><Link to={PATH.privacyPolicy}>PrivacyPolicy</Link></li>
        {/*<li><Link to={PATH.itemRealty}>itemRealty</Link></li>*/}
        {/*<li><Link to="/real-estate">Real Estate List</Link></li>*/}
      </Container>
    </nav>
  </AppBar>
  <Modal
    open={open}
    onClose={modalHandler}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
        {/*{user.toString }*/}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
    </Box>
  </Modal>
  </>
};

export default Header;














