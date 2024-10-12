import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import { RealtyRequestType } from "../../bll/realty/realty.service";
import OneAd from "./OneAd";
import cl from './RealEstate.module.scss'
import { ChangeEvent, useState } from "react";
import SortByData from "../sortBy/SortByData";
import SortByTitle from "../sortBy/SortByTitle";

type PropsType = {
  realty: RealtyRequestType
  pageHandler: (current_page: number) => void
  filters: string
  sortHandler: (value: string) => void
}


const RealEstateList = ({realty, filters, ...props}: PropsType) => {
  const [page, setPage] = useState(realty.current_page);
  // мы обозначили event как _event, чтобы явно указать, что этот параметр не используется в функции.
  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
    props.pageHandler(value)
  };


  return (<Box className={cl.container}>
    <Typography variant="h3" align="center" sx={{mb: 4}}>Real Estate Items</Typography>
    <Box className={cl.wrapp}>
      <Stack spacing={2} className={cl.filtersBox}>
        <Typography variant="h6">sort by</Typography>

        <Stack direction="row" spacing={1}>rsc
          <SortByData filters={filters} sortHandler={props.sortHandler} />
          <SortByTitle filters={filters} sortHandler={props.sortHandler} />
        </Stack>

      </Stack>
    </Box>
    <Grid container rowSpacing={1} gap={2} columnSpacing={{xs: 1, sm: 2, md: 3}} justifyContent="center">
      {realty.data.map(item => (<Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
        <OneAd item={item}/>
      </Grid>))}
    </Grid>
    <Pagination count={realty.total_pages} page={+page} onChange={handleChange}/>
  </Box>);
};

export default RealEstateList;
