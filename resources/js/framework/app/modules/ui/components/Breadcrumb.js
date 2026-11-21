import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '@ui/components/elements/Icon';

export default function Breadcrumb(props) {
    return (
        <nav aria-label="breadcrumb" className="inline-flex max-w-full items-center gap-2 rounded-full bg-[#281850] px-3 py-2 text-sm font-medium text-white">
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-white hover:text-violet-200">
                <Icon icon="fa-house" />
                Dashboard
            </Link>
            {props.title ? (
                <>
                    <span aria-hidden="true">/</span>
                    <span className="truncate">
                    {props.title}
                    </span>
                </>
            ) : ""
            }
        </nav>
    );
}
