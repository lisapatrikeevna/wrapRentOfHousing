import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Paper, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NewRealtyForm from "../../components/newRealtyForm/NewRealtyForm";
import { RootStateType } from "../../bll/store";
import { useSelector } from "react-redux";
import { useCreateRealtyMutation, useGetRealtyQuery } from "../../bll/realty/realty.service";
import OneAd from "../../components/realty/OneAd";
import RealtyDetailForm from "../../components/newRealtyForm/RealtyDetailForm";
import { useState } from "react";
import { CreateRealtyDetailType, CreateRealtyType } from "../../bll/realty/realty.type";
import cl from './LandlordPage.module.scss'




const LandlordPage = () => {
  const id = useSelector<RootStateType, number | undefined>(state => state.app.user?.id);
  const {data: realty, isLoading: isRealtyLoading, isError: isRealtyError} = useGetRealtyQuery({params: `?author=${id}`});
  console.log('id, realty',id, realty);
  const [createNew, {isError}] = useCreateRealtyMutation();
  const [newRealtyData, setNewRealtyData] = useState<CreateRealtyType | null>(null);
  const [realtyDetailData, setRealtyDetailData] = useState<CreateRealtyDetailType | null>(null);
  //@ts-ignore
  const handleNewRealtyData = (data) => {
    setNewRealtyData(data);
  };
//@ts-ignore
  const handleRealtyDetailData = (data) => {
    setRealtyDetailData(data);
  };


  const createNewRealty = () => {
    const data = new FormData();
    newRealtyData && Object.keys(newRealtyData).forEach(key => {
      // @ts-ignore
      data.append(key, newRealtyData[key]);
    });

    if( realtyDetailData ) {
      Object.keys(realtyDetailData).forEach(key => {
        // @ts-ignore
        const value = realtyDetailData[key];
        // Проверяем, если это файл
        if( key === 'realtyFiles' && value instanceof File ) {
          data.append(`details.${key}`, value);
        }
        data.append(`details.${key}`, value); // Используем квадратные скобки
        // data.append(`details[${key}]`, realtyDetailData[key]); // Используем квадратные скобки
      });
    }
    data.append('author', id);

    console.log("Final data to send:", ...data); // Логируем данные для проверки

    createNew(data).unwrap()
    .then((res) => console.log("Response: ", res))
    .catch((err) => console.error("Error: ", err.errors));
  };







  return (<Box className={cl.root}>
    {/*update current objects*/}
    <Paper sx={{width: '90%', margin: '60px auto 20px', p: 2}}>
      {isError && <Typography color="error">Ошибка при создании объекта недвижимости</Typography>}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1-content" id="panel1-header">
          <Typography variant="h4" gutterBottom>create new add</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <NewRealtyForm onFormDataChange={handleNewRealtyData}/>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1-content" id="panel1-header">
          <Typography variant="h4" gutterBottom>more details for add</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RealtyDetailForm onFormDataChange={handleRealtyDetailData}/>
        </AccordionDetails>
      </Accordion>
      <Button onClick={createNewRealty} disabled={!newRealtyData}> send </Button>
    </Paper>

    {isRealtyLoading && <Typography>Loading...</Typography>}
    {(!isRealtyLoading && !isRealtyError && realty?.data) && <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel2-content" id="panel2-header">
        <Typography>my realty</Typography>
      </AccordionSummary>

      <AccordionDetails>
        <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}} justifyContent="center">
          {realty.data.map(i => {return <Grid item xs={12} sm={6} md={4} lg={3} key={i.id}> <OneAd item={i}/> </Grid> })}
        </Grid>
      </AccordionDetails>
    </Accordion>}
  </Box>);
};

export default LandlordPage;


// ------POST request.data: <QueryDict: {
// 'title': [' some test990'],
// 'description': ['en, die Sie für ein komfortables und sorgenfreies Leben benötigen.'],
// 'location': [' Schießhausweg 7, 74564 Crailsheim, Schwäbisch Hall '],
// 'price': ['810'],
// 'number_of_rooms': ['3'],
// 'category': ['4'],
// 'available': ['true'],
// 'available_date': ['2024-11-15'],
// 'class_realty': ['comfort'],
// 'square_footage': ['23'],
// 'details[internet]': ['Telecom, 0mb/10s'],
// 'details[garage_or_parking]': ['Garage/Stellplatz: 30 €'],
// 'details[floor_number]': ['9'],
// 'details[total_floors]': ['21'],
// 'author': ['6'],
// 'real_estate_image': [<InMemoryUploadedFile: 0e4355a6-4788-4a66-97c3-24e6fe1e8343-1857281401.webp (image/webp)>],
// 'details[realtyFiles]': [<InMemoryUploadedFile: a960e1a5-6724-4f80-902d-fa0cb38c046e-1857281375.webp (image/webp)>, <InMemoryUploadedFile: a960e1a5-6724-4f80-902d-fa0cb38c046e-1857281375.webp (image/webp)>]}>


// Final data to send:
// (2) ['title', 'Mietkauf statt Miete!!!']
// (2) ['description', 'Erfüllen Sie sich den Traum vom Eigenheim ohne Eig…ft im eigenen Heim.\n- Endlich raus aus der Miete!']
// (2) ['location', 'poland']
// (2) ['price', '530']
// (2) ['number_of_rooms', '5']
// (2) ['category', '5']
// (2) ['available_date', '2024-10-08']
// (2) ['real_estate_image', File]
// (2) ['class_realty', 'premium']
// (2) ['square_footage', '140']
// (2) ['details.internet', ' 7 mb/s']
// (2) ['details.garage_or_parking', ' 7,14 €/м²']
// (2) ['details.floor_number', '1']
// (2) ['details.total_floors', '1']
// (2) ['author', '6']









