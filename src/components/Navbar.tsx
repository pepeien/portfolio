import React from 'react';
import { Link, useLocation, Location } from 'react-router-dom';

//Types
import { Redirector } from '../utils/interfaces';

//Components
import { RectButton } from '.';

//Services
import { getUniqueKey, isMobileView, isStringValid, isURLValid, formatPathname } from '../utils/services';

export interface NavbarProps extends Pick<React.HTMLAttributes<HTMLElement>, 'className'> {
	items: Redirector[];
}

/**
 * @description
 * This component uses the react-dom's V6 'NavLink' so it only redirects
 * from the base path foward if you are not using a '/' as the first
 * character of the pathname.
 * @param [className]
 * @param items
 * @returns JSX.Element
 */
const Navbar = ({ className, items }: NavbarProps) => {
	const [isListVisible, setIsListVisible] = React.useState<boolean>(false);
	const [wasRendered, setWasRendered] = React.useState<boolean>(false);
	const [isMobile, setIsMobile] = React.useState<boolean>(isMobileView(window.innerWidth));
	const navbarIndicatorComponent = React.useRef<HTMLLIElement>(null);
	const activeNavbarItemComponent = React.useRef<HTMLLIElement>(null);
	const location: Location = useLocation();

	React.useEffect(() => {
		window.addEventListener('resize', () => {
			setIsMobile(isMobileView(window.innerWidth));
			navbarIndicatorHandler(true);
		});

		return () => {
			window.addEventListener('resize', () => {
				setIsMobile(isMobileView(window.innerWidth));
				navbarIndicatorHandler(true);
			});
		};
	});

	React.useEffect(() => {
		navbarIndicatorHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [location]);

	const getPlusIcon = () => {
		return (
			<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' data-is-rotated={isListVisible}>
				<line x1='12' x2='12' y1='5' y2='19' />
				<line x1='5' x2='19' y1='12' y2='12' />
			</svg>
		);
	};

	const onVisibilityControlButtonClick = (): void => {
		setIsListVisible(!isListVisible);

		if (wasRendered === false) {
			setWasRendered(true);
		}
	};

	const getActiveNavbarItemPathNameStatus = (): string | void => {
		const splittedPathName: string[] = formatPathname(location.pathname.slice(1, location.pathname.length)).split(
			'/',
		);

		for (let i = 0; i < splittedPathName.length; i++) {
			const pathBlock: string = splittedPathName[i];

			if (items.find((item) => item.path === pathBlock)) {
				return pathBlock;
			}
		}
	};

	const navbarIndicatorHandler = (isResizeEvent = false): void => {
		if (navbarIndicatorComponent.current && activeNavbarItemComponent.current) {
			const IndicatorComponent = navbarIndicatorComponent.current;
			const NavbarItemComponent = activeNavbarItemComponent.current;

			if (isResizeEvent) {
				if (!IndicatorComponent.style.transitionDuration) {
					IndicatorComponent.style.transitionDuration = '0ms';
				}
			} else {
				if (IndicatorComponent.style.transitionDuration) {
					IndicatorComponent.style.transitionDuration = '';
				}
			}

			if (isMobile) {
				IndicatorComponent.style.width = '';
				IndicatorComponent.style.left = '';

				IndicatorComponent.style.height = `${NavbarItemComponent.offsetHeight}px`;
				IndicatorComponent.style.top = `${NavbarItemComponent.offsetTop}px`;
			} else {
				IndicatorComponent.style.height = '';
				IndicatorComponent.style.top = '';

				IndicatorComponent.style.width = `${NavbarItemComponent.offsetWidth}px`;
				IndicatorComponent.style.left = `${NavbarItemComponent.offsetLeft}px`;
			}
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
					{items.map((item) => (
						<li
							ref={getActiveNavbarItemPathNameStatus() === item.path ? activeNavbarItemComponent : null}
							key={getUniqueKey()}
							className='navbar__item'
						>
							{item.willRedirectOutside && isURLValid(item.path) ? (
								<a href={item.path}>{item.title}</a>
							) : (
								<Link to={item.path}>{item.title}</Link>
							)}
						</li>
					))}
					<li ref={navbarIndicatorComponent} className='navbar__indicator' />
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
