import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


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
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
