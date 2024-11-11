import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Collapse, IconButton, IconButtonProps, Typography } from "@mui/material";
import { RealtyType } from "../../bll/realty/realty.service";
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import cl from './RealEstate.module.scss'
import { useNavigate } from "react-router-dom";
import { PATH } from "../../router";
import { API_STATIC_MEDIA } from "../../config";
import defaultImg from '@/assets/baseImgR.webp'


interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const {expand, ...other} = props;
  return <IconButton {...other} />;
})(({theme}) => ({
  marginLeft: 'auto', transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }), variants: [{
    props: ({expand}) => !expand, style: {
      transform: 'rotate(0deg)',
    },
  }, {
    props: ({expand}) => !!expand, style: {
      transform: 'rotate(180deg)',
    },
  },],
}));

type PropsType = {
  item: RealtyType
}


const OneAd = ({item,}: PropsType) => {
  const navigate = useNavigate()
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // {
  //   "id": 1,
  //   "title": "title",
  //   "description": "desc apartment",
  //   "location": "Rosengarten",
  //   "price": "800.00",
  //   "number_of_rooms": 3,
  //   "available": true,
  //   "rating": 5.0,
  //   "register_date": "2024-09-22",
  //   "available_date": "2024-09-09",
  //   "real_estate_image": "http://127.0.0.1:12345/media/real_estate_images/favicon_dvKcBp1.png",
  //   "category": 1,
  //   "author": 1
  // },
  // console.log('img pass',item.real_estate_image );



  return <Card sx={{maxWidth: 345}}>
    <CardHeader avatar={<Avatar sx={{bgcolor: red[500]}} aria-label="recipe">R</Avatar>}
	 action={<IconButton aria-label="settings"> <MoreVertIcon/> </IconButton>}
	 title={item.title} subheader="September 14, 2016" onClick={()=>navigate(PATH.itemRealty,{state:{id:item.id} })}/>
    <Box className={cl.clipPolygon} >
      <Box className={cl.shadow}>
        <Typography sx={{fontWeight: 'bold'}}>
          {item.price} $
        </Typography>
        <Typography>
          {item.number_of_rooms}/120m
        </Typography>
      </Box>
      <CardMedia component="img" height="194" alt="Paella dish"
        image={item.real_estate_image ? item.real_estate_image : defaultImg}
      />
    </Box>
    <CardContent className={cl.flexWrapp} sx={{width:'100%',display:'flex',justifyContent:'space-between'}}>
      <Typography variant="body2" sx={{color: 'text.secondary'}}>
        {item.location}
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
        <FavoriteIcon/>
      </IconButton>
      <IconButton aria-label="share">
        <ShareIcon/>
      </IconButton>
      <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
        <ExpandMoreIcon/>
      </ExpandMore>
    </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography sx={{marginBottom: 2}}>Method:</Typography>
        <Typography sx={{marginBottom: 2}}>
          Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
          aside for 10 minutes.
        </Typography>
        <Typography sx={{marginBottom: 2}}>
          {item.description}
        </Typography>
        <Typography>
          Set aside off of the heat to let rest for 10 minutes, and then serve.
        </Typography>
      </CardContent>
    </Collapse>
  </Card>

  // return <Paper className={cl.advert} grap={1}>
  //   <Typography variant="h5">{item.title}</Typography>
  //   <p>{item.description}</p>
  //   <p>{item.price}</p>
  // </Paper>
};

export default OneAd;
