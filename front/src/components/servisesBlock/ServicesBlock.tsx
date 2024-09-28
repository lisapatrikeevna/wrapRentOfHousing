import { Box, Container, Typography } from "@mui/material";
import ServicesItem from "./ServicesItem";
import cl from './ServicesBlock.module.scss'
import SendTimeExtensionSharpIcon from '@mui/icons-material/SendTimeExtensionSharp';
import AddHomeWorkSharpIcon from '@mui/icons-material/AddHomeWorkSharp';
import AssuredWorkloadSharpIcon from '@mui/icons-material/AssuredWorkloadSharp';
import BalanceSharpIcon from '@mui/icons-material/BalanceSharp';
import BiotechSharpIcon from '@mui/icons-material/BiotechSharp';
import InventorySharpIcon from '@mui/icons-material/InventorySharp';



const servicesList=[
  {id:'1' ,imgIcon:InventorySharpIcon,title:'SCHUFA-BonitätsCheck',description:'In nur 3 Minuten online erhalten'},
  {id:'1q' ,imgIcon:AddHomeWorkSharpIcon,title:'Bewerten',description:'Aktuellen Marktwert berechnen'},
  {id:'1s' ,imgIcon:AssuredWorkloadSharpIcon,title:'ImmoKlub',description:'Rundum Schutz für Zuhause'},
  {id:'1d' ,imgIcon:BiotechSharpIcon,title:'Plus entdecken',description:'Schneller in dein Traumzuhause'},
  {id:'1f' ,imgIcon:BalanceSharpIcon,title:'Finanzieren',description:'Zinsen & Raten'},
  {id:'1x' ,imgIcon:SendTimeExtensionSharpIcon,title:'Umziehen',description:'Kostenlose Angebote für deinen Umzug'},
]


const ServicesBlock = () => {
  return (<Container className={cl.root}>
    <Typography variant={'h3'}>
      Wenn’s drauf ankommt
    </Typography>
    <Typography variant={'subtitle2'}>
      Entdecke die passenden Services, um jede Situation zu meistern.
    </Typography>
    <Box className={cl.servicesBlock}>
      {servicesList.map(i=><ServicesItem key={i.id} imgIcon={i.imgIcon} title={i.title} description={i.description}/> )}
    </Box>
  </Container>);
};


export default ServicesBlock;
