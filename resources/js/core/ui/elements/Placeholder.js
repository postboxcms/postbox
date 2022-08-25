import React from 'react';
import Skeleton from '@mui/material/Skeleton';

export const Loader = (props) => {
    return props.lines?[...Array(props.lines)].map((e,i) => {
        return (
            <Skeleton key={i} height={props.height?props.height:30} />
        )
    }):<Skeleton key={0} height={props.height?props.height:30} />;
}
export default function Placeholder(props) {
    if((typeof props.map !== typeof undefined && props.map.length <= 0) || (typeof props.check !== typeof undefined && props.check)) {
        return props.repeat?[...Array(props.repeat)].map((e,i) => {
            return props.children;
        }):props.children;
    }
    return(<></>);
}
