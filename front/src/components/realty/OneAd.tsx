import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CircularProgress, Collapse, IconButton, IconButtonProps, Typography } from "@mui/material";
import { usePatchRealtyMutation, useSetBookingMutation} from "../../bll/realty/realty.service";
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import cl from './RealEstate.module.scss'
import { useNavigate } from "react-router-dom";
import { PATH } from "../../router";
import defaultImg from '@/assets/baseImgR.webp'
import { useSelector } from "react-redux";
import { UserType } from "../../bll/auth/auth.type";
import { RootStateType } from "../../bll/store";
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { RealtyType } from "../../bll/realty/realty.type";
import BookingModal from "../bookingModal/BookingModal";


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


const OneAd = ({item}: PropsType) => {
  const navigate = useNavigate()
  const user = useSelector<RootStateType, UserType | null>(state => state.app.user)
  const [propertiesUpdate, {error, isLoading}] = usePatchRealtyMutation()
  const [setBooking, {error: bookingErr}] = useSetBookingMutation()
  const [openBooking, setOpenBooking] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [sneckOpen, setSneckOpen] = useState(false)
  const [message, setMessage] = useState('')
  const isReservation = user?.reserv_properties?.some((id: number) => id === item.id);
  const isFavorite = user?.favorite_properties?.some((realtyId: number) => realtyId === item.id);
  const favoriteStyles = {
    color: isFavorite ? "#f44336" : ""
  }
  const reservStyles = {
    opacity: isReservation ? 1 : 0.5,
    color: (new Date(item.available_date) <= new Date(new Date().setHours(0, 0, 0, 0)))  ? "#f44336" : ""
  }
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
      propertiesUpdate({id: item.id, body: {'favorite': user.id}}).unwrap()
      .then(() => {
        setSneckOpen(true)
        setMessage("status favorite is changed")
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
      setOpenBooking(!openBooking)
      //

    }
  }
  const bookingOpenHandles = (date: Date[]) => {
    let data = {
      realty: item.id,
      start_date: date[0].toISOString().split('T')[0],
      end_date: date[1].toISOString().split('T')[0],
      user: user?.id
    }
    data.user && setBooking(data).unwrap().then(() => {
      // @ts-ignore
      propertiesUpdate({id: item.id, body: {'reservations': user.id}}).unwrap()
      .then(() => {
        setMessage("Добавлено в Reserv")
        setSneckOpen(true)
      })
      .catch((err) => {
         console.log("err &&",err)
        setMessage("Ошибка при добавлении в Booking")
        setSneckOpen(true)
      })
    }).catch((err) => {
      console.log("bookingErr,err", bookingErr, err.error);
      setMessage(bookingErr|| err.toString())
      setSneckOpen(true)
    })
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

  // console.log('item: ',item);
  // chrome.runtime.sendMessage({ /* some data */ }, (response) => {
  //   if (chrome.runtime.lastError) {
  //     console.error("Error sending message:", chrome.runtime.lastError);
  //   } else {
  //     console.log("Response:", response);
  //   }
  // });

  // console.log('user', user);


  return <>
    {error && <p>"error",{error.toString()}</p>}
    {(isLoading) && <CircularProgress/>}
    <Card sx={{maxWidth: 345}}>
      <CardHeader avatar={<Avatar sx={{bgcolor: red[500]}} aria-label="recipe">R</Avatar>}
	   action={<IconButton aria-label="settings"> <MoreVertIcon/> </IconButton>}
	   title={item.title} subheader={`avalible from: ${item.available_date}`} onClick={() => navigate(PATH.itemRealty, {state: {id: item.id}})}/>
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
          <Typography sx={{marginBottom: 2}}>Description:</Typography>
          <Typography sx={{marginBottom: 2}}>{item.description}</Typography>
          {item.details && <>
            <hr/>
            <Typography sx={{marginBottom: 2}}>Details:</Typography>
            <Typography sx={{marginBottom: 2}}>pet_friendly: {item.details?.pet_friendly ? 'yes' : 'no'}</Typography>
            <Typography>total_floors:{item.details?.total_floors}</Typography>
            <Typography>internet:{item.details?.internet}</Typography>
          </>}
        </CardContent>
      </Collapse>

    </Card>
    {/*<Button onClick={handleClick}>Open Snackbar</Button>*/}
    <Snackbar open={sneckOpen} autoHideDuration={3000} onClose={handleClose}
              message={message} action={action}/>

    <BookingModal handleClose={() => setOpenBooking(!openBooking)} open={openBooking} bookingOpenHandles={bookingOpenHandles}/>

  </>
};

export default OneAd;
