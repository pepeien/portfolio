import React from 'react';

//Types
import { ComponentAsProp, ComponentClickEvent } from '../utils/types';

//Services
import { extractPropComponent, isStringValid } from '../utils/services';

export interface RectButtonProps extends Pick<React.HTMLAttributes<HTMLButtonElement>, 'className'> {
	ContentComponent?: ComponentAsProp;
	onClick?: ComponentClickEvent;
}

const RectButton = ({ className, ContentComponent, onClick }: RectButtonProps) => {
	const backgroundComponent = React.useRef<HTMLDivElement>(null);

	const setRectOrigin = (event: React.MouseEvent) => {
		if (backgroundComponent && backgroundComponent.current) {
			const componentRect: DOMRect = event.currentTarget.getBoundingClientRect();
			const clickXPosition: number = Math.round(event.clientX - componentRect.left);
			const clickYPosition: number = Math.round(event.clientY - componentRect.top);

			backgroundComponent.current.style.transformOrigin = `${clickXPosition}px ${clickYPosition}px`;
		}
	};

	return (
		<button
			className={
				className && isStringValid(className)
					? `rect-button --rasterized-button ${className}`
					: 'rect-button --rasterized-button'
			}
			onClickCapture={setRectOrigin}
			onClick={onClick}
		>
			<div className='rect-button__content'>{extractPropComponent(ContentComponent)}</div>
			<div ref={backgroundComponent} className='rect-button__background' />
		</button>
	);
};

export default RectButton;
