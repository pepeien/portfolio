import React from 'react';
import { GoThreeBars } from 'react-icons/go';

let timeout: NodeJS.Timeout | undefined = undefined;

const Home = () => {
	const [isNavbarActive, setIsNavbarActive] = React.useState(false);
	const navbarListRef = React.useRef<HTMLDivElement>(null);

	const onNavbarButtonClick = () => {
		const nextState = !isNavbarActive;

		setIsNavbarActive(nextState);

		if (timeout) {
			clearTimeout(timeout);
		}

		if (nextState) {
			if (navbarListRef && navbarListRef.current) {
				navbarListRef.current.style.display = 'flex';
			}
		} else {
			timeout = setTimeout(() => {
				if (navbarListRef && navbarListRef.current) {
					navbarListRef.current.style.display = 'none';
				}
			}, 600);
		}
	};

	return (
		<main className='home --page --flex-column'>
			<div className='home__content --flex-column'>
				<div className='home__logo --flex-center --descend-in-reverse --faded-box'></div>
				<div className='home__navbar --flex-column --expand-sideways'>
					<button className='home__navbar--button' onClick={onNavbarButtonClick}>
						<GoThreeBars />
					</button>
					<div ref={navbarListRef} className='home__navbar--list' data-is-active={isNavbarActive}>
						<ul className='--flex-column --flex-center'></ul>
					</div>
				</div>
				<div className='home__resume --flex-center --descend-in-reverse --faded-box'>
					<div className='home__resume--content'></div>
				</div>
			</div>
		</main>
	);
};

export default Home;
