import { z, ZodError } from 'zod'
import s from './RegisterForm.module.scss'
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Box, Button, Card, TextField } from "@mui/material";
import { PATH } from "../../../router";
import { useSignUpMutation } from "../../../bll/auth/auth.servies";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)', clipPath: 'inset(50%)', height: 1, overflow: 'hidden', position: 'absolute', bottom: 0, left: 0, whiteSpace: 'nowrap', width: 1,
});

const schema = z.object({
  firstName: z.string().min(3, 'too short firstName').nonempty('Enter first name'), lastName: z.string().min(3, 'too short lastName').nonempty('Enter last name'), username: z.string().min(3, 'too short Username').nonempty('Enter Username'), password: z.string().min(3, 'too short password').nonempty('Enter password'), passwordConfirmation: z.string().nonempty('Confirm your password'), email: z.string().email('Invalid email address').nonempty('Enter email'), avatar: z.any().optional(), // Файл для аватара
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
  const navigate = useNavigate()
  const {control, register, handleSubmit, setError, formState: {errors},} = useForm<FormType>({
    mode: 'onSubmit', resolver: zodResolver(schema), defaultValues: {
      email: 'lisa1@gmail.com', password: '12345', firstName: 'Vasja', lastName: 'Pjato4kin', username: 'air', phone: '', passwordConfirmation: '',
    },
  })

  const [signUp, {isError}] = useSignUpMutation();

  const onSubmit: SubmitHandler<FormType> = async(data) => {
    const body = {
      email: data.email, name: data.username ? data.username : data.email, password: data.password, // sendConfirmationEmail?: boolean,
      // subject?: string,
    }
    try {
      const response = await signUp(body)
      navigate('/')
      console.log(response);
    } catch( error ) {
      if( error instanceof ZodError ) {
        // Обработка ошибок валидации от Zod
        error.errors.forEach((validationError) => {
          setError(validationError.path[0] as keyof FormType, {
            type: 'manual', message: validationError.message,
          });
        });
      } else {
        // Обработка других типов ошибок
        console.error('Unexpected error:', error);
      }
    }
  };

  const handleFormSubmitted = handleSubmit(data => onSubmit(data)
    // onSubmit(data, ['passwordConfirmation'])
  )


  return (<>
    <DevTool control={control}/>
    <Box className={s.wrapperCard}>
      <Card className={s.intoAuthCard}>
        <h1 className={s.h1}>Sign In</h1>
        <p>{isError}</p>
        <form onSubmit={handleFormSubmitted}>
          <TextField placeholder={'firstName'} label={'firstName'} {...register('firstName')} error={!!errors.firstName}/>
          <TextField placeholder={'lastName'} label={'lastName'} {...register('lastName')} error={!!errors.lastName}/>
          <TextField placeholder={'username'} label={'username'} {...register('username')} error={!!errors.username}/>
          <TextField placeholder={'phone'} label={'phone'} {...register('phone')} error={!!errors.phone}/>
          <TextField placeholder={'Email'} label={'Email'} {...register('email')} error={!!errors.email}/>
          <Button component="label" role={undefined} variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon/>}>
            Upload Avatar
            <VisuallyHiddenInput type="file" onChange={(event) => console.log(event.target.files)} multiple/>
          </Button>
          <TextField placeholder={'Password'} label={'Password'} type={'password'} {...register('password')} error={!!errors.password}/>
          {errors.password && <p>{errors.password.message}</p>}

          <TextField {...register('passwordConfirmation')} label={'Confirm Password'} type={'password'}/>

          <Button className={s.button} variant={'outlined'} type="submit" fullWidth={true}>
            Sign Up
          </Button>
          <div style={{display: 'flex', justifyContent: 'center'}}>
            <Button as={Link} className={`${s.link} ${s.alreadyHaveAccount}`} to={navigate(PATH.login)} rel={'noopener nopener'} >
              Already have an account?
            </Button>
          </div>
          <div className={s.underlineLinkWrapper}>
            <Button as={NavLink} className={s.underlineLink} to={navigate(PATH.login)} rel={'noopener nopener'} target={'_blank'} >
              Sign In
            </Button>
          </div>
        </form>
      </Card>
    </Box>
  </>
)
}

export default RegisterForm









