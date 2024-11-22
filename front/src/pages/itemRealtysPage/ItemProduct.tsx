import cl from './ItemProduct.module.scss'
import { useGetItemRealtyQuery, usePatchRealtyMutation, useRemoveRealtyMutation, useUpdateRealtyMutation } from "../../bll/realty/realty.service";
import { Box, Button, CircularProgress, Container, Rating, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import defaultImg from '@/assets/defaultitemprodkt.jpg'
import { useSelector } from "react-redux";
import { RootStateType } from "../../bll/store";
import { useEffect, useState } from "react";
import NewRealtyForm from "../../components/newRealtyForm/NewRealtyForm";
import { CreateRealtyDetailType, CreateRealtyType } from "../../bll/realty/realty.type";
import RealtyDetailForm from "../../components/newRealtyForm/RealtyDetailForm";
// import { UserType } from "../../bll/auth/auth.type";


// views_properties
const ItemProduct = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const {id} = location.state;
  const userId = useSelector<RootStateType, number | undefined>(state => state.app.user?.id);
  const [isEdit, setIsEdit] = useState(false)
  const {data: realty, isLoading: isRealtyLoading, isError: isRealtyError} = useGetItemRealtyQuery({id})
  const [removeRealty] = useRemoveRealtyMutation();
  const [newRealtyData, setNewRealtyData] = useState<CreateRealtyType | null>(null);
  const [realtyDetailData, setRealtyDetailData] = useState<CreateRealtyDetailType | null>(null);
  const [updateRealty, {error: updateIsError, isLoading: updateIsLoading}] = useUpdateRealtyMutation()
  const [propertiesUpdate, {error}] = usePatchRealtyMutation()
  const [rating, setRating] = useState( 0);
  useEffect(() => {
    // for putch if viseted!
    userId && propertiesUpdate({id: id, body: {'views': userId}})
    console.log(error)
  }, [])
  useEffect(() => {
    setRating(realty?.rating );
  }, [realty]);
  const removeHandler = () => {
    removeRealty(id).unwrap()
    .then((res) => {
      console.log('Realty removed:', res)
      navigate(-1)
    })
    .catch((err) => {console.error('Error removing realty:', err);});
  }
  console.log('!!!!!realty', realty);
//@ts-ignore
  const handleRealtyData = (data) => {
    setNewRealtyData(data);
  };
//@ts-ignore
  const handleRealtyDetailData = (data) => {
    setRealtyDetailData(data);
  };
  // console.log("newRealtyData: ", newRealtyData);
  // console.log("realtyDetailData", realtyDetailData);
  const updateCurrentRealty = () => {
    const data = new FormData();
    //
    // // Добавляем данные из newRealtyData
    // //@ts-ignore
    // Object.keys(newRealtyData).forEach(key => {
    //   //@ts-ignore
    //   data.append(key, newRealtyData[key]);
    // });
    //
    // // Добавляем данные из realtyDetailData, если они есть
    // if( realtyDetailData ) {
    //   data.append("details", JSON.stringify(realtyDetailData))
    // }
    //
    // // Добавляем автора
    // data.append('author', id);
    newRealtyData && Object.keys(newRealtyData).forEach(key => {
      // @ts-ignore
      data.append(key, newRealtyData[key]);
    });

    if( realtyDetailData ) {
      //@ts-ignore
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
    console.log("author, id: ", userId, id);
    data.append('id', id);
    userId && data.append('author', userId);

    console.log("Final data to send:", ...data); // Логируем данные для проверки

    updateRealty({id: id, body: data,}).unwrap()
    .then((res) => console.log("res !!!!!!!!!!!!", res))
    .catch((err) => console.log(err));
  }
  const ratingHandler = (e) => {
    setRating(e.currentTarget.value)
    propertiesUpdate({id: id, body: {'rating': +e.currentTarget.value}}).unwrap()
    .then(res => {
      console.log(res)
      // setRating(e.currentTarget.value)
    })
  .catch(err => console.log(err))
  }

  // const [avatarImg, setAvatarImg] = useState<string | null>();

  // function stringToColor(string: string) {
  //   let hash = 0;
  //   let i;
  //
  //   /* eslint-disable no-bitwise */
  //   for( i = 0; i < string.length; i += 1 ) {
  //     hash = string.charCodeAt(i) + ((hash << 5) - hash);
  //   }
  //
  //   let color = '#';
  //
  //   for( i = 0; i < 3; i += 1 ) {
  //     const value = (hash >> (i * 8)) & 0xff;
  //     color += `00${value.toString(16)}`.slice(-2);
  //   }
  //   /* eslint-enable no-bitwise */
  //
  //   return color;
  // }

  // function stringAvatar(name: string) {
  //   return {
  //     sx: {
  //       bgcolor: stringToColor(name),
  //     }, children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  //   };
  // }


  return (<Box className={cl.root}>
    <Button onClick={() => navigate(-1)}>&#10229;  go back </Button>
    {userId == realty?.author && <Button onClick={() => setIsEdit(!isEdit)}>edit</Button>}
    {userId == realty?.author && <Button onClick={removeHandler}>delete add</Button>}
    {isRealtyError && <Typography>{isRealtyError.toString()}</Typography>}
    {(isRealtyLoading || updateIsLoading) && <CircularProgress color="success"/>}
    {(realty && !isEdit) && <Container>
      <Box className={cl.imgWrap}>
        {realty.real_estate_image ? <img src={`http://127.0.0.1:12345/${realty.real_estate_image}`} alt="img"/> : <img src={defaultImg} alt="defaultImg"/>}
      </Box>

      <Typography> author id : {realty.author}</Typography>
      {/*{avatarImg ? <Avatar alt="Remy Sharp" src={avatarImg}/>*/}
      {/*  : <Avatar {...stringAvatar({realty.author}) } /> }*/}

      <Typography> available : {realty.available.toString()}</Typography>
      <Typography> id :{realty.id}</Typography>
      <Stack spacing={2}>
        <Typography variant="h2" sx={{color: 'text.secondary'}}>title: {realty.title}</Typography>
        <Typography>location :{realty.location}</Typography>
        <Typography>number_of_rooms:{realty.number_of_rooms}</Typography>
        <Typography variant="body2" sx={{color: 'text.secondary'}}>description :{realty.description}</Typography>
        <Typography>price: {realty.price}</Typography>
        {realty?.reservations.includes(userId) ? <> <Rating name="read-only" value={rating} onChange={ratingHandler}/>
          <Typography>change rating</Typography> </> : <Rating name="read-only" value={rating} readOnly/>}
      </Stack>
      <Typography> available_date : {realty.available_date}</Typography>
      <Typography>category :{realty.category}</Typography>
      <Typography>real_estate_image : {realty.real_estate_image}</Typography>
      <Typography>register_date:{realty.register_date}</Typography>
      {realty.details && <Box>
        <Typography variant={'subtitle2'}>Details:</Typography>
        <Typography>internet : {realty.details.internet}</Typography>
        <Typography>garage_or_parking : {realty.details.garage_or_parking}</Typography>
        <Typography>balcony : {realty.details.balcony}</Typography>
        <Typography>heating_type : {realty.details.heating_type}</Typography>
        <Typography>air_conditioning : {realty.details.air_conditioning.toString()}</Typography>
        <Typography>floor_number : {realty.details.floor_number}</Typography>
        <Typography>total_floors : {realty.details.total_floors}</Typography>
        <Typography>pet_friendly : {realty.details.pet_friendly.toString()}</Typography>
        <Typography>furnished : {realty.details.furnished.toString()}</Typography>
        <Typography>description : {realty.details.description}</Typography>
        {/*<Typography>heating : {realty.details.heating}</Typography>*/}
      </Box>}

    </Container>}
    {(realty && isEdit) && <Container>
      {updateIsError && <Typography>{updateIsError.toString()}</Typography>}
      {updateIsLoading && <CircularProgress color="success"/>}
      <NewRealtyForm realty={realty} onFormDataChange={handleRealtyData}/>
      <RealtyDetailForm detail={realty.details} onFormDataChange={handleRealtyDetailData}/>
      {/*<Button onClick={updateCurentRealty} disabled={!newRealtyData}>update object</Button>*/}
      <Button onClick={updateCurrentRealty}>update object</Button>
      <Button onClick={() => setIsEdit(!isEdit)}>go back</Button>
    </Container>}
  </Box>);
};

export default ItemProduct;


// {
//   "id": 89,
//   "realtyFiles": [],
//   "details": {
//   "id": 11,
//     "internet": "Telecom, 0mb/10s",
//     "garage_or_parking": "Garage/Stellplatz: 30 €",
//     "balcony": null,
//     "heating_type": null,
//     "air_conditioning": false,
//     "floor_number": 90,
//     "total_floors": 2,
//     "pet_friendly": true,
//     "furnished": true,
//     "description": null,
//     "created_at": "2024-11-18T13:56:29.264514Z",
//     "updated_at": "2024-11-18T13:56:29.264533Z"
// },
//   "title": "string price",
//   "description": "en, die Sie für ein komfortables und sorgenfreies Leben benötigen.",
//   "location": "Schießhausweg 7, 74564 Crailsheim, Schwäbisch Hall",
//   "price": 810.0,
//   "number_of_rooms": 3,
//   "available": true,
//   "rating": null,
//   "register_date": "2024-11-18",
//   "available_date": "2024-11-16",
//   "real_estate_image": "http://127.0.0.1:12345/media/real_estate_images/518836f7-2997-4e99-9b77-a819a7fccf47-1857281388_IDKpoNP.webp",
//   "class_realty": "economy",
//   "square_footage": 23.0,
//   "is_deleted": false,
//   "category": 4,
//   "author": 6,
//   "favorite": [],
//   "views": [
//   6
// ],
//   "reservations": []
// },


// Final data to send:
// (2) ['title', 'test update']
// (2) ['description', 'en, die Sie für ein komfortables und sorgenfreies Leben benötigen.']
// (2) ['location', 'Schießhausweg 7, 74564 Crailsheim, Schwäbisch Hall']
// (2) ['price', '810']
// (2) ['number_of_rooms', '3']
// (2) ['category', '2']
// (2) ['available', 'true']
// (2) ['available_date', '2024-11-16']
// (2) ['real_estate_image', File]
// (2) ['class_realty', 'economy']
// (2) ['square_footage', '23']
// (2) ['details.internet', 'Telecom, 0mb/10s']
// (2) ['details.garage_or_parking', 'Garage/Stellplatz: 30 €']
// (2) ['details.balcony', 'cool balcony, you can live']
// (2) ['details.heating_type', 'central heating']
// (2) ['details.air_conditioning', 'false']
// (2) ['details.floor_number', '90']
// (2) ['details.total_floors', '2']
// (2) ['details.pet_friendly', 'true'] 0: "details.pet_friendly" 1: "true"length:  2[[Prototype]]: Array(0)
// (2) ['details.furnished', 'true']
// (2) ['details.realtyFiles', File]
// (2) ['details.realtyFiles', File]
// (2) ['id', '89']
// (2) ['author', '6']



