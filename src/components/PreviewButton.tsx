import React from 'react';

//Utils
import { ComponentAsProp } from '../utils/types';
import { extractPropComponent } from '../utils/services';

export interface PreviewRedirectorProps {
	ContentComponent?: ComponentAsProp;
	onHover?: React.MouseEventHandler<HTMLButtonElement>;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const PreviewRedirector = ({ ContentComponent, onHover, onClick }: PreviewRedirectorProps) => {
	return (
		<button className='preview-redirector --rasterized-button' onMouseEnter={onHover} onClick={onClick}>
			<div className='preview-redirector__film --opacity-ease-in' />
			{extractPropComponent(ContentComponent)}
		</button>
	);
};

export default PreviewRedirector;
