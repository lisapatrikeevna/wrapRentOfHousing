import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useDispatch, useSelector } from "react-redux";
import { RootStateType } from "../../bll/store";
import { CategoryType } from "../../bll/category/category.service";
import MenuIcon from "@mui/icons-material/Menu";

const style = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
};


const FiltersModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }
  const dispatch = useDispatch()
  // useEffect(() => dispatch(getCategoriesTC),[])
  let categories = useSelector<RootStateType, Array<CategoryType>>(state => state.app.categories)
  const [age, setAge] = useState('');
  console.log("!!!!categories", categories);
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };


  return (<>
    <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr: 2}} onClick={handleOpen}>
      <MenuIcon/>
    </IconButton>
    <Modal keepMounted open={isOpen} onClose={handleOpen} aria-labelledby="keep-mounted-modal-title"
           aria-describedby="keep-mounted-modal-description">
      <Box sx={style}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          select filters
        </Typography>

        <Grid container spacing={2}>
          <Grid size={6} gap={2} >
            <FormControl fullWidth>
              {categories[0] && <Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled" value={categories[0].name} label="category" onChange={handleChange}>
                  {categories?.map(i => <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>)}
              </Select>}


              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select labelId="demo-simple-select-filled-label" value={age} label="Age" onChange={handleChange}
	 // id="demo-simple-select"
              >
	 <MenuItem value={10}>Ten</MenuItem>
	 <MenuItem value={20}>Twenty</MenuItem>
	 <MenuItem value={30}>Thirty</MenuItem>
              </Select>


            </FormControl>
          </Grid>
          <Grid size={6}>
            fgh
          </Grid>
        </Grid>

        <Typography id="keep-mounted-modal-description" sx={{mt: 2}}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>


      </Box>
    </Modal>
  </>);
};

export default FiltersModal;
