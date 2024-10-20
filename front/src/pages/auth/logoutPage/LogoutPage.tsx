import cl from './LogoutPage.module.scss'
import {NavLink } from "react-router-dom";
import { Box, Button, Paper, Typography } from "@mui/material";
import { PATH } from "../../../router";
import { useDispatch } from "react-redux";
import { appAC } from "../../../bll/app.slice";




export const LogoutPage = () => {
  const dispatch = useDispatch();

  const handleLogout=()=>{
    dispatch(appAC.setLogout())
  }


  return (<>
    <Box className={cl.root}>
      <Typography variant={'h3'} className={cl.h1}>logout page</Typography>
      <Paper className={cl.registerCard}>
        <Typography variant={'h5'} className={cl.h1}>Are you sure you want to log out of your account?</Typography>


      </Paper>
      <Box style={{display: 'flex', justifyContent: 'center'}}>
        <Button className={`${cl.link} `} onClick={handleLogout}>
          Already have an account?
        </Button>
      </Box>
      <Box className={cl.underlineLinkWrapper}>
        <NavLink className={cl.underlineLink} to={PATH.home} >
          return to home
        </NavLink>
      </Box>
    </Box>
  </>)
}

export default LogoutPage









