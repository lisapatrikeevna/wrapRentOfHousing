import { Box, Button, Checkbox, IconButton, Modal, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Grid from '@mui/material/Grid2';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import MenuIcon from "@mui/icons-material/Menu";
import { useLazyGetFilterListQuery } from "../../bll/realty/realty.service";
import { useDispatch } from "react-redux";
import { appAC } from "../../bll/app.slice";
import { SearchParamsType } from "../searchSettings/SearchSettings";

const style = {
  position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4,
};


const FiltersModal = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(!isOpen);

  const [fetchFilters, { data, isError, isLoading }] = useLazyGetFilterListQuery();
  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedNumberOfRooms, setSelectedNumberOfRooms] = useState('');
  const [selectedClassRealty, setSelectedClassRealty] = useState('');
  const [selectedSquareFootage, setSelectedSquareFootage] = useState('');
  const [selectedAvailableDate, setSelectedAvailableDate] = useState('');
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (data) {
      console.log('data', data);
      // Установите состояния как пустые строки по умолчанию
      setSelectedCategory('');
      setSelectedAvailableDate('');
      setSelectedClassRealty('');
      setSelectedLocation('');
      setSelectedNumberOfRooms('');
      setSelectedSquareFootage('');
    }
  }, [data]);

  const handleSend = () => {
    let filters:SearchParamsType = {}

    if (selectedCategory) {
      filters.category = selectedCategory;
    }
    if (selectedLocation) {
      filters.location = selectedLocation;
    }
    if (selectedNumberOfRooms) {
      filters.number_of_rooms = selectedNumberOfRooms;
    }
    filters.available = available;
    if (selectedAvailableDate) {
      filters.available_date = selectedAvailableDate;
    }
    if (selectedClassRealty) {
      filters.class_realty = selectedClassRealty;
    }
    if (selectedSquareFootage) {
      filters.square_footage = selectedSquareFootage;
    }


    dispatch(appAC.setAdditionalFilters(filters));
    handleOpen();
  };

  if (isLoading) {
    return <p>Загрузка...</p>;
  }

  if (isError) {
    return <p>Ошибка при загрузке данных.</p>;
  }

  return (
    <>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleOpen}>
        <MenuIcon />
      </IconButton>
      <Modal keepMounted open={isOpen} onClose={handleOpen} aria-labelledby="keep-mounted-modal-title"
             aria-describedby="keep-mounted-modal-description">
        <Box sx={style}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Select Filters
          </Typography>
          {data &&
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <label> Available Date</label>
                <Select
                  label="Available Date"
                  value={selectedAvailableDate}
                  onChange={(e) => setSelectedAvailableDate(e.target.value)}
                  sx={{mt: 1, width: '100%'}}
                >
                  <MenuItem value="" disabled>
                    Выберите дату доступности
                  </MenuItem>
                  {data.available_dates.map((item, index) => (<MenuItem key={index} value={item}>{item}</MenuItem>))}
                </Select>
                <label>Class Realty</label>
                <Select
                  label="Class Realty"
                  value={selectedClassRealty}
                  onChange={(e) => setSelectedClassRealty(e.target.value)}
                  sx={{mt: 1, width: '100%'}}
                >
                  <MenuItem value="" disabled>
                    Выберите класс недвижимости
                  </MenuItem>
                  {data.class_realty.map((classR, index) => (<MenuItem key={index} value={classR}>{classR}</MenuItem>))}
                </Select>
                <label>Number of Rooms</label>
                <Select
                  label="Number of Rooms"
                  value={selectedNumberOfRooms}
                  onChange={(e) => setSelectedNumberOfRooms(e.target.value)}
                  sx={{mt: 1, width: '100%'}}
                >
                  <MenuItem value="" disabled>
                    Выберите количество комнат
                  </MenuItem>
                  {data.number_of_rooms.map((i, index) => (<MenuItem key={index} value={i}>{i}</MenuItem>))}
                </Select>
                <label>Locations</label>
                <Select
                  label="Locations"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  sx={{mt: 1, width: '100%'}}
                >
                  <MenuItem value="" disabled>
                    Выберите локацию
                  </MenuItem>
                  {data.locations.map((l, index) => (<MenuItem key={index} value={l}>{l}</MenuItem>))}
                </Select>
                <label>Class Realty</label>
                <Select
                  label="Square Footage"
                  value={selectedSquareFootage}
                  onChange={(e) => setSelectedSquareFootage(e.target.value)}
                  sx={{mt: 1, width: '100%'}}
                >
                  <MenuItem value="" disabled>
                    Выберите площадь
                  </MenuItem>
                  {data.square_footage.map((i, index) => (<MenuItem key={index} value={i}>{i}</MenuItem>))}
                </Select>
              </Grid>
              <Grid item xs={6}>
                <label htmlFor="available">Available</label>
                <Checkbox checked={available} onChange={() => setAvailable(!available)} name="available" />
              </Grid>
            </Grid>
          }
          <Button onClick={handleSend}>Send</Button>
        </Box>
      </Modal>
    </>
  );
};

export default FiltersModal;
