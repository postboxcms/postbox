import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCSS } from '@app/hooks';

export default function Title({variant, children, icon}) {
  const classes = useCSS();
  return (
    <Typography className={variant !== "normal" && classes.pageTitle} component="h2" variant="h6" color="primary" gutterBottom>
      <FontAwesomeIcon size="lg" icon={icon} />{" "}
      {children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
