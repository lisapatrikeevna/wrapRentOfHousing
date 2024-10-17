import s from './pageLogin.module.scss'
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useController, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { PATH } from "@/router";
import { string, z } from 'zod'
import { useLoginMutation } from "@/bll/auth/auth.servies";
import { Button, Card, TextField } from "@mui/material";


const schema = z.object({
  password: z.string().min(3,'too short password').nonempty('Enter password'),
  email: z.string().email('Invalid email address').nonempty('Enter email'),
  username: z.string().optional(),
})

type FormType = z.infer<typeof schema>



export const PageLogin = () => {

  const navigate = useNavigate()
  const [signIn, {isLoading: isSigningIn}] = useLoginMutation()
  const {control,register, handleSubmit,formState:{errors},} = useForm<FormType>(
    {
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues: {
        email: 'lisa1@gmail.com', password: '12345', username: 'air',
      },
    })

  const {field:{value,onChange},}=useController({ name:'username', control, defaultValue:string})
  // console.log(value, onChange);

  const handleSignIn = (data: FormType) => {
    console.log(data);
    signIn(data).unwrap().then(() => {
      navigate('/')
    })
  }

  const handleFormSubmitted = handleSubmit(handleSignIn)

  return ( <>
    <DevTool control={control} />
    <div className={s.wrapperCard}>
      <Card className={s.intoAuthCard}>
        <h1 className={s.h1}>login</h1>
        <form onSubmit={handleFormSubmitted}>
          <TextField placeholder={'Email'} label={'Email'} {...register('email')} error={!!errors.email}/>
          <TextField label={'Password'} placeholder={'Password'} type={'password'} {...register('password')} error={!!errors.password}/>
          <TextField label={'username'} placeholder={'username'}
                     // name={'username'}
                     {...register('username')} error={!!errors.username}/>

          <Button as={Link} to="/recover-password" className={s.link} rel={'noopener nopener'} >
            Forgot Password?
          </Button>
          <Button className={s.button} type={'submit'} disabled={isSigningIn} fullWidth={true}>
            Sign In
          </Button>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button as={NavLink} className={`${s.link} ${s.dontHaveAccount}`} fullWidth={true} to={PATH.register} rel={'noopener nopener'} target={'_blank'} >
              {/*<Button as={NavLink} className={`${s.link} ${s.dontHaveAccount}`} fullWidth={true} to={navigate(PATH.signUp)} rel={'noopener nopener'} target={'_blank'} variant={'link'}>*/}
              Dont have an account?
            </Button>
          </div>
          {/*<div className={s.underlineLinkWrapper}>*/}
          {/*  /!*<Button as={'a'} className={s.underlineLink} href={'#'} rel={'noopener nopener'} target={'_blank'} variant={'link'}>*!/*/}
          {/*  <Button as={'a'} className={s.underlineLink} href={navigate(PATH.signUp)} rel={'noopener nopener'} target={'_blank'} variant={'link'}>*/}
          {/*    Sign Up*/}
          {/*  </Button>*/}
          {/*</div>*/}
        </form>
      </Card>
    </div>
  </>)

}

export default PageLogin
