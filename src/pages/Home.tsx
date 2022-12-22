import React from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import { v4 } from 'uuid';

// Assets
import 'react-tabs/style/react-tabs.css';

// Utils
import { AppTab } from '../utils/interfaces';
import { firstToUpperCase } from '../utils/services';

// Tabs
import { AboutTab, ContactTab, ProjectsTab, SpecialtiesTab } from '../pages';

// Types
import { ButtonFillDesign, ButtonHoverAnimation } from '../components/Button';

// Services
import { Button, LanguageButton } from '../components';
import { LangContext } from '../context';

interface MovementDiff {
	name: string;
	traveledDistance: number;
	backtrackedDistance: number;
}

const AppTabs: AppTab[] = [
	{
		name: 'ABOUT_TITLE',
		isActive: true,
		component: <AboutTab />,
	},
	{
		name: 'SPECIALTIES_TITLE',
		isActive: true,
		component: <SpecialtiesTab />,
	},
	{
		name: 'PROJECTS_TITLE',
		isActive: true,
		component: <ProjectsTab />,
	},
	{
		name: 'CONTACT_TITLE',
		isActive: true,
		component: <ContactTab />,
	},
];

const mouseEventHistory: Array<MouseEvent> = [];

const MOUSE_EVENT_MAX_BACKTRACK = 5;

