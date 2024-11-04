import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NewRealtyForm from "../../components/newRealtyForm/NewRealtyForm";
import { RootStateType } from "../../bll/store";
import { useSelector } from "react-redux";
import { useGetRealtyQuery } from "../../bll/realty/realty.service";


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
    {!isRealtyLoading && !isRealtyError &&
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon/>} aria-controls="panel2-content" id="panel2-header">
        <Typography>my realty</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {/*<Typography>*/}
        {/*  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse*/}
        {/*  malesuada lacus ex, sit amet blandit leo lobortis eget.*/}
        {/*</Typography>*/}
        {JSON.stringify(realty) }
      </AccordionDetails>
    </Accordion>}
  </div>);
};

export default LandlordPage;
