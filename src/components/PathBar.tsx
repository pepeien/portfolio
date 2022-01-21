import React from 'react';
import { NavLink } from 'react-router-dom';

//Types
import { Redirector } from '../utils/interfaces';

//Components
import { RectButton } from '.';

//Services
import { getUniqueKey, isMobileView, isStringValid, isURLValid } from '../utils/services';

export interface RingBarProps extends Pick<React.HTMLAttributes<HTMLElement>, 'className'> {
	items: Redirector[];
}

const PathBar = ({ items, className }: RingBarProps) => {
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
			className={className && isStringValid(className) ? `pathbar ${className}` : 'pathbar'}
			data-is-mobile={isMobile}
		>
			<div className='pathbar__bar --flex-center' data-is-rotated={isListVisible}>
				<RectButton
					className='--flex-center'
					ContentComponent={getPlusIcon}
					onClick={onVisibilityControlButtonClick}
				/>
			</div>
			<ul className='pathbar__list' data-is-visible={wasRendered ? isListVisible : null}>
				{items.map((item) => {
					return (
						<li key={getUniqueKey()}>
							{item.willRedirectOutside && isURLValid(item.path) ? (
								<a href={item.path}>{item.title}</a>
							) : (
								<NavLink
									to={item.path}
									className={({ isActive }) => (isActive ? 'pathbar__item' : 'pathbar__item')}
								>
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

export default PathBar;
