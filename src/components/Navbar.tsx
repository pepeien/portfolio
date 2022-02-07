import React from 'react';
import { Link, useLocation, Location } from 'react-router-dom';

//Types
import { Redirector } from '../utils/interfaces';
import { ComponentAsProp } from '../utils/types';

//Components
import { RectButton } from '.';

//Services
import {
	getUniqueKey,
	isMobileView,
	isStringValid,
	isURLValid,
	formatPathname,
	extractPropComponent,
	emulateDelay,
} from '../utils/services';

export interface NavbarProps extends Pick<React.HTMLAttributes<HTMLElement>, 'className'> {
	items: Redirector[];
	HighlightedComponents?: ComponentAsProp[] | ComponentAsProp;
}

/**
 * @description
 * When it comes to URL driven redirection this component uses the react-dom's V6 'NavLink' so it only redirects
 * from the base path foward if you are not using a '/' as the first
 * character of the pathname.
 * @param [className]
 * @param items
 * @returns JSX.Element
 */
const Navbar = ({ className, items, HighlightedComponents }: NavbarProps) => {
	const NavbarComponentRef = React.useRef<HTMLElement>(null);
	const NavbarIndicatorComponentRef = React.useRef<HTMLLIElement>(null);
	const ActiveNavbarItemComponentRef = React.useRef<HTMLLIElement>(null);
	const [isListVisible, setIsListVisible] = React.useState<boolean>(false);
	const [wasRendered, setWasRendered] = React.useState<boolean>(false);
	const [isMobile, setIsMobile] = React.useState<boolean>(isMobileView(window.innerWidth));
	const [activeComponentName, setActiveComponentName] = React.useState<string>('');
	const location: Location = useLocation();

	React.useEffect(() => {
		window.addEventListener('load', () => {
			window.scrollTo({ top: 0 });

			navbarIndicatorPositionHandler();
		});

		window.addEventListener('resize', () => {
			setIsMobile(isMobileView(window.innerWidth));

			navbarIndicatorPositionHandler();
		});

		window.addEventListener('scroll', () => {
			navbarIndicatorPositionHandler();
		});

		return () => {
			window.removeEventListener('load', () => {
				window.scrollTo({ top: 0 });

				navbarIndicatorPositionHandler();
			});

			window.removeEventListener('resize', () => {
				setIsMobile(isMobileView(window.innerWidth));

				navbarIndicatorPositionHandler();
			});

			window.removeEventListener('scroll', () => {
				navbarIndicatorPositionHandler();
			});
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	React.useEffect(() => {
		navbarIndicatorAnimationHandler();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeComponentName]);

	const onVisibilityControlButtonClick = (): void => {
		setIsListVisible(!isListVisible);

		if (wasRendered === false) {
			setWasRendered(true);
		}

		navbarIndicatorPositionHandler();

		emulateDelay(navbarIndicatorAnimationHandler, 1200);
	};

	const getActiveNavbarItemPathNameStatus = (): string | void => {
		const splittedPathName: string[] = formatPathname(location.pathname.slice(1, location.pathname.length)).split(
			'/',
		);

		for (let i = 0; i < splittedPathName.length; i++) {
			const pathBlock: string = splittedPathName[i].toLocaleLowerCase();

			if (items.find((item) => item.target.toLocaleLowerCase() === pathBlock)) {
				return pathBlock;
			}
		}
	};

	const isActive = (item: Redirector): boolean => {
		if (item.isComponentDriven) {
			return item.target === activeComponentName;
		} else {
			return getActiveNavbarItemPathNameStatus() === item.target.toLocaleLowerCase();
		}
	};

	const redirectToComponent = (item: Redirector): void => {
		const TargetComponent: HTMLElement | null = document.getElementById(item.target);

		if (TargetComponent) {
			window.scrollTo({ top: TargetComponent.offsetTop, behavior: 'smooth' });

			if (isMobile) {
				setIsListVisible(false);
			}
		}
	};

	const navbarIndicatorAnimationHandler = (): void => {
		if (NavbarIndicatorComponentRef.current && ActiveNavbarItemComponentRef.current) {
			const IndicatorComponent = NavbarIndicatorComponentRef.current;
			const NavbarItemComponent = ActiveNavbarItemComponentRef.current;

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

	const navbarIndicatorPositionHandler = (): void => {
		if (NavbarComponentRef.current) {
			const nextComponentName = items
				.filter((item) => item.isComponentDriven === true)
				.find((item) => {
					const ComponentDrivenElement: HTMLElement | null = document.getElementById(item.target);

					if (ComponentDrivenElement) {
						return (
							window.scrollY >= ComponentDrivenElement.offsetTop &&
							window.scrollY < ComponentDrivenElement.offsetTop + ComponentDrivenElement.offsetHeight
						);
					}

					return false;
				});

			if (nextComponentName && isStringValid(nextComponentName.target)) {
				if (activeComponentName !== nextComponentName.target) {
					setActiveComponentName(nextComponentName.target);
				}
			}
		}
	};

	const getPlusIcon = () => {
		return (
			<svg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' data-is-active={isListVisible}>
				<line x1='12' x2='12' y1='5' y2='19' />
				<line x1='5' x2='19' y1='12' y2='12' />
			</svg>
		);
	};

	return (
		<nav
			ref={NavbarComponentRef}
			className={className && isStringValid(className) ? `navbar ${className}` : 'navbar'}
			data-is-mobile={isMobile}
		>
			<div className='navbar__content' data-is-visible={isMobile && wasRendered ? isListVisible : null}>
				<div className='navbar__logo --flex-row --flex-center'>
					<div className='navbar__logo-left-bar' />
					<div className='navbar__logo-text --flex-center'>
						<div>Erico</div>
						<div className='--flex-column'>
							<span>で</span>
							<span>す</span>
						</div>
					</div>
					<div className='navbar__logo-right-bar' />
				</div>
				<ul className='navbar__list'>
					{items.map((item) => (
						<li
							ref={isActive(item) ? ActiveNavbarItemComponentRef : null}
							key={getUniqueKey()}
							className='navbar__item --flex-center'
						>
							{item.isComponentDriven ? (
								<button className='--rasterized-button' onClick={() => redirectToComponent(item)}>
									{item.title}
								</button>
							) : item.willRedirectOutside && isURLValid(item.target) ? (
								<a href={item.target}>{item.title}</a>
							) : (
								<Link to={item.target}>{item.title}</Link>
							)}
						</li>
					))}
					<li ref={NavbarIndicatorComponentRef} className='navbar__indicator' />
				</ul>
			</div>
			{isMobile ? (
				<ul className='navbar__bar --flex-center' data-is-active={isListVisible}>
					{HighlightedComponents ? (
						Symbol.iterator in Object(HighlightedComponents) ? (
							(HighlightedComponents as ComponentAsProp[]).map((HighlightedComponent) => {
								return (
									<li key={getUniqueKey()} className='navbar__button --flex-center'>
										{extractPropComponent(HighlightedComponent)}
									</li>
								);
							})
						) : (
							<li>{extractPropComponent(HighlightedComponents)}</li>
						)
					) : null}
					<li className='navbar__hamburguer-button'>
						<RectButton
							className='--flex-center'
							ContentComponent={getPlusIcon}
							onClick={onVisibilityControlButtonClick}
						/>
					</li>
				</ul>
			) : null}
		</nav>
	);
};

export default Navbar;
