import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import { DevTool } from "@hookform/devtools";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateRealtyMutation } from "../../bll/realty/realty.service";
import { CreateRealtyDetailType, RealtyDetailsType } from "../../bll/realty/realty.type.ts";
import { useEffect } from "react";









const schema = z.object({
  // Детали недвижимости
  internet: z.string().optional(),
  garage_or_parking: z.string().optional(),
  balcony: z.string().optional(),
  heating_type: z.string().optional(),
  air_conditioning: z.boolean().optional(),
  floor_number: z.number().positive().optional(),
  total_floors: z.number().positive().optional(),
  pet_friendly: z.boolean().optional(),
  furnished: z.boolean().optional(),
  detail_description: z.string().optional(),
  // Файлы недвижимости
  realtyFiles: z.array(z.object({
    file_name: z.string().optional(),
    path: z.any().optional(), // Используем z.any() для файла
  })).optional(),
});

type FormType = z.infer<typeof schema>;

type propsType={
  onFormDataChange:(data:CreateRealtyDetailType)=>void
  detail?:RealtyDetailsType
}


const RealtyDetailForm = (props:propsType) => {
  // console.log('detail', props.detail);
  // let categories = useSelector<RootStateType, Array<CategoryType>>(state => state.app.categories);
  // const [createNew, { isLoading, isError }] = useCreateRealtyMutation();
  const { control, handleSubmit,reset, formState: { errors } } = useForm<FormType>({
    mode: 'onSubmit',
    resolver: zodResolver(schema),
    defaultValues: {
      internet: 'Telecom, 0mb/10s',
      total_floors: 2,
      garage_or_parking: 'Garage/Stellplatz: 30 €',
      // description: 'Diese gemütliche 2-Zimmer Wohnung mit einer Wohnfläche von ca. 49 m²...',
      // realtyFiles: [],
    },
  });
  useEffect(()=>{
    props.detail && reset(props.detail)
  },[props.detail])

  const onSubmit = (data: FormType) => {
    // debugger
    const formData = new FormData();
    const { realtyFiles, ...rest } = data; // Извлекаем файлы

    // Object.keys(rest).forEach(key => {
    //   const value = (rest as any)[key];
    //   if (key === 'floor_number' || key === 'total_floors') {
    //     formData.append(key, String(Number(value))); // Преобразуем в строку
    //   } else if (key === 'real_estate_image' && value instanceof File) {
    //     formData.append(key, value); // Добавляем файл
    //   } else {
    //     formData.append(key, value);
    //   }
    // });
    Object.keys(rest).forEach(key => {
      const value = (rest as any)[key];

      if (value !== undefined) {  // Проверяем, что значение определено
        if (key === 'floor_number' || key === 'total_floors') {
          formData.append(key, String(Number(value))); // Преобразуем в строку
        } else if (key === 'real_estate_image' && value instanceof File) {
          formData.append(key, value); // Добавляем файл
        } else {
          formData.append(key, value);
        }
      }
    });

    // Добавление файлов
    if (realtyFiles) {
      realtyFiles.forEach(file => {
        if (file.path) {
          formData.append('realtyFiles', file.path); // Добавляем файл
          if (file.file_name) {
            formData.append('file_name', file.file_name); // Добавляем имя файла
          }
        }
      });
    }
    console.log( formData);
    // console.log( [...formData]);

    const formDataObject = Object.fromEntries(formData.entries());
    props.onFormDataChange(formDataObject);
    // props.onFormDataChange(formData);
    // props.onFormDataChange({"details":{...formDataObject}});
    // props.onFormDataChange({"details":formDataObject})
  };





  return (
    <>
      <DevTool control={control} />
      {errors && <Typography color="error">{JSON.stringify(errors)}</Typography>}
        {/* Поля для деталей недвижимости */}
      <Box component="form"
           // onSubmit={handleSubmit(onSubmit)}
           onBlur={() => {
             handleSubmit(
               (data) => {
                 if (!Object.keys(errors).length) { onSubmit(data) }
               },
               (errors) => {
                 console.log("Errors:", errors); // Логируем ошибки для отладки
               }
             )()
           }}
           sx={{ maxWidth: 600, margin: '0 auto' }} encType="multipart/form-data">
        <Typography variant="h6" sx={{ mt: 2 }}>Details</Typography>
        <Controller name="internet" control={control} render={({ field }) => (
          <TextField {...field} label="Internet" variant="outlined" fullWidth error={!!errors.internet} helperText={errors.internet?.message} margin="normal" />
        )} />

        <Controller name="garage_or_parking" control={control} render={({ field }) => (
          <TextField {...field} label="Garage or Parking" variant="outlined" fullWidth error={!!errors.garage_or_parking} helperText={errors.garage_or_parking?.message} margin="normal" />
        )} />

        <Controller name="balcony" control={control} render={({ field }) => (
          <TextField {...field} label="Balcony" variant="outlined" fullWidth error={!!errors.balcony} helperText={errors.balcony?.message} margin="normal" />
        )} />

        <Controller name="heating_type" control={control} render={({ field }) => (
          <TextField {...field} label="Heating Type" variant="outlined" fullWidth error={!!errors.heating_type} helperText={errors.heating_type?.message} margin="normal" />
        )} />

        <Controller name="air_conditioning" control={control} render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Air Conditioning"
          />
        )} />

        <Controller name="floor_number" control={control} render={({ field }) => (
          <TextField {...field} label="Floor Number" type="number" variant="outlined" fullWidth error={!!errors.floor_number} helperText={errors.floor_number?.message} margin="normal"
	      onChange={(e) => field.onChange(Number(e.target.value))} />
        )} />

        <Controller name="total_floors" control={control} render={({ field }) => (
          <TextField {...field} label="Total Floors" type="number" variant="outlined" fullWidth error={!!errors.total_floors} helperText={errors.total_floors?.message} margin="normal"
	      onChange={(e) => field.onChange(Number(e.target.value))} />
        )} />

        <Controller name="pet_friendly" control={control} render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Pet Friendly"
          />
        )} />

        <Controller name="furnished" control={control} render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Furnished"
          />
        )} />

        <Controller name="detail_description" control={control} render={({ field }) => (
          <TextField {...field} label="Detail Description" variant="outlined" fullWidth multiline rows={4} error={!!errors.detail_description} helperText={errors.detail_description?.message} margin="normal" />
        )} />

        {/* Поля для файлов недвижимости */}
        <Typography variant="h6" sx={{ mt: 2 }}>Files</Typography>
        <Controller name="realtyFiles" control={control} render={({ field }) => (
          <>
            <input type="file" onChange={(e) => {
              if (e.target.files) {
	 const filesArray = Array.from(e.target.files).map(file => ({ path: file })); // Формируем массив файлов
	 field.onChange(filesArray); // Устанавливаем файлы в состояние
              }
            }} multiple />
            {errors.realtyFiles && <Typography color="error">{errors.realtyFiles.message}</Typography>}
          </>
        )} />

        {/*<Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }} disabled={isLoading}>Submit</Button>*/}
      </Box>
    </>
  );
};


export default RealtyDetailForm;
