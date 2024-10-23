import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateRealtyMutation } from "../../bll/realty/realty.service";
import { useSelector } from "react-redux";
import { RootStateType } from "../../bll/store";
import { CategoryType } from "../../bll/category/category.service";


const schema = z.object({
  title: z.string().max(150, 'Title must be at most 150 characters long').nonempty('Title is required'),
  description: z.string().nonempty('Description is required'),
  location: z.string().max(200, 'Location must be at most 200 characters long'),
  price: z.number().positive('Price must be greater than 0').max(99999999.99, 'Price must be at most 99999999.99'),
  number_of_rooms: z.number().int('Number of rooms must be an integer').min(1, 'Number of rooms must be at least 1'),
  category: z.number(),
  // category: z.enum(['apartment', 'villa', 'studio', 'townhouse', 'duplex']).default('apartment'),  // Заменили z.number() на z.enum()
  available: z.boolean().optional(),
  available_date: z.string().optional(),
  real_estate_image: z.any().optional(),
  // real_estate_image: z.instanceof(File).optional(),  // Убедитесь, что файл обрабатывается правильно
  class_realty: z.enum(['standard', 'economy', 'comfort', 'premium', 'luxury', 'super_luxury']).default('standard'),
  square_footage: z.number().min(0, 'Square footage must be at least 0'),
  // detail: z.number().optional(),
});

type FormType = z.infer<typeof schema>;

