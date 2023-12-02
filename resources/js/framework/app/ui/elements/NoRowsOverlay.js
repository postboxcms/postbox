import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function NoRowsOverlay(props) {
    return (
        <div className="no-rows-overlay">
            <div className="icon"><FontAwesomeIcon size='lg' icon={props.icon} /></div>
            <div className="message">{props.message}</div>
        </div>
    );
}
