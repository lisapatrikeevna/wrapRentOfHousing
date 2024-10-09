import { Box, Grid, Pagination, Typography } from "@mui/material";
import { RealtyRequestType } from "../../bll/realty/realty.service";
import OneAd from "./OneAd";
import cl from './RealEstate.module.scss'
import { ChangeEvent, useEffect, useState } from "react";

type PropsType = {
  realty: RealtyRequestType
  pageHandler: (current_page: number) => void
}
const RealEstateList = ({realty, ...props}: PropsType) => {
  const [page, setPage] = useState(realty.current_page);

  // мы обозначили event как _event, чтобы явно указать, что этот параметр не используется в функции.
  const handleChange = (_event: ChangeEvent<unknown>, value:number) => {
    console.log('value', value);
    setPage(value);
    props.pageHandler(value)

  };
useEffect(()=> console.log('page', page),[page])

  return (<Box className={cl.container}>
      <Typography variant="h5" align="center" sx={{mb: 4}}>Real Estate Items</Typography>
      <Grid container rowSpacing={1} gap={2} columnSpacing={{xs: 1, sm: 2, md: 3}} justifyContent="center">
        {realty.data.map(item => (<Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <OneAd item={item}/>
          </Grid>))}
      </Grid>
      <Pagination count={realty.total_pages} page={+page} onChange={handleChange}/>
    </Box>);
};

export default RealEstateList;
