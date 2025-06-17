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
                    <svg
                        viewBox='0 0 20 20'
                        version='1.1'
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                        aria-hidden='true'
                    >
                        <g stroke='none' strokeWidth='1'>
                            <g transform='translate(-140.000000, -7559.000000)'>
                                <g transform='translate(56.000000, 160.000000)'>
                                    <path d='M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399'></path>
                                </g>
                            </g>
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
                        aria-hidden='true'
                    >
                        <g stroke='none' strokeWidth='1'>
                            <g transform='translate(-180.000000, -7479.000000)'>
                                <g transform='translate(56.000000, 160.000000)'>
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
                    <svg
                        viewBox='0 0 32 32'
                        version='1.1'
                        xmlns='http://www.w3.org/2000/svg'
                        aria-hidden='true'
                    >
                        <path d='M30.996 7.824v17.381c0 0 0 0 0 0.001 0 1.129-0.915 2.044-2.044 2.044-0 0-0 0-0.001 0h-4.772v-11.587l-8.179 6.136-8.179-6.136v11.588h-4.772c0 0 0 0-0 0-1.129 0-2.044-0.915-2.044-2.044 0-0 0-0.001 0-0.001v0-17.381c0-0 0-0.001 0-0.001 0-1.694 1.373-3.067 3.067-3.067 0.694 0 1.334 0.231 1.848 0.619l-0.008-0.006 10.088 7.567 10.088-7.567c0.506-0.383 1.146-0.613 1.84-0.613 1.694 0 3.067 1.373 3.067 3.067v0z'></path>
                    </svg>
                </Link>
            </li>
        </ul>
    );
}
