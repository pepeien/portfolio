import React from 'react';

//Utils
import { getDeviceOrientation, isStringValid } from '../utils/services';

export type DivisorOrientation = 'vertical' | 'horizontal';

export interface DivisorProps
	extends Pick<React.CSSProperties, 'backgroundColor' | 'width' | 'height'>,
		Pick<React.HTMLAttributes<HTMLDivElement>, 'className'> {
	orientation?: DivisorOrientation;
	isOrientationAutomatic?: boolean;
}

const Divisor = ({
	width,
	height,
	className,
	isOrientationAutomatic = true,
	orientation = 'horizontal',
	backgroundColor = 'white',
}: DivisorProps) => {
	const [deviceOrientation, setDeviceOrientation] = React.useState<DivisorOrientation>(
		isOrientationAutomatic ? getDeviceOrientation(window.innerWidth) : orientation,
	);

	React.useEffect(() => {
		window.addEventListener('resize', () => setDeviceOrientation(deviceOrientationHandler(window.innerWidth)));

		return () => {
			window.removeEventListener('resize', () =>
				setDeviceOrientation(deviceOrientationHandler(window.innerWidth)),
			);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const deviceOrientationHandler = (innerWidth: number): DivisorOrientation => {
		if (isOrientationAutomatic) {
			return getDeviceOrientation(innerWidth);
		}

		return orientation;
	};

	return (
		<div
			className={className && isStringValid(className) ? `divisor ${className}` : 'divisor'}
			style={{ backgroundColor, width, height }}
			data-orientation={deviceOrientation}
		/>
	);
};

export default Divisor;
