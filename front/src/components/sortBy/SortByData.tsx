import { Box, IconButton, Stack, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import cl from './SortBy.module.scss'


type PropsType = {
  filters: string
  sortHandler: (value: string) => void
}

const SortByData = ({filters,sortHandler}:PropsType) => {
  const registerDateSort = (value: boolean) => {
    let sort = ''
    if( !filters.includes('published_date') ) {
      sort = `${filters}&ordering=${value ? '-published_date' : 'published_date'}`
    } else {
      sort = filters.replace(/published_date=[^&]+/, `published_date=${value ? '-published_date' : 'published_date'}`);
    }
    sortHandler(sort)
  }


  return (<Box>
    <Typography variant="h6">by date</Typography>
    <Stack direction="row" spacing={1} className={cl.itemFilter}>
      <IconButton color="inherit" sx={{mr: 1}} onClick={() => registerDateSort(true)} className={cl.circleBtn}>
        <ArrowDownwardIcon fontSize="small"/>
      </IconButton>
      <IconButton color="inherit" sx={{mr: 1}} onClick={() => registerDateSort(false)} className={cl.circleBtn}>
        <ArrowUpwardIcon fontSize="small"/>
      </IconButton>
    </Stack>
  </Box>);
};

export default SortByData;
