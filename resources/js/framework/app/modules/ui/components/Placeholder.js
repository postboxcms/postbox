import React from 'react';

export const Loader = (props) => {
    const { lines = 1, height = 20, width = '100%' } = props;
    return lines ? [...Array(lines)].map((e, i) => {
        return (
            <div key={i} className='skeleton-loader' aria-hidden="true">
                <div className="animate-pulse rounded bg-slate-200" style={{ height, width }} />
            </div>
        );
    }) : null;
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