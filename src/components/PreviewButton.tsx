import React from 'react';

//Types
import { ComponentAsProp } from '../utils/types';

//Services
import { extractPropComponent, isStringValid } from '../utils/services';

export interface PreviewRedirectorProps extends Pick<React.HTMLAttributes<HTMLButtonElement>, 'className'> {
	ContentComponent?: ComponentAsProp;
	onHover?: React.MouseEventHandler<HTMLButtonElement>;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const PreviewRedirector = ({ className, ContentComponent, onHover, onClick }: PreviewRedirectorProps) => {
	return (
		<button
			className={
				className && isStringValid(className)
					? `preview-redirector --rasterized-button ${className}`
					: 'preview-redirector --rasterized-button'
			}
			onMouseEnter={onHover}
			onClick={onClick}
		>
			<div className='preview-redirector__film --opacity-ease-in' />
			{extractPropComponent(ContentComponent)}
		</button>
	);
};

export default PreviewRedirector;
