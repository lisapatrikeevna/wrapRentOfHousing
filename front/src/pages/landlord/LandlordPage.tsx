import { Accordion, AccordionDetails, AccordionSummary, Button, Grid, Paper, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NewRealtyForm from "../../components/newRealtyForm/NewRealtyForm";
import { RootStateType } from "../../bll/store";
import { useSelector } from "react-redux";
import { useCreateRealtyMutation, useGetRealtyQuery } from "../../bll/realty/realty.service";
// import Grid from "@mui/material/Grid2";
import OneAd from "../../components/realty/OneAd";
import RealtyDetailForm from "../../components/newRealtyForm/RealtyDetailForm";
import { useState } from "react";
import { CreateRealtyDetailType, CreateRealtyType } from "../../bll/realty/realty.type";


const LandlordPage = () => {
  const id = useSelector<RootStateType, number|undefined>(state => state.app.user?.id);
  const { data: realty, isLoading: isRealtyLoading, isError: isRealtyError } = useGetRealtyQuery({ params: `?author=${id}`});
  console.log('data',id, realty);
  const [createNew, { isLoading, isError }] = useCreateRealtyMutation();
  const [newRealtyData, setNewRealtyData] = useState<CreateRealtyType|null>(null);
  const [realtyDetailData, setRealtyDetailData] = useState<CreateRealtyDetailType|null>(null);
  const handleNewRealtyData = (data) => {
    setNewRealtyData(data);
  };

  const handleRealtyDetailData = (data) => {
    setRealtyDetailData(data);
  };

  const createNewRealty=()=>{
    // {
    //   "price": "12345.67",  // Цена в десятичном формате с двумя знаками после запятой
    //   "details": {
    //   // Поля, необходимые для RealtyDetailSerializer, например:
    //   "description": "Описание недвижимости",
    //     "floor_area": 120.5
    // },
    //   "realtyFiles": [
    //   {
    //     "file_url": "http://example.com/file1.jpg",
    //     "file_type": "image"
    //   },
    //   {
    //     "file_url": "http://example.com/file2.jpg",
    //     "file_type": "image"
    //   }
    // ],
    //   // Остальные поля, требуемые моделью Realty, например:
    //   "address": "123 Main St",
    //   "number_of_rooms": 3,
    //   "available_date": "2024-12-01"
    // }
    console.log("newRealtyData: ", newRealtyData);
    console.log("realtyDetailData", realtyDetailData);

    let data={...newRealtyData, author:id}
    if(realtyDetailData){
      data={...data, details:realtyDetailData}
    }
    console.log("data: ", data);
    debugger
    createNew(data)
    .unwrap()
    .then((res) => console.log("res !!!!!!!!!!!!", res))
    .catch((err) => console.log(err));
  }


  return (<>
    {/*update current objects*/}
    <Paper sx={{width: '90%', margin: '60px auto 20px', p: 2}}>
      {isError && <Typography color="error">Ошибка при создании объекта недвижимости</Typography>}
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1-content" id="panel1-header">
        <Typography variant="h4" gutterBottom>create new add</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <NewRealtyForm onFormDataChange={handleNewRealtyData} />
      </AccordionDetails>
    </Accordion>
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1-content" id="panel1-header">
        <Typography variant="h4" gutterBottom>more details for add</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <RealtyDetailForm onFormDataChange={handleRealtyDetailData}/>
      </AccordionDetails>
    </Accordion>
      <Button onClick={createNewRealty}> send </Button>
    </Paper>
    {isRealtyLoading && <Typography>Loading...</Typography>}
    {(!isRealtyLoading && !isRealtyError && realty?.data )&&
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel2-content" id="panel2-header">
        <Typography>my realty</Typography>
      </AccordionSummary>

       <AccordionDetails>
         <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}} justifyContent="center">
           {realty.data.map(i=>{return  <Grid item xs={12} sm={6} md={4} lg={3} key={i.id}>  <OneAd item={i}/> </Grid> }) }
        {/*{JSON.stringify(realty) }*/}
        </Grid>
      </AccordionDetails>
    </Accordion>}
  </>);
};

export default LandlordPage;
