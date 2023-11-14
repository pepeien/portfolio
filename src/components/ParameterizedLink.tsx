'use client';

import React from 'react';
import Link from 'next/link';

// Services
import { removeExtraSlashes } from '@utils/services/api';
import { useSearchParams } from 'next/navigation';

interface ParameterizedLinkProps {
    className?: string;
    to: string;
    children: string | JSX.Element | JSX.Element[];
}

const ParameterizedLink = ({ className, to, children }: ParameterizedLinkProps) => {
    const search = useSearchParams();

    return (
        <Link
            className={className}
            href={`${removeExtraSlashes(to)}?locale=${search.get('locale')}`}
        >
            {children}
        </Link>
    );
};

export default ParameterizedLink;
