import { Button, MenuItem, Paper, Select, SelectChangeEvent, TextField } from "@mui/material";
import cl from './SearchSettings.module.scss'
import { useEffect, useState } from "react";
import { CategoryType } from "../../bll/category/category.service";
import { useDispatch } from "react-redux";
import { appAC } from "../../bll/app.slice";

export type SearchParamsType={
  category?:number
  location?:string|number
  number_of_rooms?: string
  available?: boolean
  available_date?: string
  class_realty?: string
  square_footage?: string
  search?:string
}
type PropsType = {
  searchHandler: (searchParams: {location: number | string; category: number}) => void
  categories: Array<CategoryType>
  city:string|null
  selectedCat:CategoryType|null
}
let all={id:0,name:'All'}



const SearchSettings = ({categories, ...props}: PropsType) => {
  const dicpatch=useDispatch()
  const [category, setCategory] = useState( all.id);
  const [city, setCity] = useState<string>('');
  useEffect(()=> {
    props.city && setCity(props.city)
      props.selectedCat? setCategory(props.selectedCat.id):categories[1]
    },[props.city, props.selectedCat])
  const searchHandler = () => {
    let res={location:city =='' ? 0:city, category: category}
    props.searchHandler(res);

    dicpatch(appAC.setAdditionalFilters(res))
  }
  const handleChange = (e: SelectChangeEvent) => {
    setCategory(+e.target.value);
  }





  return (<Paper className={cl.searchSettings}>
    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={category.toString()} label="category" onChange={handleChange} sx={{width: 150, mr:2}}>
      <MenuItem value={all.id}>{all.name}</MenuItem>
      {categories?.map(i => <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>)}
    </Select>
    <TextField id="outlined-basic" label="city" variant="outlined" value={city} onChange={e => setCity(e.target.value)} sx={{width: 150, mr:2}}/>
    <Button variant={'outlined'} onClick={searchHandler}>search</Button>
  </Paper>);
};

export default SearchSettings;
