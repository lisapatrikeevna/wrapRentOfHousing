import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const FiltersModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen=()=>{
    setIsOpen(!isOpen)
  }



  return (<>
    <Button onClick={handleOpen}>Open modal</Button>
    <Modal
      keepMounted
      open={isOpen}
      onClose={handleOpen}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <Box sx={style}>
        <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
    </>);
};

export default FiltersModal;
