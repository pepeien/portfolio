'use client';

import React, { useEffect, useState } from 'react';

// Types
import { Dictionary, Project, ProjectIdentity } from '@utils/interfaces';

export interface Props extends Project {
    dictionary: Dictionary;
}

export default function Component({ name, link, description, dictionary }: Props) {
    return (
        <a className='project-card --flex-column' href={link} target='_blank' rel='noreferrer'>
            <h5>{name}</h5>
            <span>{description[dictionary['LANGUAGE_LOCALE_URL']]}</span>
            <div />
        </a>
    );
}
