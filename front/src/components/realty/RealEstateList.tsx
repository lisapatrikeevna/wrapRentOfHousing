import { Box, Grid, Pagination, Typography } from "@mui/material";
import { RealtyType } from "../../bll/realty/realty.service";
import OneAd from "./OneAd";
import cl from './RealEstate.module.scss'

type PropsType={
  realty:Array<RealtyType>
}
const RealEstateList = ({realty}:PropsType) => {
  // const {data: realty, isLoading, isError} = useGetRealtyQuery({params:'?page=2'})
  // console.log('realty', realty);
  //
  // if( isLoading ) {
  //   return <CircularProgress/>;
  // }
  //
  // if( isError ) {
  //   return <Typography color="error">Error loading realty data</Typography>;
  // }


  return (
    <Box className={cl.container}>
      <Typography variant="h5" align="center" sx={{mb:4}}>Real Estate Items</Typography>
      <Grid container rowSpacing={1} gap={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">
        {realty?.map(item => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <OneAd item={item} />
          </Grid>
        ))}
      </Grid>
      <Pagination count={10} />
    </Box>
  );
};

export default RealEstateList;
