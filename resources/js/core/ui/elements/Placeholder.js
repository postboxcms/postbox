import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Placeholder(props) {
    return (
        <Skeleton count={props.count} />
    );
}
