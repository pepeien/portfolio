import React from 'react';
import { NavLink } from 'react-router-dom';

//Services
import { getUniqueKey, isMobileView, isStringValid, isURLValid } from '../utils/services';

//Components
import { OpacityButton } from '.';

export interface NavbarItem {
	title: string;
	path: string;
	isActive?: boolean;
	willRedirectOutside?: boolean;
}

export interface NavbarProps extends Pick<React.HTMLAttributes<HTMLElement>, 'className'> {
	items: NavbarItem[];
}

/**
 * @description
 * This component uses the react-dom's V6 'NavLink' so it only redirects
 * from the base path foward.
 * @param className [string]
 * @param items NavbarItem[]
 * @returns JSX.Element
 */
const Navbar = ({ className, items }: NavbarProps) => {
	const [isListVisible, setIsListVisible] = React.useState<boolean>(false);
	const [isMobile, setIsMobile] = React.useState<boolean>(isMobileView(window.innerWidth));

	React.useEffect(() => {
		window.addEventListener('resize', () => setIsMobile(isMobileView(window.innerWidth)));

		return () => {
			window.removeEventListener('resize', () => setIsMobile(isMobileView(window.innerWidth)));
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	});

	return (
		<nav
			className={className && isStringValid(className) ? `navbar ${className}` : 'navbar'}
			data-is-mobile={isMobile}
		>
			<ul className='navbar__list' data-is-visible={isMobile ? isListVisible : null}>
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
			{isMobile ? <OpacityButton ContentComponent={<span>Hambargar</span>}></OpacityButton> : null}
		</nav>
	);
};

export default Navbar;
