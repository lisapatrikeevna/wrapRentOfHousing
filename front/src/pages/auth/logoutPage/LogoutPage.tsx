import cl from './LogoutPage.module.scss'
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Button, CircularProgress, Paper, Typography } from "@mui/material";
import { PATH } from "../../../router";
import { useDispatch } from "react-redux";
import { appAC } from "@/bll/app.slice";
import { useLogoutMutation } from "../../../bll/auth/auth.servies";
import {read_cookie, delete_cookie } from 'sfcookies';
// import { useLogoutMutation } from "@/bll/auth/auth.servies";




export const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const[logOut,{isLoading}]=useLogoutMutation()

  const handleLogout=()=>{
    logOut().unwrap()
    .then(res=> {
      console.log(read_cookie('access_token'));
      delete_cookie('access_token')
      delete_cookie('access_token')
      delete_cookie('refresh_token')
      delete_cookie('refresh_token')
      // delete_cookie(cookie_key);
      // document.cookie = 'access_token=; Max-Age=0; path=/;';
      // document.cookie = 'refresh_token=; Max-Age=0; path=/;';
      dispatch(appAC.setLogout())
      navigate(PATH.home)
      console.log(res);
    })
    .catch((err) => console.log(err));
  }


  return (<>
    {isLoading && <CircularProgress color="success"/>}
    <Box className={cl.root}>
      <Typography variant={'h3'} className={cl.h1}>logout page</Typography>
      <Paper className={cl.registerCard}>
        <Typography variant={'h5'} className={cl.h1}>Are you sure you want to log out of your account?</Typography>

        <Button variant={'contained'} onClick={handleLogout}>
          log out of account
        </Button>
      </Paper>

      <Box className={cl.underlineLinkWrapper}>
        <NavLink className={cl.underlineLink} to={PATH.home} >
          return to home
        </NavLink>
      </Box>
    </Box>
  </>)
}

export default LogoutPage









