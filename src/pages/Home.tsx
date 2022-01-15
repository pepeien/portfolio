import React from 'react';
import { useNavigate } from 'react-router-dom';

//Components
import { Divisor, PreviewButton } from '../components';
import { emulateDelay } from '../utils/services';

const Home = () => {
	const navigate = useNavigate();

	const getPreviewComponent = (previewURL: string) => {
		return (
			<img
				src={previewURL}
				style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '100%' }}
			/>
		);
	};

	return (
		<div className='home --page --flex-center --zoom-in'>
			<PreviewButton
				ContentComponent={() => getPreviewComponent('https://wallpapercave.com/wp/wp2729921.gif')}
				onClick={() => emulateDelay(() => navigate('dev', { replace: false, state: location.pathname }), 200)}
			/>
			<Divisor backgroundColor='#404040' />
			<PreviewButton
				ContentComponent={() => getPreviewComponent('https://wallpapercave.com/wp/wp2729921.gif')}
				onClick={() => emulateDelay(() => navigate('art', { replace: false, state: location.pathname }), 200)}
			/>
		</div>
	);
};

export default Home;
