import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useWebCSS } from "@app/hooks/css";

export default function NoRowsOverlay(props) {
    const classes = useWebCSS();
    return (
        <div className={classes.noRowsOverlay + " no-rows-overlay"}>
            <div className="icon"><FontAwesomeIcon size='lg' icon={props.icon} /></div>
            <div className="message">{props.message}</div>
        </div>
    );
}
