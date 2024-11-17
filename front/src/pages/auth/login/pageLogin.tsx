import cl from './pageLogin.module.scss'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { PATH } from "@/router";
import { z } from 'zod'
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { appAC } from "../../../bll/app.slice";
import { useLoginMutation } from "../../../bll/auth/auth.servies";
import { RootStateType } from "../../../bll/store";
import { UserType } from "../../../bll/auth/auth.type";


const schema = z.object({
  password: z.string().min(3, 'too short password').nonempty('Enter password'), username: z.string().min(3, 'too short username').nonempty('Enter username'),
})

type FormType = z.infer<typeof schema>


export const PageLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user = useSelector<RootStateType, UserType | null>(state => state.app.user)
  const [signIn, {isLoading: isSigningIn}] = useLoginMutation()

  const {control, register, handleSubmit, formState: {errors},} = useForm<FormType>({
    mode: 'onSubmit', resolver: zodResolver(schema), defaultValues: {
      password: '12345', username: 'casper',
    },
  })


  const handleSignIn = (data: FormType) => {
    console.log('handleSignIn data:', data);
    signIn(data).unwrap().then((response) => {
      console.log('Login successful:', response);
      dispatch(appAC.setUser(response.user));
      // window.close()
    }).catch((error) => {
      console.error('SignIn Error:', error);
    });
  };


  const handleFormSubmitted = handleSubmit(handleSignIn)
  if( user ) {
    navigate(PATH.home)
    return null;
  }
  return (<>
    <DevTool control={control}/>
    <Box className={cl.wrapperCard}>
      <form onSubmit={handleFormSubmitted} className={cl.intoAuthCard}>
        <Typography variant={'h4'} className={cl.h1}>login</Typography>
        <TextField placeholder={'Email/username'} label={'Email or username'} {...register('username')} error={!!errors.username}/>
        {errors.username && <p>{errors.username.message}</p>}
        <TextField label={'Password'} placeholder={'Password'} type={'password'} {...register('password')} error={!!errors.password}/>
        {errors.password && <p>{errors.password.message}</p>}

        <Button variant={'contained'} disabled={isSigningIn} fullWidth={true} type="submit"
	 sx={{backgroundColor: 'var(--secondary-color)', mt: 2, mb: 3, p: '10px'}}>
          Sign In
        </Button>
        <Button component={Link} to="/recover-password" className={cl.link} rel={'noopener nopener'}>
          Forgot Password?
        </Button>

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button component={NavLink} className={`${cl.link} ${cl.dontHaveAccount}`} fullWidth={true} to={PATH.register} rel={'noopener nopener'}
            // target={'_blank'}
          >
            {/*<Button as={NavLink} className={`${s.link} ${s.dontHaveAccount}`} fullWidth={true} to={navigate(PATH.signUp)} rel={'noopener nopener'} target={'_blank'} variant={'link'}>*/}
            Dont have an account?
          </Button>
        </div>

      </form>
    </Box>
  </>)

}

export default PageLogin