// const schema = z.object({
//   title: z.string().max(150, 'Title must be at most 150 characters long').nonempty('Title is required'), description: z.string().nonempty('Description is required'), location: z.string().max(200, 'Location must be at most 200 characters long')
//   // .optional(), // Если это поле может быть пустым, используйте optional()
//   , price: z.number().positive('Price must be greater than 0').max(99999999.99, 'Price must be at most 99999999.99'), // Максимум для decimal_places=2 и max_digits=10
//   number_of_rooms: z.number().int('Number of rooms must be an integer').min(1, 'Number of rooms must be at least 1'), category: z.number() // Предполагаем, что это ID категории
//   .positive('Category ID must be a positive number'), available: z.boolean().optional(), available_date: z.string() // Дата в формате строки (например, 'YYYY-MM-DD')
//   .optional(), real_estate_image: z.instanceof(File).optional(), // Если работаете с изображениями
//   class_realty: z.enum(['standard', 'economy', 'comfort', 'premium', 'luxury', 'super_luxury']) // Добавьте свои классы
//   .default('standard'),
//
//   square_footage: z.number().min(0, 'Square footage must be at least 0'),
// })
//
// type FormType = z.infer<typeof schema>
//
// const NewRealtyForm = () => {
//   const[createNew,{isLoading,isError}]=useCreateRealtyMutation()
//   const {control, register, handleSubmit, formState: {errors},} = useForm<FormType>({
//     mode: 'onSubmit', resolver: zodResolver(schema), defaultValues: {
//       available: true, location: ' Crailsheim, Schwäbisch Hall (Kreis)', description: 'Objektbeschreibung\n' + 'Elegantes Wohnen in einer schicken 2,5-Zi.-Wohnung mit einem offen gestalteten, lichtdurchfluteten Wohn-Ess-Koch-Bereich, einem angenehm großzügig bemessenen Schlafzimmer sowie einem separaten Abstellraum neben der Küche. Der schöne Eck-Balkon ist vom Wohnzimmer aus begehbar und lädt zum Verweilen und Entspannen ein.\n' + '\n' + 'Genießen Sie barrierefreies und komfortables Wohnen durch Aufzug in alle Ebenen.\n' + '\n' + 'Zur Wohnung gehören außerdem ein geräumiger Kellerraum sowie ein Außenstellplatz Mietpreis 40.-€ mtl.). Zur gemeinsamen Nutzung stehen ein Waschkeller, ein Müllraum sowie ein Fahrrad- und Kinderwagenraum  zur Verfügung.\n' + 'weiterlesen…',
//     },
//   })
//
//   const onSubmit = (data: FormType) => {
//     console.log(data);
//     createNew(data).unwrap().then((res) => {
//       console.log(res);
//
//     }).catch((err) => {
//       console.log(err);
//     })
//
//
//   };
//
//   return (<>
//     <DevTool control={control}/>
//     <p>{isError}</p>
//     <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{maxWidth: 600, margin: '0 auto'}}>
//       <Typography gutterBottom>
//         Realty Form
//       </Typography>
//
//       <Controller name="title" control={control} render={({field}) => (
//         <TextField{...field} label="Title" variant="outlined" fullWidth error={!!errors.title} helperText={errors.title?.message} margin="normal"/>)}
//       />
//
//       <Controller name="description" control={control} render={({field}) => (
//         <TextField{...field} label="Description" variant="outlined" fullWidth multiline rows={4}
// 	   error={!!errors.description} helperText={errors.description?.message} margin="normal"/>)}
//       />
//
//       <Controller name="location" control={control} render={({field}) => (
//         <TextField{...field} label="Location" variant="outlined" fullWidth error={!!errors.location}
// 	   helperText={errors.location?.message}
// 	   margin="normal" />)} />
//
//       <Controller name="price" control={control} render={({field}) => (
//         <TextField{...field} label="Price" type="number" variant="outlined" fullWidth error={!!errors.price}
// 	   helperText={errors.price?.message} margin="normal" />)}
//       />
//
//       <Controller name="number_of_rooms" control={control} render={({field}) => (
//         <TextField {...field} label="Number of Rooms" type="number" variant="outlined" fullWidth
// 	    error={!!errors.number_of_rooms} helperText={errors.number_of_rooms?.message} margin="normal" />)}
//       />
//
//       <FormControl fullWidth margin="normal" error={!!errors.category}>
//         <InputLabel>Category</InputLabel>
//         <Controller name="category" control={control} render={({field}) => (
//           <Select {...field} label="Category">
//             <MenuItem value="apartment">Apartment</MenuItem>
//             <MenuItem value="villa">Villa</MenuItem>
//             <MenuItem value="studio">Studio</MenuItem>
//             <MenuItem value="townhouse">Townhouse</MenuItem>
//             <MenuItem value="duplex">Duplex</MenuItem>
//           </Select>)}
//         />
//         {errors.category && <Typography color="error">{errors.category.message}</Typography>}
//       </FormControl>
//
//       <Controller name="available" control={control} render={({field}) => (
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Available</InputLabel>
//           <Select {...field} label="Available"  value={field.value ? 'true' : 'false'}
// 	   onChange={(event) => field.onChange(event.target.value === 'true')}
//             // Преобразуем строку обратно в boolean
//           >
//             <MenuItem value={'true'}>Yes</MenuItem>
//             <MenuItem value={'false'}>No</MenuItem>
//           </Select>
//         </FormControl>)}
//       />
//
//       <Controller name="available_date" control={control} render={({field}) => (
//         <TextField {...field} label="Available Date" type="date" variant="outlined"
// 	    fullWidth InputLabelProps={{ shrink: true, }}
// 	    error={!!errors.available_date} helperText={errors.available_date?.message} margin="normal"
//         />)}
//       />
//
//       <Controller name="real_estate_image" control={control} render={({field}) => (
//         <TextField {...field} type="file" variant="outlined" fullWidth error={!!errors.real_estate_image}
// 	    helperText={errors.real_estate_image?.message}
// 	    margin="normal" InputLabelProps={{ shrink: true, }} />)}
//       />
//
//       <FormControl fullWidth margin="normal">
//         <InputLabel>Class of Realty</InputLabel>
//         <Controller name="class_realty" control={control} render={({field}) => (
//           <Select {...field} label="Class of Realty">
//             <MenuItem value="standard">Standard</MenuItem>
//             <MenuItem value="economy">Economy</MenuItem>
//             <MenuItem value="comfort">Comfort</MenuItem>
//             <MenuItem value="premium">Premium</MenuItem>
//             <MenuItem value="luxury">Luxury</MenuItem>
//             <MenuItem value="super_luxury">Super Luxury</MenuItem>
//           </Select>)}
//         />
//       </FormControl>
//
//       <Controller name="square_footage" control={control} render={({field}) => (
//         <TextField {...field} label="Square Footage" type="number" variant="outlined"
// 	    fullWidth error={!!errors.square_footage} helperText={errors.square_footage?.message}
// 	    margin="normal" />)}
//       />
//
//       <Button type="submit" variant="contained" color="primary" sx={{mt: 3}} disabled={isLoading}>
//         Submit
//       </Button>
//     </Box>
//
//
//   </>);
// };
//
// export default NewRealtyForm;



