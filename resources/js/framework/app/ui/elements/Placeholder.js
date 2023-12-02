import React from 'react';
import Skeleton from '@mui/material/Skeleton';

export const Loader = (props) => {
    return props.lines?[...Array(props.lines)].map((e,i) => {
        return (
            <div key={i} className='skeleton-loader'>
                <Skeleton key={i} height={props.height?props.height:20} />
            </div>
        )
    }):<div className='skeleton-loader'><Skeleton key={0} height={props.height?props.height:20} /></div>;
}
export default function Placeholder(props) {
    if((typeof props.map !== typeof undefined && props.map.length <= 0) || (typeof props.check !== typeof undefined && props.check)) {
        return props.repeat?[...Array(props.repeat)].map((e,i) => {
            return props.children;
        }):props.children;
    }
    return(<></>);
}
