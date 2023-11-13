import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Services
import { removeExtraSlashes } from '../utils/services/api';

interface ParameterizedLinkProps {
    className?: string;
    to: string;
    children: string | JSX.Element | JSX.Element[];
}

const ParameterizedLink = ({ className, to, children }: ParameterizedLinkProps) => {
    const { search } = useLocation();

    return (
        <Link className={className} to={removeExtraSlashes(to) + search}>
            {children}
        </Link>
    );
};

export default ParameterizedLink;
