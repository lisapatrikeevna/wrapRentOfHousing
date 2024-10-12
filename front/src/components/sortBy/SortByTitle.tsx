import { Box, IconButton, Stack, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import cl from './SortBy.module.scss'


type PropsType = {
  filters: string
  sortHandler: (value: string) => void
}

const SortByTitle = ({filters,sortHandler}:PropsType) => {
  const titleSort = (value: boolean) => {
    let sort = ''
    if( !filters.includes('title') ) {
      sort = `${filters}&ordering=${value ? '-title' : 'title'}`
    } else {
      sort = filters.replace(/title=[^&]+/, `title=${value ? '-title' : 'title'}`);
    }
    sortHandler(sort)
  }


  return (<Box>
    <Typography variant="h6">title</Typography>
    <Stack direction="row" spacing={1} className={cl.itemFilter}>
      <IconButton color="inherit" sx={{mr: 1}} onClick={() => titleSort(true)} className={cl.circleBtn}>
        <ArrowDownwardIcon fontSize="small"/>
      </IconButton>
      <IconButton color="inherit" sx={{mr: 1}} onClick={() => titleSort(false)} className={cl.circleBtn}>
        <ArrowUpwardIcon fontSize="small"/>
      </IconButton>
    </Stack>
  </Box>);
};

export default SortByTitle;
