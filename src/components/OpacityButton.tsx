import React from 'react';

//Types
import { ComponentAsProp, ComponentClickEvent } from '../utils/types';

//Services
import { extractPropComponent, isStringValid } from '../utils/services';

export interface OpacityButtonProps extends Pick<React.HTMLAttributes<HTMLButtonElement>, 'className'> {
	ContentComponent?: ComponentAsProp;
	onClick?: ComponentClickEvent;
}

const OpacityButton = ({ className, ContentComponent, onClick }: OpacityButtonProps) => {
	const backgroundComponent = React.useRef<HTMLDivElement>(null);

	const onUserClick = (event: React.MouseEvent) => {
		if (backgroundComponent && backgroundComponent.current) {
			const componentBounds: DOMRect = backgroundComponent.current.getBoundingClientRect();
			const clickXPosition: number = Math.round(event.clientX - componentBounds.left);
			const clickYPosition: number = Math.round(event.clientY - componentBounds.top);

			backgroundComponent.current.style.transformOrigin = `${clickXPosition}px ${clickYPosition}px`;
		}

		if (onClick) {
			onClick(event);
		}
	};

	return (
		<button
			className={
				className && isStringValid(className)
					? `opacity-button --rasterized-button ${className}`
					: 'opacity-button --rasterized-button'
			}
			onClick={onUserClick}
		>
			<div className='opacity-button__content'>{extractPropComponent(ContentComponent)}</div>
			<div ref={backgroundComponent} className='opacity-button__background' />
		</button>
	);
};

export default OpacityButton;
