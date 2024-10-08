import cl from './ItemProduct.module.scss'
import { useGetItemRealtyQuery } from "../../bll/realty/realty.service";
import { Container, Rating, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";


const ItemProduct = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const {id} = location.state;
  console.log('!!!!!id', id);
  const {data: realty, isLoading: isRealtyLoading, isError: isRealtyError} = useGetItemRealtyQuery({id})
  console.log('!!!!!realty', realty);
  const [avatarImg, setAvatarImg] = useState<string | null>();

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for( i = 0; i < string.length; i += 1 ) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for( i = 0; i < 3; i += 1 ) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      }, children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  return (<div className={cl.root}>
    <span onClick={() => navigate(-1)}>&#10229; <> go back </></span>
    {(!isRealtyLoading && !isRealtyError && realty) && <Container>
      <img src="https://pictures.immobilienscout24.de/dims3/S3/quality/80/resize/1170x600%3E/http://s3-eu-west-1.amazonaws.com/pda-pro-pictures-projectpictures-8hecgpgpb9fo/57866104/40762392-c4b7-48d8-b8a8-735b84b4512d.jpg" alt=""/>

      <p> author id : {realty.author}</p>
      {/*{avatarImg ? <Avatar alt="Remy Sharp" src={avatarImg}/>*/}
      {/*  : <Avatar {...stringAvatar({realty.author}) } /> }*/}

      < p> available : {realty.available}</p>
      <p> id :{realty.id}</p>
      <Stack spacing={2}>
        <Typography variant="h2" sx={{color: 'text.secondary'}}>
          title: {realty.title}
        </Typography>
        <Typography>
          location :{realty.location}
        </Typography>
        <p>number_of_rooms:{realty.number_of_rooms}</p>

        <Typography variant="body2" sx={{color: 'text.secondary'}}>
          description :{realty.description}
        </Typography>
        <Typography>
          price: {realty.price}
        </Typography>
        {/*<p>rating: {realty.rating}</p>*/}
        <Rating name="read-only" value={realty.rating} readOnly/>
      </Stack>
      <p> available_date : {realty.available_date}</p>
      <p>category :{realty.category}</p>
      <p>real_estate_image : {realty.real_estate_image}</p>
      <p>register_date:{realty.register_date}</p>
      <p></p>

    </Container>}
  </div>);
};

export default ItemProduct;
