import React from "react";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCSS } from "@app/hooks/css";

export const PrimaryButton = (props) => {
    const classes = useCSS();
    
    return (
        <Button 
            size="medium"
            className={classes.primaryButton}
            {...props} 
            variant="contained" 
            color="primary" 
            startIcon={<FontAwesomeIcon size="lg" icon={props.icon} />}>
            {props.children}
        </Button>
    );
}

export default PrimaryButton;