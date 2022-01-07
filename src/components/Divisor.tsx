import React from 'react';
import { CSSProperties } from 'react';
import { isMobileDevice } from '../utils/services';

export type DivisorOrientation = 'vertical' | 'horizontal';

export interface DivisorProps extends Pick<CSSProperties, 'backgroundColor' | 'width' | 'height'> {
	orientation?: DivisorOrientation;
	isOrientationAutomatic?: boolean;
}

const Divisor = ({
	width,
	height,
	isOrientationAutomatic = true,
	orientation = 'horizontal',
	backgroundColor = 'white',
}: DivisorProps) => {
	const [deviceWidth, setDeviceWidth] = React.useState<number>(window.innerWidth);

	React.useEffect(() => {
		window.addEventListener('resize', () => setDeviceWidth(window.innerHeight));

		return () => {
			window.removeEventListener('resize', () => setDeviceWidth(window.innerHeight));
		};
	}, []);

	const getDeviceOrientation = (): DivisorOrientation => {
		if (isOrientationAutomatic) return isMobileDevice(deviceWidth) ? 'horizontal' : 'vertical';

		return orientation;
	};

	return (
		<div className='divisor' style={{ backgroundColor, width, height }} data-orientation={getDeviceOrientation()} />
	);
};

export default Divisor;
