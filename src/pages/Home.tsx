import React from 'react';
import { useNavigate } from 'react-router-dom';

//Components
import { Divisor, PreviewButton } from '../components';

//Services
import { emulateDelay, isMobileView } from '../utils/services';

const Home = () => {
	const navigate = useNavigate();
	const [isMobile, setIsMobile] = React.useState<boolean>(isMobileView(window.innerWidth));

	React.useEffect(() => {
		window.addEventListener('resize', () => setIsMobile(isMobileView(window.innerWidth)));

		return () => {
			window.removeEventListener('resize', () => setIsMobile(isMobileView(window.innerWidth)));
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	});

	const getDevPreviewComponent = (previewURL: string) => {
		return (
			<img
				className={isMobile ? '--descend-in-reverse' : '--slide-in'}
				src={previewURL}
				style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '100%' }}
			/>
		);
	};

	const getArtPreviewComponent = (previewURL: string) => {
		return (
			<img
				className={isMobile ? '--descend-in' : '--slide-in-reverse'}
				src={previewURL}
				style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '100%' }}
			/>
		);
	};

	return (
		<main className='home --page --flex-center --fade-in'>
			<PreviewButton
				className='--hidden-overflow-all'
				ContentComponent={() => getDevPreviewComponent('https://wallpapercave.com/wp/wp2729921.gif')}
				onClick={() => emulateDelay(() => navigate('dev', { replace: false, state: location.pathname }), 200)}
			/>
			<Divisor className='--zoom-in' backgroundColor='#404040' />
			<PreviewButton
				className='--hidden-overflow-all'
				ContentComponent={() => getArtPreviewComponent('https://wallpapercave.com/wp/wp2729921.gif')}
				onClick={() => emulateDelay(() => navigate('art', { replace: false, state: location.pathname }), 200)}
			/>
		</main>
	);
};

export default Home;
