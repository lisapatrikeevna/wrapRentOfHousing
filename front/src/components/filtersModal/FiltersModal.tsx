import { Box, Checkbox, IconButton, Modal, OutlinedInput, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid2';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuIcon from "@mui/icons-material/Menu";
import { useLazyGetFilterListQuery } from "../../bll/realty/realty.service";

const style = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
};

const FiltersModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  // const dispatch = useDispatch()
  // let categories = useSelector<RootStateType, Array<CategoryType>>(state => state.app.categories)
  const [fetchFilters, { data, isError, isLoading }] = useLazyGetFilterListQuery();
  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);
  // const [availableDates, setAvailableDates] = useState<Array<any>>([]);
  const [categories, setCategories] = useState<Array<string>>([]);
  const [classRealty, setClassRealty] = useState<Array<string>>([]);
  const [locations, setLocations] = useState<Array<string>>([]);
  const [numberOfRooms, setNumberOfRooms] = useState<Array<number>>([]);
  const [squareFootage, setSquareFootage] = useState<Array<number>>([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [available, setAvailable] = useState(true);
  // console.log("!!!!data", data?.class_realty);

  useEffect(() => {
    if (data) {
      let avDate = [...new Set(data.available_dates)];
      let cat = [...new Set(data.categories)];
      let clRealty = [...new Set(data.class_realty)];
      let loc = [...new Set(data.locations)];
      let numRum = [...new Set(data.number_of_rooms)];
      let squareFoot = [...new Set(data.square_footage)];
      console.log(cat, avDate, clRealty, loc, numRum, squareFoot);
      setCategories(cat)
      setAvailableDates(avDate)
      setClassRealty(clRealty)
      setLocations(loc)
      setNumberOfRooms(numRum)
      setSquareFootage(squareFoot)
    }
  }, [data]);

  const [age, setAge] = useState('');
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  // filterset_fields = ['category','location', 'number_of_rooms', 'available','available_date','class_realty','square_footage']



  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (isError) {
    return <p>Ошибка при загрузке данных.</p>;
  }

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
          <Grid direction={'column'} size={6} gap={2} >
            {/*<FormControl fullWidth>*/}
            {/*  {categories[0] && <Select labelId="demo-simple-select-filled-label" id="demo-simple-select-filled" value={categories[0].name} label="category" onChange={handleChange}>*/}
            {/*      {categories?.map((index,cat:string) => <MenuItem key={i.id} value={i.id}>{i.name}</MenuItem>)}*/}
            {/*  </Select>}*/}

            <Select label={'available date'} value={availableDates[0]} onChange={handleChange} sx={{ mt: 1, width: '100%' }} input={<OutlinedInput label="Name" /> }>
              {availableDates.map((item,index) => <MenuItem key={index} value={index} >{item}</MenuItem> )}
            </Select>
            <Select label={'class realty'} value={classRealty[0]} onChange={handleChange} sx={{ mt: 1, width: '100%' }}>
              {classRealty.map((classR:string , index) => <MenuItem key={index} value={classR} >{classR}</MenuItem>)}
            </Select>
            <Select label={'numberOfRooms'} value={numberOfRooms[0]?.toString()} onChange={handleChange} sx={{ mt: 1, width: '100%' }}>
              {numberOfRooms.map((i)=> <MenuItem key={i} value={i}>{i}</MenuItem> )}
            </Select>
            <Select label={'locations'} value={locations[0]} onChange={handleChange} sx={{ mt: 1, width: '100%' }}>
              {locations.map((l:string,i)=><MenuItem key={i} value={l}>{l}</MenuItem>) }
            </Select>
            <Select label={'square_footage'} value={squareFootage[0]?.toString()} onChange={handleChange} sx={{ mt: 1, width: '100%' }}>
              {squareFootage.map((i)=><MenuItem key={i} value={i}>{i}</MenuItem>)}
            </Select>

            {/*  <InputLabel id="demo-simple-select-label">Age</InputLabel>*/}
            {/*  <Select labelId="demo-simple-select-filled-label" value={age} label="Age" onChange={handleChange}*/}
	{/* // id="demo-simple-select"*/}
            {/*  >*/}
	{/* <MenuItem value={10}>Ten</MenuItem>*/}
	{/* <MenuItem value={20}>Twenty</MenuItem>*/}
	{/* <MenuItem value={30}>Thirty</MenuItem>*/}
            {/*  </Select>*/}


            {/*</FormControl>*/}
          </Grid>
          <Grid size={6}>
            {/*<FormControlLabel*/}
            {/*  control={*/}
                <Checkbox checked={available} onChange={()=>setAvailable(!available)} name="available" />
              {/*}*/}
              {/*label="Gilad Gray"*/}
            {/*/>*/}
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
