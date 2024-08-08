import Link from 'next/link';
import React from 'react';

// Types
import { Dictionary } from '@utils/interfaces';

interface Props {
    dictionary: Dictionary;
}

export default function Component({ dictionary }: Props) {
    return (
        <ul className='socials --flex-row'>
            <li className='socials__button --flex-column --bg-color-ease-in'>
                <Link href={process.env.NEXT_PUBLIC_GIT_URL ?? ''} target='_blank' rel='noreferrer'>
                    <svg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'>
                        <g>
                            <path d='M15,5.6,10.4,1A3.4,3.4,0,0,0,5.78.86L7.66,2.74a1.25,1.25,0,0,1,1.67,1.2V4a1.23,1.23,0,0,1-.08.38l2.45,2.4a1.17,1.17,0,0,1,.37-.08A1.3,1.3,0,1,1,10.77,8h0a1.17,1.17,0,0,1,.08-.37L8.6,5.38v5.23a1.28,1.28,0,0,1,.73,1.15,1.3,1.3,0,0,1-2.6,0,1.27,1.27,0,0,1,.67-1.11V5.07A1.27,1.27,0,0,1,6.73,4a1.17,1.17,0,0,1,.08-.37l-1.9-1.9L1,5.6a3.38,3.38,0,0,0,0,4.79H1L5.6,15a3.38,3.38,0,0,0,4.79,0h0L15,10.4a3.38,3.38,0,0,0,0-4.79Z' />
                        </g>
                    </svg>
                </Link>
            </li>
            <li className='socials__button --flex-column --bg-color-ease-in'>
                <Link
                    href={
                        process.env.NEXT_PUBLIC_LINKEDIN_URL
                            ? `${process.env.NEXT_PUBLIC_LINKEDIN_URL}?locale=${dictionary['LANGUAGE_LOCALE_LINKEDIN']}`
                            : ''
                    }
                    target='_blank'
                    rel='noreferrer'
                >
                    <svg
                        viewBox='0 0 20 20'
                        version='1.1'
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                    >
                        <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                            <g transform='translate(-180.000000, -7479.000000)' fill='#000000'>
                                <g id='icons' transform='translate(56.000000, 160.000000)'>
                                    <path d='M144,7339 L140,7339 L140,7332.001 C140,7330.081 139.153,7329.01 137.634,7329.01 C135.981,7329.01 135,7330.126 135,7332.001 L135,7339 L131,7339 L131,7326 L135,7326 L135,7327.462 C135,7327.462 136.255,7325.26 139.083,7325.26 C141.912,7325.26 144,7326.986 144,7330.558 L144,7339 L144,7339 Z M126.442,7323.921 C125.093,7323.921 124,7322.819 124,7321.46 C124,7320.102 125.093,7319 126.442,7319 C127.79,7319 128.883,7320.102 128.883,7321.46 C128.884,7322.819 127.79,7323.921 126.442,7323.921 L126.442,7323.921 Z M124,7339 L129,7339 L129,7326 L124,7326 L124,7339 Z'></path>
                                </g>
                            </g>
                        </g>
                    </svg>
                </Link>
            </li>
            <li className='socials__button --flex-column --bg-color-ease-in'>
                <Link
                    href={process.env.NEXT_PUBLIC_EMAIL_URL ?? ''}
                    target='_blank'
                    rel='noreferrer'
                >
                    <svg viewBox='0 0 32 32' version='1.1' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M30.996 7.824v17.381c0 0 0 0 0 0.001 0 1.129-0.915 2.044-2.044 2.044-0 0-0 0-0.001 0h-4.772v-11.587l-8.179 6.136-8.179-6.136v11.588h-4.772c0 0 0 0-0 0-1.129 0-2.044-0.915-2.044-2.044 0-0 0-0.001 0-0.001v0-17.381c0-0 0-0.001 0-0.001 0-1.694 1.373-3.067 3.067-3.067 0.694 0 1.334 0.231 1.848 0.619l-0.008-0.006 10.088 7.567 10.088-7.567c0.506-0.383 1.146-0.613 1.84-0.613 1.694 0 3.067 1.373 3.067 3.067v0z'></path>
                    </svg>
                </Link>
            </li>
        </ul>
    );
}
