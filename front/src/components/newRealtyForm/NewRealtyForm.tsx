import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateRealtyMutation } from "../../bll/realty/realty.service";
import { useSelector } from "react-redux";
import { RootStateType } from "../../bll/store";
import { CategoryType } from "../../bll/category/category.service";
import { CreateRealtyType, RealtyType } from "@/bll/realty/realty.type";
import { useEffect } from "react";


const schema = z.object({
  title: z.string().max(150, 'Title must be at most 150 characters long').nonempty('Title is required'),
  description: z.string().nonempty('Description is required'),
  location: z.string().max(200, 'Location must be at most 200 characters long'),
  price: z.number().positive('Price must be greater than 0').max(99999999.99, 'Price must be at most 99999999.99'),
  number_of_rooms: z.number().int('Number of rooms must be an integer').min(1, 'Number of rooms must be at least 1'),
  category: z.number(),
  available: z.boolean().optional(),
  available_date: z.string(),
  // available_date: z.string().optional(),
  real_estate_image: z.any().optional(),
  // real_estate_image: z.instanceof(File).optional(),  // Убедитесь, что файл обрабатывается правильно
  class_realty: z.enum(['standard', 'economy', 'comfort', 'premium', 'luxury', 'super_luxury']).default('standard'),
  square_footage: z.number().min(0, 'Square footage must be at least 0'),
  // detail: z.number().optional(),
});

type FormType = z.infer<typeof schema>;
type propsType={
  onFormDataChange:(data:CreateRealtyType)=>void
  realty?: RealtyType
  isSuccessful?:boolean
}

const NewRealtyForm = (props:propsType) => {
  let categories = useSelector<RootStateType, Array<CategoryType>>(state => state.app.categories)
  const { control, register, handleSubmit, formState: { errors },reset } = useForm<FormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      title:' Neuwertige 2-Zimmer-Wohnung',
      available: true,
      location: ' Schießhausweg 7, 74564 Crailsheim, Schwäbisch Hall ',
      description: 'en, die Sie für ein komfortables und sorgenfreies Leben benötigen.',
      price: 1000
    },
  });
  useEffect(()=> { if( props.isSuccessful ) reset()},[props.isSuccessful])
  useEffect(()=> { if( props.realty ) reset(props.realty)},[props.realty])

  const onSubmit = (data: FormType) => {
    const formData = new FormData();

    Object.keys(data).forEach(key => {
      const value = (data as any)[key];

      // Проверка перед добавлением значений
      if (value === undefined || value === null || value === '') return;

      if (key === 'price' || key === 'number_of_rooms' || key === 'square_footage') {
        formData.append(key, String(Number(value))); // Преобразуем числа в строки
      } else if (key === 'available_date') {
        const formattedDate = new Date(value).toISOString().split('T')[0]; // Преобразуем дату в формат YYYY-MM-DD
        formData.append(key, formattedDate);
      } else if (key === 'real_estate_image' && value instanceof File) {
        formData.append(key, value); // Добавляем только, если это файл
      } else {
        formData.append(key, value);
      }
    });

    console.log(errors, [...formData]); // Вывод массива пар [ключ, значение]
    const formDataObject = Object.fromEntries(formData.entries());
    props.onFormDataChange(formDataObject);
  };

  return (
    <>
      <DevTool control={control} />

      {errors && <Typography color="error">{JSON.stringify(errors)}</Typography>}
      <Box component="form"
           // onSubmit={handleSubmit(onSubmit)}
           // onBlur={handleSubmit(onSubmit)} // вызываем submit при потере фокуса формы
           onBlur={() => {
             handleSubmit(
               (data) => {
                 if (!Object.keys(errors).length) { onSubmit(data) }
               },
               (errors) => {
                 // console.log("Errors:", errors); // Логируем ошибки для отладки
               }
             )();
           }}
           sx={{ maxWidth: 600, margin: '0 auto' }} encType="multipart/form-data">
        <Typography gutterBottom>Realty Form</Typography>

        {/* Поле Title */}
        <Controller  name="title" control={control} render={({ field }) => (
          <TextField required {...field} label="Title" variant="outlined" fullWidth error={!!errors.title} helperText={errors.title?.message} margin="normal" />
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
        <FormControl required fullWidth margin="normal" error={!!errors.category}>
          <InputLabel>Category</InputLabel>
          <Controller name="category" control={control} render={({ field }) => (
            <Select {...field} label="Category">
              {categories?.map(i=><MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>)}
            </Select>
          )} />
          {errors.category && <Typography color="error">{errors.category.message}</Typography>}
        </FormControl>

        {/* Поле Available Date */}
        <Controller name="available_date" control={control} render={({ field }) => (
          <TextField required {...field} label="Available Date" type="date" variant="outlined"
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


        {/*<Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }} disabled={isLoading}>Submit</Button>*/}
      </Box>
    </>
  );
};

export default NewRealtyForm;




