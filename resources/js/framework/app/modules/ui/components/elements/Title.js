import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWebCSS } from '@app/hooks';

export default function Title({variant, children, icon, ...props}) {
  const classes = useWebCSS();
  return (
    <h2 {...props} className={`${variant !== "normal" ? classes.pageTitle : 'text-lg font-semibold text-slate-800'} ${props.className || ''}`}>
      {icon && <FontAwesomeIcon size="lg" icon={icon} className="mr-2" />}
      {children}
    </h2>
  );
}

Title.propTypes = {
  children: PropTypes.node,
};