const NewRealtyForm = () => {
  let categories = useSelector<RootStateType, Array<CategoryType>>(state => state.app.categories)
  const [createNew, { isLoading, isError }] = useCreateRealtyMutation();
  const { control, register, handleSubmit, formState: { errors }, } = useForm<FormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      title:'Sanierte 3-Zimmer Wohnung in der Innenstadt - 1. OG',
      available: true,
      location: 'Crailsheim, Schwäbisch Hall (Kreis)',
      description: 'Zu der Wohnung gehört ein Balkon und ein Kellerraum. Ein separates Gäste-WC ist ' +
        'in der Wohnung vorhanden. Die Wohnung wird ohne Einbauküche vermietet. ' +
        'Der Waschmaschinen-Anschluss befindet sich in der gemeinsamen Waschküche im UG. ' +
        'Im Gebäude befindet sich kein Aufzug.'
    },
  });

  const onSubmit = (data: FormType) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      const value = (data as any)[key];
      if (key === 'price' || key === 'number_of_rooms' || key === 'square_footage') {
        formData.append(key, String(Number(value))); // Преобразуем в строку
      } else if (key === 'real_estate_image' && value instanceof File) {
        formData.append(key, value); // Добавляем файл
      } else {
        formData.append(key, value);
      }
    });

    createNew(formData).unwrap()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  };

  return (
    <>
      <DevTool control={control} />
      {isError && <Typography color="error">Ошибка при создании объекта недвижимости</Typography>}
      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ maxWidth: 600, margin: '0 auto' }} encType="multipart/form-data">
        <Typography gutterBottom>Realty Form</Typography>

        {/* Поле Title */}
        <Controller name="title" control={control} render={({ field }) => (
          <TextField {...field} label="Title" variant="outlined" fullWidth error={!!errors.title} helperText={errors.title?.message} margin="normal" />
        )} />

        {/* Поле Description */}
        <Controller name="description" control={control} render={({ field }) => (
          <TextField {...field} label="Description" variant="outlined" fullWidth multiline rows={4} error={!!errors.description} helperText={errors.description?.message} margin="normal" />
        )} />

        {/* Поле Location */}
        <Controller name="location" control={control} render={({ field }) => (
          <TextField {...field} label="Location" variant="outlined" fullWidth error={!!errors.location} helperText={errors.location?.message} margin="normal" />
        )} />

        {/* Поле Price */}
        <Controller name="price" control={control} render={({ field }) => (
          <TextField {...field} label="Price" type="number" variant="outlined" fullWidth error={!!errors.price} helperText={errors.price?.message} margin="normal"
                     onChange={(e) => field.onChange(Number(e.target.value))} />
        )} />

        {/* Поле Number of Rooms */}
        <Controller name="number_of_rooms" control={control} render={({ field }) => (
          <TextField {...field} label="Number of Rooms" type="number" variant="outlined" fullWidth error={!!errors.number_of_rooms} helperText={errors.number_of_rooms?.message} margin="normal"
                     onChange={(e) => field.onChange(Number(e.target.value))} />
        )} />

        {/* Поле Category */}
        <FormControl fullWidth margin="normal" error={!!errors.category}>
          <InputLabel>Category</InputLabel>
          <Controller name="category" control={control} render={({ field }) => (
            <Select {...field} label="Category">
              {categories?.map(i=><MenuItem value={i.id}>{i.name}</MenuItem>)}
              {/*<MenuItem value="apartment">Apartment</MenuItem>*/}
              {/*<MenuItem value="villa">Villa</MenuItem>*/}
              {/*<MenuItem value="studio">Studio</MenuItem>*/}
              {/*<MenuItem value="townhouse">Townhouse</MenuItem>*/}
              {/*<MenuItem value="duplex">Duplex</MenuItem>*/}
            </Select>
          )} />
          {errors.category && <Typography color="error">{errors.category.message}</Typography>}
        </FormControl>

        {/* Поле Available Date */}
        <Controller name="available_date" control={control} render={({ field }) => (
          <TextField {...field} label="Available Date" type="date" variant="outlined"
                     fullWidth InputLabelProps={{ shrink: true, }} error={!!errors.available_date} helperText={errors.available_date?.message} margin="normal" />
        )} />

        {/* Поле Real Estate Image */}
        <Controller name="real_estate_image" control={control} render={({ field }) => (
          <input type="file" onChange={(e) => {
            if (e.target.files) {
              field.onChange(e.target.files[0]);
            }
          }} />
        )} />

        {/* Поле Class of Realty */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Class of Realty</InputLabel>
          <Controller name="class_realty" control={control} render={({ field }) => (
            <Select {...field} label="Class of Realty">
              <MenuItem value="standard">Standard</MenuItem>
              <MenuItem value="economy">Economy</MenuItem>
              <MenuItem value="comfort">Comfort</MenuItem>
              <MenuItem value="premium">Premium</MenuItem>
              <MenuItem value="luxury">Luxury</MenuItem>
              <MenuItem value="super_luxury">Super Luxury</MenuItem>
            </Select>
          )} />
        </FormControl>

        {/* Поле Square Footage */}
        <Controller name="square_footage" control={control} render={({ field }) => (
          <TextField {...field} label="Square Footage" type="number" variant="outlined" fullWidth error={!!errors.square_footage} helperText={errors.square_footage?.message} margin="normal"
                     onChange={(e) => field.onChange(Number(e.target.value))} />
        )} />


        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }} disabled={isLoading}>Submit</Button>
      </Box>
    </>
  );
};