const Home = () => {
	const navbarIndicator = React.useRef<HTMLDivElement>(null);

	const [selectedLang, _] = React.useContext(LangContext);

	const [buttonFillDesign, setButtonFillDesign] = React.useState<ButtonFillDesign>('default');
	const [buttonHoverAnimation, setButtonHoverAnimation] = React.useState<ButtonHoverAnimation>('default');
	const [previousIndex, setPreviousIndex] = React.useState<number>(0);
	const [currentIndex, setCurrentIndex] = React.useState<number>(0);

	React.useEffect(() => {
		setTimeout(() => {
			moveNavbarIndicator();
		}, 1250);

		window.addEventListener('resize', () => {
			moveNavbarIndicator();
		});

		window.addEventListener('mousemove', (event) => {
			pushMouseHistory(event);
		});

		return () => {
			window.addEventListener('resize', () => {
				moveNavbarIndicator();
			});

			window.addEventListener('mousemove', (event) => {
				pushMouseHistory(event);
			});
		};
	}, []);

	const onTabSelection = (index: number, last: number) => {
		setCurrentIndex(index);
		setPreviousIndex(last);

		moveNavbarIndicator();
	};

	const pushMouseHistory = (event: MouseEvent) => {
		if (mouseEventHistory.length > MOUSE_EVENT_MAX_BACKTRACK) {
			mouseEventHistory.shift();
		}

		mouseEventHistory.push(event);
	};

	const getMouseHeadingDirection = (): MovementDiff => {
		const xAxis: MovementDiff = {
			name: 'X',
			traveledDistance: 0,
			backtrackedDistance: 0,
		};

		const yAxis: MovementDiff = {
			name: 'Y',
			traveledDistance: 0,
			backtrackedDistance: 0,
		};

		mouseEventHistory.forEach((mouseEvent, index) => {
			if (index == 0) {
				return;
			}

			const lastMovement: MouseEvent = mouseEventHistory[index - 1];

			xAxis.traveledDistance += Math.abs(lastMovement.pageX - mouseEvent.pageX);

			yAxis.traveledDistance += Math.abs(lastMovement.pageY - mouseEvent.pageY);

			if (mouseEvent.pageX < lastMovement.pageX) {
				xAxis.backtrackedDistance += Math.abs(lastMovement.pageX - mouseEvent.pageX);
			}

			if (mouseEvent.pageY < lastMovement.pageY) {
				yAxis.backtrackedDistance += Math.abs(lastMovement.pageY - mouseEvent.pageY);
			}
		});

		const result: MovementDiff = {
			name: 'NaM',
			traveledDistance: 0,
			backtrackedDistance: 0,
		};

		const firstPostion = mouseEventHistory[0];
		const lastPostion = mouseEventHistory[mouseEventHistory.length - 1];

		if (xAxis.traveledDistance > yAxis.traveledDistance) {
			result.name = xAxis.traveledDistance > xAxis.backtrackedDistance ? 'RIGHT' : 'LEFT';
			result.traveledDistance = xAxis.traveledDistance;
			result.backtrackedDistance = xAxis.backtrackedDistance;

			if (xAxis.traveledDistance == xAxis.backtrackedDistance) {
				result.name = firstPostion.pageX > lastPostion.pageX ? 'LEFT' : 'RIGHT';
			}
		} else {
			result.name = yAxis.traveledDistance > yAxis.traveledDistance ? 'TOP' : 'BOTTOM';
			result.traveledDistance = yAxis.traveledDistance;
			result.backtrackedDistance = yAxis.backtrackedDistance;

			if (yAxis.traveledDistance == yAxis.backtrackedDistance) {
				result.name = firstPostion.pageY > lastPostion.pageY ? 'TOP' : 'BOTTOM';
			}
		}

		return result;
	};

	const moveNavbarIndicator = () => {
		setTimeout(() => {
			const navbarItemElement = window.document.getElementsByClassName(
				'react-tabs__tab--selected',
			)[0] as HTMLLIElement;

			if (!navbarItemElement) {
				return;
			}

			const navbarIndicatorElement = navbarIndicator.current;

			if (navbarIndicatorElement) {
				const navbarItemElementRect = navbarItemElement.getBoundingClientRect();

				const width = navbarItemElementRect.right - navbarItemElementRect.left;

				navbarIndicatorElement.style.transform = `translateX(${navbarItemElementRect.x - width * 0.225}px)`;
				navbarIndicatorElement.style.width = `${width + 2.5}px`;
			}
		}, 100);
	};

	const onTabButtonHover = React.useCallback(() => {
		if (mouseEventHistory) {
			const mouseHeadingDirection = getMouseHeadingDirection();

			switch (mouseHeadingDirection.name) {
				case 'TOP':
					setButtonFillDesign('default');

					setButtonHoverAnimation('slide-up');

					break;
				case 'BOTTOM':
					setButtonFillDesign('default');

					setButtonHoverAnimation('slide-down');

					break;
				case 'LEFT':
					setButtonFillDesign('diagonal-down');

					setButtonHoverAnimation('slide-left');

					break;
				case 'RIGHT':
					setButtonFillDesign('diagonal-down');

					setButtonHoverAnimation('slide-right');

					break;
				default:
					setButtonFillDesign('default');

					setButtonHoverAnimation('default');

					break;
			}
		}
	}, []);

	const generateTabButton = React.useCallback(() => {
		return Object.values(AppTabs).map((tabComponent) => (
			<Tab
				className={`home__navbar--item --flex-center --${tabComponent.name}${
					tabComponent.isActive ? '' : ' --disabled'
				}`}
				key={v4()}
				onMouseEnter={() => onTabButtonHover()}
				disabled={!tabComponent.isActive}
			>
				<Button
					className='active-tab-button'
					fillComponentStyle={{
						backgroundColor: 'rgba(2, 70, 64, 1)',
					}}
					fillDesign={buttonFillDesign}
					fillHoverAnimationType={buttonHoverAnimation}
					ContentComponent={() => <span>{firstToUpperCase(selectedLang[tabComponent.name])}</span>}
				/>
			</Tab>
		));
	}, [buttonFillDesign, buttonHoverAnimation, onTabButtonHover, selectedLang]);

	const TabsComponent = React.useMemo(() => {
		return Object.values(AppTabs).map((tabComponent, index) => {
			const isSelected = index === currentIndex;
			const cameFromLeft = previousIndex > currentIndex;

			return (
				<TabPanel
					key={v4()}
					className={`react-tabs__tab-panel home__resume--content${
						isSelected ? (cameFromLeft ? ' --left-root' : ' --right--root') : ''
					}`}
				>
					{tabComponent.isActive ? tabComponent.component : <div></div>}
				</TabPanel>
			);
		});
	}, [previousIndex, currentIndex]);

	return (
		<main className='home --page --flex-column'>
			<LanguageButton />
			<div className='home__content --flex-column'>
				<div className='home__logo --flex-center --descend-in-reverse --faded-box'>
					<span>{firstToUpperCase(selectedLang[AppTabs[currentIndex].name])}</span>
				</div>
				<Tabs onSelect={(index, last) => onTabSelection(index, last)}>
					<TabList className='home__navbar --expand-sideways --flex-column'>
						<ul className='home__navbar--items --flex-center'>{generateTabButton()}</ul>
						<div className='home__navbar--trail'>
							<div ref={navbarIndicator} className='home__navbar--indicator' />
						</div>
					</TabList>
					<div className='home__resume --descend-in-reverse --faded-box'>{TabsComponent}</div>
				</Tabs>
			</div>
		</main>
	);
};

export default Home;
