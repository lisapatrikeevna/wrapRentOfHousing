import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Grid, Paper, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NewRealtyForm from "../../components/newRealtyForm/NewRealtyForm";
import { RootStateType } from "../../bll/store";
import { useSelector } from "react-redux";
import { useCreateRealtyMutation, useGetRealtyQuery } from "../../bll/realty/realty.service";
import OneAd from "../../components/realty/OneAd";
import RealtyDetailForm from "../../components/newRealtyForm/RealtyDetailForm";
import React, { useState } from "react";
import { CreateRealtyDetailType, CreateRealtyType } from "../../bll/realty/realty.type";
import cl from './LandlordPage.module.scss'



const LandlordPage = () => {
  const id = useSelector<RootStateType, number | undefined>(state => state.app.user?.id);
  const {data: realty, isLoading: isRealtyLoading, isError: isRealtyError} = useGetRealtyQuery({params: `?author=${id}`});
  // console.log('id, realty',id, realty);
  const [createNew, {isLoading, isError}] = useCreateRealtyMutation();
  const [newRealtyData, setNewRealtyData] = useState<CreateRealtyType | null>(null);
  const [realtyDetailData, setRealtyDetailData] = useState<CreateRealtyDetailType | null>(null);
  const handleNewRealtyData = (data) => {
    setNewRealtyData(data);
  };

  const handleRealtyDetailData = (data) => {
    setRealtyDetailData(data);
    // console.log('parse', Object.keys(data).forEach(key => {data.append(key, data[key]) }) )
    // console.log('------',[...data]);
    // console.log('------',Object.fromEntries(data.entries()));
    // console.log('------3---',"details", JSON.stringify(realtyDetailData));
  };

  const createNewRealty = () => {
    console.log("newRealtyData: ", newRealtyData);
    console.log("realtyDetailData", realtyDetailData);

    let data = {...newRealtyData, author: id}
    if( realtyDetailData ) {
      data = {...data, details: [{...realtyDetailData.details}]}
    }
    // const data = new FormData();
    //
    // // Добавляем данные из newRealtyData
    // Object.keys(newRealtyData.details).forEach(key => {
    //   data.append(key, newRealtyData[key]);
    // });

    // Добавляем данные из realtyDetailData, если они есть
    // if (realtyDetailData) {
    //   // Object.keys(realtyDetailData).forEach(key => {
    //   //   data.append(key, realtyDetailData[key]);
    //   // });
    //   data.append("details", JSON.stringify(realtyDetailData))
    //   console.log('!!!!!!!!!!!!!!!parse',JSON.stringify(realtyDetailData))
    // }
    // if (realtyDetailData) {
    //   Object.keys(realtyDetailData).forEach(key => {
    //     data.append(`details[${key}]`, realtyDetailData[key]); // Важно: используем квадратные скобки здесь
    //   });
    // }

    // Добавляем автора
    // data.append('author', id);

    console.log("data: ", data);
    // debugger
    createNew(data).unwrap()
    .then((res) => console.log("res !!!!!!!!!!!!", res))
    .catch((err) => console.log(err.errors));
  }

  // const createNewRealty = () => {
  //   console.log("createNewRealty/newRealtyData", newRealtyData);
  //   console.log("createNewRealty/realtyDetailData", realtyDetailData);
  //
  //   const data = new FormData();
  //
  //   // // Проверяем, что все обязательные поля присутствуют
  //   // if (!newRealtyData.title || !newRealtyData.price || !newRealtyData.description || !newRealtyData.location || !newRealtyData.number_of_rooms || !newRealtyData.available_date || !newRealtyData.category) {
  //   //   console.error("Missing required fields in newRealtyData");
  //   //   return; // Выход без отправки данных
  //   // }
  //
  //   // Добавляем данные из newRealtyData
  //   Object.keys(newRealtyData).forEach(key => {
  //     data.append(key, newRealtyData[key]);
  //   });
  //
  //   // Добавляем данные о деталях, если они есть
  //   // if (realtyDetailData) {
  //   //   // Object.keys(realtyDetailData).forEach(key => {
  //   //   //   data.append(`details[${key}]`, realtyDetailData[key]); // Важно: используем квадратные скобки здесь
  //   //   // });
  //   //   // data.append(realtyDetailData)
  //   //   // Перебираем ключи в объекте details
  //   //   //@ts-ignore
  //   //   Object.keys(realtyDetailData.details).forEach(key => {
  //   //     data.append(`details[${key}]`, realtyDetailData.details[key]); // Используем квадратные скобки
  //   //   });
  //   // }
  //   // Добавьте детали, если они есть
  //   //@ts-ignore
  //   // if (realtyDetailData && realtyDetailData.details) {
  //   //   Object.keys(realtyDetailData.details).forEach(key => {
  //   //     data.append(`details[${key}]`, realtyDetailData.details[key]); // Используйте квадратные скобки
  //   //   });
  //   // }
  //   if (realtyDetailData && realtyDetailData.details) {
  //     const detailsJson = JSON.stringify(realtyDetailData.details);
  //     data.append('details', detailsJson); // Добавляем details как строку JSON
  //   }
  //   data.append('author', id); // Добавляем автора
  //
  //   console.log("Final data to send:", [...data]); // Логируем данные для проверки
  //
  //   createNew(data)
  //   .unwrap()
  //   .then((res) => console.log("Response: ", res))
  //   .catch((err) => console.error("Error: ", err.errors));
  // };

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
          {/*{JSON.stringify(realty) }*/}
        </Grid>
      </AccordionDetails>
    </Accordion>}
  </Box>);
};

export default LandlordPage;
