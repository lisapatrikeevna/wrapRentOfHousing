import { Paper, Typography } from "@mui/material";
import React from "react";
import cl from './ServicesBlock.module.scss'


type ServicesItemType = {
  imgIcon: string|React.ElementType;
  title: string
  description: string
}
const ServicesItem = ({imgIcon, title, description}: ServicesItemType) => {

  return (<Paper className={cl.servicesItem}>
    {typeof imgIcon === 'string' ?
      <img src={imgIcon} alt="url img" />
    :
      React.createElement(imgIcon,{ style: { color: 'var(--secondary-color)', fontSize: '80px'} })
    }
    <Typography variant="h4" color="textSecondary">
      {title? title:'base h2 title'}
    </Typography>
    <Typography variant="body2" color="textSecondary">
      {description? description:'description'}
    </Typography>
  </Paper>);
};

export default ServicesItem;
