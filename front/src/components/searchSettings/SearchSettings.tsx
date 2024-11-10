import { Button, MenuItem, Paper, Select, SelectChangeEvent, TextField } from "@mui/material";
import cl from './SearchSettings.module.scss'
import { useEffect, useState } from "react";
import { CategoryType } from "../../bll/category/category.service";

export type SearchParamsType={
  category?:number
  location?:string
  number_of_rooms?: string
  available?: boolean
  available_date?: string
  class_realty?: string
  square_footage?: string
}
type PropsType = {
  searchHandler: (searchParams: SearchParamsType) => void
  categories: Array<CategoryType>
  city:string|null
  selectedCat:string|null
}
const SearchSettings = ({categories, ...props}: PropsType) => {

  const [category, setCategory] = useState<number|string>( );
  const [city, setCity] = useState('');
  useEffect(()=> {
    props.city && setCity(props.city)
      props.selectedCat? setCategory(props.selectedCat):categories[1].id
    },[props.city])
  const searchHandler = () => {
    console.log("category, location: ", category, city)

    // const idCategory = categories!.find(e => e.name === category);
    let res={}
    if(category){
      res={...res,category:category};
    }
    if(city){
      res={...res,location:city}
    }
    props.searchHandler(res);
    // props.searchHandler(`&category=${category}&city=${city}`);
  }
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(+event.target.value);
  }
  // console.log("categories", categories);


  return (<Paper className={cl.searchSettings}>
    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={category} label="category" onChange={handleChange} sx={{width: 150, mr:2}}>
      {/*<MenuItem value={'all'}>All</MenuItem>*/}
      {categories?.map(i => <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>)}
    </Select>
    <TextField id="outlined-basic" label="city" variant="outlined" value={city} onChange={e => setCity(e.target.value)} sx={{width: 150, mr:2}}/>
    <Button variant={'outlined'} onClick={searchHandler}>search</Button>
  </Paper>);
};

export default SearchSettings;
