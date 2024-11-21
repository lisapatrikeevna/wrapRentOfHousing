import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  OutlinedInput,
  FormHelperText,
} from '@mui/material';

type PropsType = {
  handleClose: () => void;
  bookingOpenHandles: (dates: Array<Date>) => void;
  open: boolean;
};

const BookingModal: React.FC<PropsType> = (props) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setStartDate(date);
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(event.target.value);
    setEndDate(date);
  };

  const handleAgree = () => {
    if (startDate && endDate) {
      props.bookingOpenHandles([startDate, endDate]);
    }
    props.handleClose();
  };

  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title">Select date for booking</DialogTitle>
        <DialogContent>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput id="outlined-start-date" type="date" onChange={handleStartDateChange} inputProps={{ 'aria-label': 'start date' }} />
            <FormHelperText>From</FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <OutlinedInput id="outlined-end-date" type="date" onChange={handleEndDateChange} inputProps={{ 'aria-label': 'end date' }} />
            <FormHelperText>To</FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>Agree</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookingModal;
