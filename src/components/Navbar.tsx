import React from 'react';
import { NavLink } from 'react-router-dom';

//Types
import { Redirector } from '../utils/interfaces';

//Components
import { RectButton } from '.';

//Services
import { getUniqueKey, isMobileView, isStringValid, isURLValid } from '../utils/services';

export interface NavbarProps extends Pick<React.HTMLAttributes<HTMLElement>, 'className'> {
	items: Redirector[];
}

/**
 * @description
 * This component uses the react-dom's V6 'NavLink' so it only redirects
 * from the base path foward.
 * @param className [string]
 * @param items Redirector[]
 * @returns JSX.Element
 */
const Navbar = ({ className, items }: NavbarProps) => {
	const [isListVisible, setIsListVisible] = React.useState<boolean>(false);
	const [wasRendered, setWasRendered] = React.useState<boolean>(false);
	const [isMobile, setIsMobile] = React.useState<boolean>(isMobileView(window.innerWidth));

	React.useEffect(() => {
		window.addEventListener('resize', () => setIsMobile(isMobileView(window.innerWidth)));

		return () => {
			window.removeEventListener('resize', () => setIsMobile(isMobileView(window.innerWidth)));
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	});

	const getPlusIcon = () => {
		return (
			<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' data-is-rotated={isListVisible}>
				<line x1='12' x2='12' y1='5' y2='19' />
				<line x1='5' x2='19' y1='12' y2='12' />
			</svg>
		);
	};

	const onVisibilityControlButtonClick = () => {
		setIsListVisible(!isListVisible);

		if (wasRendered === false) {
			setWasRendered(true);
		}
	};

	return (
		<nav
			className={className && isStringValid(className) ? `navbar ${className}` : 'navbar'}
			data-is-mobile={isMobile}
		>
			<div className='navbar__content' data-is-visible={isMobile && wasRendered ? isListVisible : null}>
				<div className='navbar__logo --flex-row --flex-center'>
					<div className='navbar__logo-first' />
					<span className='navbar__logo-second --flex-center'>Ericodess</span>
					<div className='navbar__logo-third' />
				</div>
				<ul className='navbar__list'>
					{items.map((item) => {
						return (
							<li key={getUniqueKey()}>
								{item.willRedirectOutside && isURLValid(item.path) ? (
									<a href={item.path}>{item.title}</a>
								) : (
									<NavLink
										to={item.path}
										className={({ isActive }) => (isActive ? 'navbar__item' : 'navbar__item')}
									>
										{item.title}
									</NavLink>
								)}
							</li>
						);
					})}
				</ul>
			</div>
			{isMobile ? (
				<div className='navbar__bar --flex-center' data-is-rotated={isListVisible}>
					<RectButton
						className='--flex-center'
						ContentComponent={getPlusIcon}
						onClick={onVisibilityControlButtonClick}
					/>
				</div>
			) : null}
		</nav>
	);
};

export default Navbar;
