import React from 'react';

//Components
import { ContactForm } from '../components';

const PlaceHolder = () => {
	const [isModalVisible, setIsModalVisible] = React.useState<boolean>(false);

	const modalHandler = () => {
		setIsModalVisible(!isModalVisible);
	};

	return (
		<div className='place-holder --fade-in'>
			<div className='place-holder__title --zoom-in'>
				<div>
					<span className='--slide-in'>Coming</span>
				</div>
				<div className='--blink --infinite-animation' />
				<div>
					<span>Soon</span>
				</div>
			</div>
			<div className='place-holder__footer'>
				<button
					className='place-holder__footer-button --up-in'
					is-upward={new String(isModalVisible)}
					onClick={modalHandler}
				>
					<svg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 330 330'>
						<path
							d='M325.606,229.393l-150.004-150C172.79,76.58,168.974,75,164.996,75c-3.979,0-7.794,1.581-10.607,4.394
							l-149.996,150c-5.858,5.858-5.858,15.355,0,21.213c5.857,5.857,15.355,5.858,21.213,0l139.39-139.393l139.397,139.393
							C307.322,253.536,311.161,255,315,255c3.839,0,7.678-1.464,10.607-4.394C331.464,244.748,331.464,235.251,325.606,229.393z'
						/>
					</svg>
					<div />
				</button>
			</div>
			<ContactForm isVisible={isModalVisible} />
		</div>
	);
};

export default PlaceHolder;
