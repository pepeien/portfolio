'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

// Types
import { Dictionary } from '@utils/interfaces';

// Services
import { StringServices } from '@utils/services';

interface Props {
    dictionary: Dictionary;
    locales?: Dictionary;
}

const Navbar = ({ dictionary, locales }: Props) => {
    const pathName = usePathname();

    const [canShowNavbar, setCanShowNavbar] = React.useState<boolean>(false);
    const [canShowList, setCanShowList] = React.useState<boolean>(false);

    const isLanguageSelected = React.useCallback(
        (langName: string) => {
            return langName === dictionary['LANGUAGE_LOCALE_URL'];
        },
        [dictionary],
    );

    const onHamburguerButtonClick = () => {
        setCanShowNavbar(!canShowNavbar);
    };

    const onMainButtonClick = () => {
        setCanShowList(!canShowList);
    };

    return (
        <nav
            className='navbar --flex-column'
            data-can-show={canShowNavbar}
            data-can-show-languages={canShowList}
        >
            <div className='navbar__content --shadowed'>
                <div className='navbar__internals --flex-row'>
                    <Link
                        className='navbar__button --flex-column'
                        href={`/${dictionary['LANGUAGE_LOCALE_URL']}`}
                    >
                        <svg
                            version='1.0'
                            xmlns='http://www.w3.org/2000/svg'
                            xmlnsXlink='http://www.w3.org/1999/xlink'
                            viewBox='0 0 64 64'
                        >
                            <path
                                d='M62.79,29.172l-28-28C34.009,0.391,32.985,0,31.962,0s-2.047,0.391-2.828,1.172l-28,28
	c-1.562,1.566-1.484,4.016,0.078,5.578c1.566,1.57,3.855,1.801,5.422,0.234L8,33.617V60c0,2.211,1.789,4,4,4h16V48h8v16h16
	c2.211,0,4-1.789,4-4V33.695l1.195,1.195c1.562,1.562,3.949,1.422,5.516-0.141C64.274,33.188,64.356,30.734,62.79,29.172z'
                            />
                        </svg>
                    </Link>
                    {locales ? (
                        <div className='navbar__language --flex-column'>
                            <button className='navbar__button' onClick={onMainButtonClick}>
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                                    <path d='M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z' />
                                </svg>
                            </button>
                            <ul className='navbar__language__list --shadowed'>
                                {Object.entries(locales).map(([id, name]) => (
                                    <li key={id} data-is-selected={isLanguageSelected(id)}>
                                        <Link
                                            href={`/${id}/${StringServices.removeExtraSlashes(
                                                pathName.split(
                                                    dictionary['LANGUAGE_LOCALE_URL'],
                                                )[1],
                                            )}`}
                                            scroll={false}
                                        >
                                            <span>{name}</span>
                                            <div />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : undefined}
                </div>
                <div className='navbar__divider' />
                <div className='navbar__socials'>
                    <ul className='--flex-column'>
                        <li className='navbar__button --flex-column'>
                            <Link
                                href={process.env.NEXT_PUBLIC_GIT_URL ?? ''}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <svg viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'>
                                    <g>
                                        <path d='M15,5.6,10.4,1A3.4,3.4,0,0,0,5.78.86L7.66,2.74a1.25,1.25,0,0,1,1.67,1.2V4a1.23,1.23,0,0,1-.08.38l2.45,2.4a1.17,1.17,0,0,1,.37-.08A1.3,1.3,0,1,1,10.77,8h0a1.17,1.17,0,0,1,.08-.37L8.6,5.38v5.23a1.28,1.28,0,0,1,.73,1.15,1.3,1.3,0,0,1-2.6,0,1.27,1.27,0,0,1,.67-1.11V5.07A1.27,1.27,0,0,1,6.73,4a1.17,1.17,0,0,1,.08-.37l-1.9-1.9L1,5.6a3.38,3.38,0,0,0,0,4.79H1L5.6,15a3.38,3.38,0,0,0,4.79,0h0L15,10.4a3.38,3.38,0,0,0,0-4.79Z' />
                                    </g>
                                </svg>
                            </Link>
                        </li>
                        <li className='navbar__button --flex-column'>
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
                                        <g
                                            transform='translate(-180.000000, -7479.000000)'
                                            fill='#000000'
                                        >
                                            <g
                                                id='icons'
                                                transform='translate(56.000000, 160.000000)'
                                            >
                                                <path d='M144,7339 L140,7339 L140,7332.001 C140,7330.081 139.153,7329.01 137.634,7329.01 C135.981,7329.01 135,7330.126 135,7332.001 L135,7339 L131,7339 L131,7326 L135,7326 L135,7327.462 C135,7327.462 136.255,7325.26 139.083,7325.26 C141.912,7325.26 144,7326.986 144,7330.558 L144,7339 L144,7339 Z M126.442,7323.921 C125.093,7323.921 124,7322.819 124,7321.46 C124,7320.102 125.093,7319 126.442,7319 C127.79,7319 128.883,7320.102 128.883,7321.46 C128.884,7322.819 127.79,7323.921 126.442,7323.921 L126.442,7323.921 Z M124,7339 L129,7339 L129,7326 L124,7326 L124,7339 Z'></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            </Link>
                        </li>
                        <li className='navbar__button --flex-column'>
                            <Link
                                href={process.env.NEXT_PUBLIC_EMAIL_URL ?? ''}
                                target='_blank'
                                rel='noreferrer'
                            >
                                <svg
                                    viewBox='0 0 32 32'
                                    version='1.1'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path d='M30.996 7.824v17.381c0 0 0 0 0 0.001 0 1.129-0.915 2.044-2.044 2.044-0 0-0 0-0.001 0h-4.772v-11.587l-8.179 6.136-8.179-6.136v11.588h-4.772c0 0 0 0-0 0-1.129 0-2.044-0.915-2.044-2.044 0-0 0-0.001 0-0.001v0-17.381c0-0 0-0.001 0-0.001 0-1.694 1.373-3.067 3.067-3.067 0.694 0 1.334 0.231 1.848 0.619l-0.008-0.006 10.088 7.567 10.088-7.567c0.506-0.383 1.146-0.613 1.84-0.613 1.694 0 3.067 1.373 3.067 3.067v0z'></path>
                                </svg>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
            <button
                className='navbar__button navbar__hamburguer-button'
                onClick={onHamburguerButtonClick}
            >
                <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M5 6H12H19M5 12H19M5 18H19' strokeWidth='2' strokeLinecap='round' />
                </svg>
            </button>
        </nav>
    );
};

export default Navbar;
