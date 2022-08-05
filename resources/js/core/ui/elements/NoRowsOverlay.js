import React from 'react';

export default function NoRowsOverlay(props) {
    return (
        <div className="no-rows-overlay">
            {props.message}
        </div>
    );
}
