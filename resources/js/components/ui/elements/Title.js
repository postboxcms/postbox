import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';


const useStyles = makeStyles({
    iconClass: {
        float: "right",
        "& .MuiSvgIcon-root": {
            fontSize: 80
        }
    },
});

export default function Title(props) {
  const CardIcon = props.cardIcon;
  const classes = useStyles();
  return (
    <Typography className={props.className} component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
