import { z} from 'zod'
import cl from './RegisterForm.module.scss'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { PATH } from "../../../router";
import { useSignUpMutation } from "../../../bll/auth/auth.servies";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useDispatch } from "react-redux";
import { appAC } from "../../../bll/app.slice";
import { useState } from "react";


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)', clipPath: 'inset(50%)', height: 1, overflow: 'hidden', position: 'absolute', bottom: 0, left: 0, whiteSpace: 'nowrap', width: 1,
});

const schema = z.object({
  firstName: z.string().min(3, 'too short firstName').nonempty('Enter first name'),
  lastName: z.string().min(3, 'too short lastName').nonempty('Enter last name'),
  username: z.string().min(3, 'too short Username').nonempty('Enter Username'),
  password: z.string().min(3, 'too short password').nonempty('Enter password'),
  passwordConfirmation: z.string().nonempty('Confirm your password'),
  email: z.string().email('Invalid email address').nonempty('Enter email'),
  avatar: z.any().optional(), // Файл для аватара
  phone: z.string().optional(), // Телефон как строка
}).superRefine((data, ctx) => {
  if( data.password !== data.passwordConfirmation ) {
    ctx.addIssue({
      message: 'Passwords do not match', code: z.ZodIssueCode.custom, path: ['passwordConfirmation'],
    })
  }
  return data
})

type FormType = z.infer<typeof schema>


export const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [resErr,setResErr] = useState<string | null>(null);
  const [signUp, {isError}] = useSignUpMutation();
  const {control, register, handleSubmit, formState: {errors},} = useForm<FormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'lisa@gmail.com',
      password: '12345',
      firstName: 'Lisa',
      lastName: 'Patrikeevna',
      username: 'lisa',
      phone: '',
      passwordConfirmation: '12345',
    },
  })

  const onSubmit = (data:FormType) => {
    const formData = new FormData()
    Object.keys(data).forEach(key => {
      const value = (data as any)[key];

      // Если это файл, убедитесь, что вы добавляете файл правильно
      if (key === 'avatar' && value instanceof FileList && value.length > 0) {
        formData.append(key, value[0]);  // Добавляем первый файл из FileList
        console.log(value);
      }else if(key  === 'phone' && (!value || value.length < 10)){
        // formData.append(key,null)
      } else {
        formData.append(key, value as string);
      }
    });

    // Проверка формируемых данных
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    // @ts-ignore
    const response = signUp(formData).unwrap().then(res=> {
      console.log("response register form:  ", response)
      dispatch(appAC.setUser(res.user))
    })
    .catch(err=> setResErr(err) )
      // window.close()

  };

  const handleFormSubmitted = handleSubmit(data => onSubmit(data))


  return (<>
      <DevTool control={control}/>
    <Box className={cl.root}>
      <Typography variant={'h4'} className={cl.h1}>Sign In</Typography>
      <p>{isError}</p>
      <Paper component={"form"} onSubmit={handleFormSubmitted} className={cl.registerCard}>
        {/*<form onSubmit={handleFormSubmitted} className={cl.intoAuthCard}>*/}
        {resErr&&<Typography color={'warning'}>{resErr}</Typography>}
        <TextField placeholder={'firstName'} label={'firstName'} {...register('firstName')} error={!!errors.firstName}/>
        <TextField placeholder={'lastName'} label={'lastName'} {...register('lastName')} error={!!errors.lastName}/>
        <TextField placeholder={'username'} label={'username'} {...register('username')} error={!!errors.username}/>
        <TextField placeholder={'phone'} label={'phone'} {...register('phone')} error={!!errors.phone}/>
        <TextField placeholder={'Email'} label={'Email'} {...register('email')} error={!!errors.email}/>
        <TextField placeholder={'Password'} label={'Password'} type={'password'} {...register('password')} error={!!errors.password}/>
        {errors.password && <p>{errors.password.message}</p>}

        <TextField {...register('passwordConfirmation')} label={'Confirm Password'} type={'password'}/>
        <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon/>}>
          Upload Avatar
          <VisuallyHiddenInput type="file" {...register('avatar')} multiple/>
          {/*<VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple/>*/}
        </Button>
        <Button className={cl.button} variant={'outlined'} type="submit" fullWidth={true} sx={{backgroundColor: 'var(--secondary-color)', mt: 2, mb: 3, p: '10px'}}>
          Sign Up(reg)
        </Button>

        {/*</form>*/}
      </Paper>
      <Box style={{display: 'flex', justifyContent: 'center'}}>
        <Button component={Link} className={`${cl.link} ${cl.alreadyHaveAccount}`} to={navigate(PATH.login)}>
          {/*<Button component={Link} className={`${cl.link} ${cl.alreadyHaveAccount}`} to={navigate(PATH.login)} rel={'noopener nopener'} >*/}
          Already have an account?
        </Button>
      </Box>
      <Box className={cl.underlineLinkWrapper}>
        <NavLink as={NavLink} className={cl.underlineLink} to={navigate(PATH.login)} rel={'noopener nopener'} target={'_blank'}>
          Sign In(log)
        </NavLink>
      </Box>
    </Box>
  </>)
}

export default RegisterForm









