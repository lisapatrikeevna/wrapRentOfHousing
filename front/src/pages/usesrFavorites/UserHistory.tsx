import { Container, Grid, Typography } from "@mui/material";
import { useGetUsersRealtyQuery } from "../../bll/realty/realty.service";
import OneAd from "../../components/realty/OneAd";



const UserFavorites = () => {
  const{data: realty, isLoading: isRealtyLoading, isError: isRealtyError} = useGetUsersRealtyQuery({params: '?type=favorite'});
  // @ts-ignore
  console.log('UserHistory/realty', realty);


  return (<Container style={{margin:'40px auto'}}>
    {isRealtyLoading && <Typography>Loading...</Typography>}
    {isRealtyError && <Typography>Error loading realty</Typography>}
    <Typography sx={{mt:2,mb:2}}>User  viseted</Typography>
    {realty?.data ? <Grid container rowSpacing={2} columnSpacing={{xs: 1, sm: 2, md: 3}} justifyContent="center">
      {realty.data.map(i => {return <Grid item xs={12} sm={6} md={4} lg={3} key={i.id}> <OneAd item={i}/> </Grid> })}
    </Grid>
      :<Typography>No realty</Typography>}
    </Container>);
};

export default UserFavorites;


// 20
// 38
// 39
// 47
// 48
// 65
// 66
// 70



