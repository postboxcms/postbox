import React from 'react';
import Skeleton from '@mui/material/Skeleton';

export default function Placeholder(props) {
    return [...Array(props.count)].map((e,i) => {
        return (
            <Skeleton key={i} height={props.height?props.height:30} />
        )
    })
}
