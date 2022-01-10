import React from 'react';
import { Link } from 'react-router-dom';

//Utils
import { ComponentAsProp } from '../utils/types';
import { extractPropComponent } from '../utils/services';

export interface PreviewRedirectorProps {
	path?: string;
	ContentComponent?: ComponentAsProp;
	onHover?: React.MouseEventHandler<HTMLAnchorElement>;
}

const PreviewRedirector = ({ path = '/', ContentComponent, onHover }: PreviewRedirectorProps) => {
	return (
		<Link to={path} className='preview-redirector' onMouseEnter={onHover}>
			<div className='preview-redirector__film --opacity-ease-in' />
			{extractPropComponent(ContentComponent)}
		</Link>
	);
};

export default PreviewRedirector;
