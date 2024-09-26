import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useGetRealtyQuery } from "../../bll/realty/realty.service";
import OneAd from "./OneAd";
import cl from './RealEstate.module.scss'

const RealEstateList = () => {
  const {data: realty, isLoading, isError} = useGetRealtyQuery()
  console.log('realty', realty);

  if( isLoading ) {
    return <CircularProgress/>;
  }

  if( isError ) {
    return <Typography color="error">Error loading realty data</Typography>;
  }

  return <Box className={cl.container}>
    <Typography variant="h5">Real Estate Items</Typography>
    <Grid container rowSpacing={1} gap={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {realty?.map(item => <OneAd item={item} key={item.id} />)}
    </Grid>
  </Box>
};

export default RealEstateList;
