import React from 'react';
import { NavLink } from 'react-router-dom';

//Services
import { getUniqueKey, isURLValid } from '../utils/services';

export interface NavbarItem {
	title: string;
	path: string;
	isActive?: boolean;
	willRedirectOutside?: boolean;
}

export interface NavbarListProps extends Pick<React.HTMLAttributes<HTMLElement>, 'className'> {
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
const NavbarList = ({ className, items }: NavbarListProps) => {
	const activeStyle: React.CSSProperties = {
		color: 'white',
	};

	return (
		<nav className={className}>
			<ul>
				{items.map((item) => {
					return (
						<li key={getUniqueKey()}>
							{item.willRedirectOutside && isURLValid(item.path) ? (
								<a href={item.path}>{item.title}</a>
							) : (
								<NavLink to={item.path} style={({ isActive }) => (isActive ? activeStyle : {})}>
									{item.title}
								</NavLink>
							)}
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default NavbarList;
