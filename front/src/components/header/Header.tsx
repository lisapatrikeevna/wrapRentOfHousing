import cl from './Header.module.scss'
import logoImg from './../../assets/logo.png'
import { AppBar, Avatar, Box, Container, FormControl, Input, InputAdornment, InputLabel, Modal, Toolbar, Typography } from '@mui/material'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Link, NavLink, useNavigate } from "react-router-dom";
import { PATH } from "../../router";
import FiltersModal from "../filtersModal/FiltersModal";
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../bll/store";
import { UserType } from "../../bll/auth/auth.type";
import { useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
import { appAC } from "../../bll/app.slice";


const style = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
};


const Header = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector<RootStateType, UserType | null>(state => state.app.user)
  const [serchValue, setSerchValue] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const modalHandler = () => {
    setOpen(!open)
  }
  const avatarHandler = () => {
    console.log('user', user || 'usol v les');
    console.log('user.id', user?.id);
    !!user ? modalHandler() : navigate(PATH.login)
  }
  const searchHandler = () => {
    dispatch(appAC.setClearAdditionalFilters())
    dispatch(appAC.setAdditionalFilters({search:serchValue}))
    setSerchValue('')
  }


  return <>
    <AppBar position="static" color={'transparent'} className={cl.headerWrap}>
      <Box className={cl.header}>
        <img src={logoImg} alt="logoImg" onClick={() => navigate(PATH.home)}/>
        <Toolbar variant="dense" className={cl.rightBlock}>
          <>
            <FormControl fullWidth sx={{m: 1}} variant="filled">
              <InputLabel htmlFor="filled-adornment-amount">search</InputLabel>
              <Input id="filled-adornment-password" sx={{height:'40px'}} value={serchValue} onChange={e => setSerchValue(e.currentTarget.value)}
	            endAdornment={<InputAdornment position="end">
	              <SearchIcon onClick={searchHandler}/>
	            </InputAdornment>}
              />
            </FormControl>
          </>
          <FiltersModal/>
          <Avatar sx={{width: 26, height: 26}} onClick={avatarHandler}>
            <PermIdentityIcon color={user ? 'inherit' : 'error'}/>
          </Avatar>

        </Toolbar>
      </Box>

      <nav className={cl.navbar}>
        <Container component="ul" sx={{width: '212px'}} className={cl.role}>
          <li><NavLink className={({isActive}) => (isActive ? cl.active : '')} to={PATH.toLandlords}>to landlords</NavLink></li>
          <li><NavLink className={({isActive}) => (isActive ? cl.active : '')} to={PATH.home}>rent</NavLink></li>
        </Container>
        <Container component="ul" sx={{width: '300px'}}>
          <li><Link to={PATH.home}>Home</Link></li>
          <li><Link to={PATH.about}>About</Link></li>
          <li><Link to={PATH.privacyPolicy}>PrivacyPolicy</Link></li>
        </Container>

      </nav>
    </AppBar>


    <Modal open={open} onClose={modalHandler} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          hi, {user?.username || "Guest"}!
        </Typography>
        <p><NavLink to={PATH.loginOut}>logout</NavLink></p>
        <p><NavLink to={PATH.history}>history</NavLink></p>
        <p><NavLink to={PATH.favorite}>favorit</NavLink></p>
        <p><NavLink to={PATH.myBooking}>reservation</NavLink></p>
      </Box>
    </Modal>
  </>
};

export default Header;














