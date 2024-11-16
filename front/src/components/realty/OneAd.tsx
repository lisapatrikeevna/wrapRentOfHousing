import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CircularProgress, Collapse, IconButton, IconButtonProps, Typography } from "@mui/material";
import { usePatchRealtyMutation } from "../../bll/realty/realty.service";
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import cl from './RealEstate.module.scss'
import { useNavigate } from "react-router-dom";
import { PATH } from "../../router";
import defaultImg from '@/assets/baseImgR.webp'
import { useDispatch, useSelector } from "react-redux";
import { UserType } from "../../bll/auth/auth.type";
import { RootStateType } from "../../bll/store";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { useMeQuery } from "../../bll/auth/auth.servies";
import { RealtyType } from "../../bll/realty/realty.type";
import { appAC } from "../../bll/app.slice";


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
  const[skip,setSkip]=useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector<RootStateType, UserType | null>(state => state.app.user)
  const [propertiesUpdate, {error, isLoading}] = usePatchRealtyMutation()
  //@ts-ignore
  const {updatedUser, isLoading:isMeLoad} = useMeQuery(undefined,{skip:skip})
  const [expanded, setExpanded] = useState(false);
  const [sneckOpen, setSneckOpen] = useState(false)
  const [message, setMessage] = useState('')
  const isReservation = user?.reserv_properties?.some((id:number) => id === item.id);
  const isFavorite = user?.favorite_properties?.some((realtyId:number) => realtyId === item.id);
  const favoriteStyles = {
    color: isFavorite? "#f44336":""
  }
  const reservStyles = {
    color: isReservation? "#f44336":""
  }
  useEffect(() => {
    if (updatedUser) {
      dispatch(appAC.setUser(updatedUser));
      setSkip(true); // Возвращаем `skip` обратно, чтобы не выполнять лишние запросы
    }
  }, [updatedUser, dispatch]);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  }
  const addToFavoritHandler = () => {
    if( !user ) {
      setMessage("нехрен фармазонить, иди логинься")
      setSneckOpen(true)
    } else if( user.id === item.author ) {
      setMessage("нефиг лайкать своё")
      setSneckOpen(true)
    } else {
      propertiesUpdate({id: item.id, body: {'favorite': user?.id}}).unwrap()
      .then(() => {
        setSkip(false)// Отключаем skip, чтобы `useMeQuery` выполнился
        setSneckOpen(true)
        setMessage("status favorite is changed")
        // updatedUser && dispatch(appAC.setUser(updatedUser))
        // setSkip(true)

      })
      .catch(() => {
        setMessage("error when changing favorite status")
        setSneckOpen(true)
      })
    }
  }
  const addToReservHandler = () => {
    if( !user ) {
      setMessage("нехрен фармазонить, иди логинься")
      setSneckOpen(true)
    } else {
      propertiesUpdate({id: item.id, body: {'reservations': user?.id}}).unwrap()
      .then(() => {
        setSkip(true)
        setMessage("Добавлено в Reserv")
        setSneckOpen(true)
        dispatch(appAC.setUser(updatedUser))
        setSkip(false)
      })
      .catch(() => {
        setMessage("Ошибка при добавлении в Reserv")
        setSneckOpen(true)
      })
    }
  }
  //@ts-ignore
  const handleClose = (event: React.SyntheticEvent | Event, reason?: SnackbarCloseReason,) => {
    if( reason === 'clickaway' ) {
      return
    }
    setSneckOpen(false)
  }
  const action = (<IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
      <CloseIcon fontSize="small"/>
    </IconButton>);
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
  // console.log('item: ',item);
  // chrome.runtime.sendMessage({ /* some data */ }, (response) => {
  //   if (chrome.runtime.lastError) {
  //     console.error("Error sending message:", chrome.runtime.lastError);
  //   } else {
  //     console.log("Response:", response);
  //   }
  // });

  console.log('user', user);




  return <>
    {error && <p>"error",{ error.toString()}</p>}
    {(isLoading || isMeLoad) && <CircularProgress />}
    <Card sx={{maxWidth: 345}}>
      <CardHeader avatar={<Avatar sx={{bgcolor: red[500]}} aria-label="recipe">R</Avatar>}
	   action={<IconButton aria-label="settings"> <MoreVertIcon/> </IconButton>}
	   title={item.title} subheader="September 14, 2016" onClick={() => navigate(PATH.itemRealty, {state: {id: item.id}})}/>
      <Box className={cl.clipPolygon}>
        <Box className={cl.shadow}>
          <Typography sx={{fontWeight: 'bold'}}>
            {item.price} $
          </Typography>
          <Typography>
            {item.number_of_rooms}/120m
          </Typography>
        </Box>
        <CardMedia component="img" height="194" alt="Paella dish" image={item.real_estate_image ? item.real_estate_image : defaultImg}/>
      </Box>
      <CardContent className={cl.flexWrapp} sx={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="body2" sx={{color: 'text.secondary'}}>
          {item.location}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={addToFavoritHandler}>
          <FavoriteIcon style={favoriteStyles}/>
        </IconButton>
        <IconButton aria-label="share" onClick={addToReservHandler}>
          <AddBusinessIcon style={reservStyles}/>
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
    {/*<Button onClick={handleClick}>Open Snackbar</Button>*/}
    <Snackbar open={sneckOpen} autoHideDuration={3000} onClose={handleClose}
              message={message} action={action}/>
  </>
};

export default OneAd;
