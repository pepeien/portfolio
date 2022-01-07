import React from 'react';

//Components
import { Divisor, PreviewButton } from '../components';

const Home = () => {
	return (
		<div className='home --flex-center --zoom-in'>
			<PreviewButton />
			<Divisor />
			<PreviewButton />
		</div>
	);
};

export default Home;