export default NewRealtyForm;



//
// <Controller name="real_estate_image" control={control} render={({field}) => (
//   <TextField {...field} type="file" variant="outlined" fullWidth error={!!errors.real_estate_image}
//              helperText={errors.real_estate_image?.message}
//              margin="normal" InputLabelProps={{ shrink: true, }} />)}
// />
// "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5NTQ5MzYxLCJpYXQiOjE3Mjk1NDg1MjAsImp0aSI6ImJmYTQ4NTJmYjFlMTQ4NDA5OTUxYTA2NzY0ZWNmNWQ5IiwidXNlcl9pZCI6MX0.5zkcE-YqX9ikD7xhqc_pdFvaHvbDgRDlJWCzjCuA3V0"
// "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5NTQ5NTA3LCJpYXQiOjE3Mjk1NDg1MjAsImp0aSI6IjY3NTM0YTMyMGQzNDQ5MWFiZjQ1ZDFmNmNjMWQzNDgwIiwidXNlcl9pZCI6MX0.AwhI0vHo6WZg50lC0XJHtr2dSHE2y687sqGLySx0lyU"
//            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5NTQ4ODIwLCJpYXQiOjE3Mjk1NDg1MjAsImp0aSI6IjE5Yzg0MjhmM2U0MzRkYmRiMTMxMjdmMzExODQ4MTE3IiwidXNlcl9pZCI6MX0.Cv1wl-fdG0dJ1TTvGaOTZ7t3CwPmDWVhRJXYdvMDdp8
{/*  <Controller name="real_estate_image" control={control} render={({ field }) => (*/}
{/*    <TextField {...field} type="file" variant="outlined" fullWidth error={!!errors.real_estate_image}*/}
{/*               helperText={errors.real_estate_image?.message} margin="normal" InputLabelProps={{ shrink: true }}*/}
{/*               onChange={(e) => field.onChange(e.target.files)}  // Изменено: теперь получаем FileList*/}
{/*    />*/}
{/*  )} />*/}
{/*  <Controller name="real_estate_image" control={control} render={({ field }) => (*/}
{/*    <TextField*/}
{/*      {...field}*/}
{/*      type="file"*/}
{/*      variant="outlined"*/}
{/*      fullWidth*/}
{/*      error={!!errors.real_estate_image}*/}
{/*      helperText={errors.real_estate_image?.message}*/}
{/*      margin="normal"*/}
{/*      InputLabelProps={{ shrink: true }}*/}
{/*      onChange={(e) => field.onChange(e.target.files)}  // получаем FileList*/}
{/*    />*/}
{/*  )} />*/}

