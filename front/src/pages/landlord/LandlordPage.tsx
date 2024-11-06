import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NewRealtyForm from "../../components/newRealtyForm/NewRealtyForm";
import { RootStateType } from "../../bll/store";
import { useSelector } from "react-redux";
import { useGetRealtyQuery } from "../../bll/realty/realty.service";
// import Grid from "@mui/material/Grid2";
import OneAd from "../../components/realty/OneAd";


const LandlordPage = () => {
  const id = useSelector<RootStateType, number|undefined>(state => state.app.user?.id);
  const { data: realty, isLoading: isRealtyLoading, isError: isRealtyError } = useGetRealtyQuery({ params: `?author=${id}`});
  console.log('data',id, realty);


  return (<div>
    {/*update current objects*/}
    <Accordion defaultExpanded>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel1-content" id="panel1-header">
        <Typography variant="h4" gutterBottom>create new add</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <NewRealtyForm/>
      </AccordionDetails>
    </Accordion>

    {isRealtyLoading && <Typography>Loading...</Typography>}
    {(!isRealtyLoading && !isRealtyError && realty?.data )&&
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel2-content" id="panel2-header">
        <Typography>my realty</Typography>
      </AccordionSummary>

       <AccordionDetails>
         <Grid container rowSpasing={2} columnSpacing={{xs: 1, sm: 2, md: 3}} justifyContent="center">
           {realty.data.map(i=>{return  <Grid item xs={12} sm={6} md={4} lg={3} key={i.id}>  <OneAd item={i}/> </Grid> }) }
        {/*{JSON.stringify(realty) }*/}
        </Grid>
      </AccordionDetails>
    </Accordion>}
  </div>);
};

export default LandlordPage;
