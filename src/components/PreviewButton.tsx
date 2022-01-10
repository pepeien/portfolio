import React from 'react';
import { Link } from 'react-router-dom';

//Utils
import { ComponentAsProp } from '../utils/types';
import { extractPropComponent } from '../utils/services';

export interface PreviewRedirectorProps {
	ContentComponent?: ComponentAsProp;
	onHover?: React.MouseEventHandler<HTMLAnchorElement>;
}

const PreviewRedirector = ({ ContentComponent, onHover }: PreviewRedirectorProps) => {
	return (
		<Link to='/' className='preview-redirector' onMouseEnter={onHover}>
			<div className='preview-redirector__film --opacity-ease-in' />
			{extractPropComponent(ContentComponent)}
		</Link>
	);
};

export default PreviewRedirector;
