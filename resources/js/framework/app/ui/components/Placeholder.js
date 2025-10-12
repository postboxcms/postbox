import React from 'react';
import Skeleton from '@mui/material/Skeleton';

export const Loader = (props) => {
    const { lines, height, width, variant } = props;
    return lines ? [...Array(lines)].map((e, i) => {
        return (
            <div key={i} className='skeleton-loader'>
                <Skeleton variant={variant} key={i} height={height} width={width} {...props} />
            </div>
        );
    }) : <div className='skeleton-loader'><Skeleton key={0} height={height} width={width} {...props} /></div>;
}
const Placeholder = (props) => {
    const { map, check, repeat, children } = props;
    if ((typeof map !== typeof undefined && map.length <= 0) || (typeof check !== typeof undefined && check)) {
        return repeat ? [...Array(repeat)].map((e, i) => {
            return children;
        }) : children;
    }
    return (<></>);
}

Placeholder.defaultProps = {
    repeat: 1,
    map: undefined,
    check: undefined,
}

Loader.defaultProps = {
    lines: 1,
    height: 20,
    width: '100%',
    variant: 'rectangular',
}

export default Placeholder;