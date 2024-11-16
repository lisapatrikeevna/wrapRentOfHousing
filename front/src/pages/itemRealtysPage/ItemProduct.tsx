import cl from './ItemProduct.module.scss'
import { useGetItemRealtyQuery, usePatchRealtyMutation, useRemoveRealtyMutation, useUpdateRealtyMutation } from "../../bll/realty/realty.service";
import { Box, Button, CircularProgress, Container, Rating, Stack, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import defaultImg from '@/assets/defaultitemprodkt.jpg'
import { useSelector } from "react-redux";
import { RootStateType } from "../../bll/store";
import { useState } from "react";
import NewRealtyForm from "../../components/newRealtyForm/NewRealtyForm";
import { CreateRealtyDetailType, CreateRealtyType } from "../../bll/realty/realty.type";
import RealtyDetailForm from "../../components/newRealtyForm/RealtyDetailForm";
import { UserType } from "../../bll/auth/auth.type";



// views_properties
const ItemProduct = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const {id} = location.state;
  const userId = useSelector<RootStateType, number | undefined>(state => state.app.user?.id);
  const [isEdit, setIsEdit] = useState(false)
  const {data: realty, isLoading: isRealtyLoading, isError: isRealtyError} = useGetItemRealtyQuery({id})
  const [ removeRealty ] = useRemoveRealtyMutation();
  console.log('!!!!!realty', realty);
  // console.log("userId==id", userId == realty.author);
  // console.log('!!!!!id', id);
  const [newRealtyData, setNewRealtyData] = useState<CreateRealtyType|null>(null);
  const [realtyDetailData, setRealtyDetailData] = useState<CreateRealtyDetailType|null>(null);
  const [updateRealty,{isError:updateIsError, isLoading:updateIsLoading}]=useUpdateRealtyMutation()
  const removeHandler=()=>{
    removeRealty(id).unwrap()
    .then((res) => {
      console.log('Realty removed:', res)
      navigate(-1)
    })
    .catch((err) => {console.error('Error removing realty:', err);});
  }

//@ts-ignore
  const handleRealtyData = (data) => {
    setNewRealtyData(data);
  };
//@ts-ignore
  const handleRealtyDetailData = (data) => {
    setRealtyDetailData(data);
  };
  console.log("newRealtyData: ", newRealtyData);
  console.log("realtyDetailData", realtyDetailData);
  const updateCurentRealty=()=>{
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


    const data = new FormData();

    // Добавляем данные из newRealtyData
    //@ts-ignore
    Object.keys(newRealtyData).forEach(key => {
      //@ts-ignore
      data.append(key, newRealtyData[key]);
    });

    // Добавляем данные из realtyDetailData, если они есть
    if (realtyDetailData) {
      data.append("details", JSON.stringify(realtyDetailData))
    }

    // Добавляем автора
    data.append('author', id);

    console.log("data: ", data);
    debugger
    //@ts-ignore
    updateRealty(data)
    .unwrap()
    .then((res) => console.log("res !!!!!!!!!!!!", res))
    .catch((err) => console.log(err));
  }
  //@ts-ignore
  const [propertiesUpdate, { isLoading}] = usePatchRealtyMutation()
  const user = useSelector<RootStateType, UserType | null>(state => state.app.user)
  //@ts-ignore
  const isVisitet = user?.reserv_properties?.some((id:number) => id === item.id);
  //@ts-ignore
  const visitStyles = {
    color: isVisitet? "#f44336":""
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
    {userId == realty?.author && <Button onClick={()=>setIsEdit(!isEdit)}>edit</Button>}
    {userId == realty?.author && <Button onClick={removeHandler}>delete add</Button>}
    {isRealtyError && <Typography>{isRealtyError.toString()}</Typography>}
    {(isRealtyLoading || updateIsLoading) && <CircularProgress color="success"/>}
    {(realty && !isEdit) && <Container>
      <Box className={cl.imgWrap}>
        {realty.real_estate_image ? <img src={realty.real_estate_image} alt="img"/> : <img src={defaultImg} alt="defaultImg"/>}
      </Box>

      <p> author id : {realty.author}</p>
      {/*{avatarImg ? <Avatar alt="Remy Sharp" src={avatarImg}/>*/}
      {/*  : <Avatar {...stringAvatar({realty.author}) } /> }*/}

      <p> available : {realty.available.toString()}</p>
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
        <Rating name="read-only" value={realty.rating} readOnly/>
      </Stack>
      <p> available_date : {realty.available_date}</p>
      <p>category :{realty.category}</p>
      <p>real_estate_image : {realty.real_estate_image}</p>
      <p>register_date:{realty.register_date}</p>
      {realty.details && <p>!!!!!!!!!!!!!!!!!!!!!!!detail</p>}

    </Container>}
    {(realty && isEdit)&&<Container>
      {updateIsError && <Typography>{updateIsError.toString()}</Typography>}
      {updateIsLoading && <CircularProgress color="success"/>}
      <NewRealtyForm realty={realty} onFormDataChange={handleRealtyData}/>
      <RealtyDetailForm detail={realty.details} onFormDataChange={handleRealtyDetailData} />
      {/*<Button onClick={updateCurentRealty} disabled={!newRealtyData}>update object</Button>*/}
      <Button onClick={updateCurentRealty} >update object</Button>
      <Button onClick={()=>setIsEdit(!isEdit)}>go back</Button>
    </Container>}
  </Box>);
};

export default ItemProduct;
