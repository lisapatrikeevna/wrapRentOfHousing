import { Button, MenuItem, Paper, Select, SelectChangeEvent, TextField } from "@mui/material";
import cl from './SearchSettings.module.scss'
import { useState } from "react";
import { CategoryType } from "../../bll/category/category.service";

export type SearchParamsType={
  category?:number,
  city?:string
}
type PropsType = {
  searchHandler: (searchParams: SearchParamsType) => void
  categories: Array<CategoryType>
}
const SearchSettings = ({categories, ...props}: PropsType) => {

  const [category, setCategory] = useState<number>(categories[1].id );
  // console.log(category);
  const [city, setCity] = useState('');
  const searchHandler = () => {
    console.log(category);
    // const idCategory = categories!.find(e => e.name === category);
    let res={}
    if(category){
      res={category:category};
    }
    if(city){
      res={...res,city:city}
    }
    props.searchHandler(res);
    // props.searchHandler(`&category=${category}&city=${city}`);
  }
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(+event.target.value);
  };
  // console.log("categories", categories);


  return (<Paper className={cl.searchSettings}>
    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={category.toString()} label="category" onChange={handleChange}>
      {categories?.map(i => <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>)}
    </Select>
    <TextField id="outlined-basic" label="city" variant="outlined" value={city} onChange={e => setCity(e.target.value)}/>
    <Button onClick={searchHandler}>search</Button>
  </Paper>);
};

export default SearchSettings;
