import cl from './pageLogin.module.scss'
import { Link, NavLink, redirect, useNavigate } from "react-router-dom";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { PATH } from "@/router";
import { string, z } from 'zod'
// import { useLoginMutation } from "@/bll/auth/auth.servies";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { appAC } from "../../../bll/app.slice";
import { useLoginMutation } from "../../../bll/auth/auth.servies";
import { RootStateType } from "../../../bll/store";
import { UserType } from "../../../bll/auth/auth.type";


const schema = z.object({
  password: z.string().min(3, 'too short password').nonempty('Enter password'),
  // email: z.string().email('Invalid email address').nonempty('Enter email'),
  // username: z.string().optional(),
  username: z.string().min(3, 'too short username').nonempty('Enter username'),
})

type FormType = z.infer<typeof schema>


export const PageLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const user=useSelector<RootStateType,UserType|null>(state=>state.app.user)
  const [signIn, {isLoading: isSigningIn}] = useLoginMutation()
  const {control, register, handleSubmit, formState: {errors},} = useForm<FormType>({
    mode: 'onSubmit', resolver: zodResolver(schema), defaultValues: {
      // email: 'air@gmail.com',
      password: '12345',
      username: 'air',
    },
  })

  const {field: {value, onChange},} = useController({name: 'username', control, defaultValue: string})
  // console.log(value, onChange);

  const handleSignIn = (data: FormType) => {
    console.log(data);
    debugger
    signIn({
      // email: data.email,
      password: data.password,
      username: data.username
    }).unwrap().then((response) => {
      console.log('Login successful:', response);
      debugger;
      if( response.access_token && response.refresh_token ) {
        localStorage.setItem('access_token', response.access_token);
        localStorage.setItem('refresh_token', response.refresh_token);

        // Сохраняем токены в стейт
        dispatch(appAC.setAccessToken(response.access_token));
        dispatch(appAC.setRefreshToken(response.refresh_token));
        dispatch(appAC.setUser(response.user));
      }
      navigate('/');
    }).catch((error) => {
      console.error('SignIn Error:', error);
    });
  };


  const handleFormSubmitted = handleSubmit(handleSignIn)
if (user){
  debugger
  return  redirect(PATH.home)
}
  return (<>
    <DevTool control={control}/>
    <Box className={cl.wrapperCard}>
      <form onSubmit={handleFormSubmitted} className={cl.intoAuthCard}>
        <Typography variant={'h4'} className={cl.h1}>login</Typography>
        <TextField placeholder={'Email/username'} label={'Email or username'} {...register('username')} error={!!errors.email}/>
        {errors.username && <p>{errors.username.message}</p>}
        <TextField label={'Password'} placeholder={'Password'} type={'password'} {...register('password')} error={!!errors.password}/>
        {errors.password && <p>{errors.password.message}</p>}
        {/*<TextField label={'username'} placeholder={'username'}*/}
        {/*  // name={'username'}*/}
	{/*    {...register('username')} error={!!errors.username}/>*/}

        <Button variant={'contained'} disabled={isSigningIn} fullWidth={true} type="submit"
	 sx={{backgroundColor: 'var(--secondary-color)', mt: 2, mb: 3, p: '10px'}}>
          Sign In
        </Button>
        <Button as={Link} to="/recover-password" className={cl.link} rel={'noopener nopener'}>
          Forgot Password?
        </Button>

        <div style={{display: 'flex', justifyContent: 'center'}}>
          <Button as={NavLink} className={`${cl.link} ${cl.dontHaveAccount}`} fullWidth={true} to={PATH.register} rel={'noopener nopener'}
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
