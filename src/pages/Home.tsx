import React from 'react';

//Components
import { Divisor, PreviewButton } from '../components';

const Home = () => {
	const getPreviewComponent = (previewURL: string) => {
		return (
			<img
				src={previewURL}
				style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '100%' }}
			/>
		);
	};

	return (
		<div className='home --flex-center --zoom-in'>
			<PreviewButton ContentComponent={() => getPreviewComponent('https://wallpapercave.com/wp/wp2729921.gif')} />
			<Divisor backgroundColor='#404040' />
			<PreviewButton ContentComponent={() => getPreviewComponent('https://wallpapercave.com/wp/wp2729921.gif')} />
		</div>
	);
};

export default Home;
