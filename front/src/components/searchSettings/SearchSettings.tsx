import { Button, CircularProgress, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import cl from './SearchSettings.module.scss'
import { useState } from "react";
import { useGetCategoryQuery } from "../../bll/category/category.service";

const SearchSettings = () => {
  const {data: categories, isLoading, isError} = useGetCategoryQuery()
  const [category, setCategory] = useState('');
  const [city, setCity] = useState('');
  const searchHandler=()=>{

  }
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  console.log("categories", categories);

  if( isLoading ) return <CircularProgress/>
  if( isError ) return <Typography color="error">Error loading category</Typography>;

  return (<Paper className={cl.searchSettings}>
    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={category} label="category" onChange={handleChange}>
      {categories?.map(i => <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>)}
      {/*<MenuItem value={10}>Ten</MenuItem>*/}
      {/*<MenuItem value={20}>Twenty</MenuItem>*/}
      {/*<MenuItem value={30}>Thirty</MenuItem>*/}
    </Select>
    <TextField id="outlined-basic" label="city" variant="outlined" value={city} onChange={e => setCity(e.target.value)}/>
  <Button onClick={searchHandler}>search</Button>
  </Paper>);
};

export default SearchSettings;
