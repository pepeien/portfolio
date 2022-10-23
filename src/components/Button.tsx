import React from 'react';

//Types
import { ComponentAsProp } from '../utils/types';

//Services
import { extractPropComponent } from '../utils/services';

/**
 * @description The default fill design consists on a simple full background.
 */
export type ButtonFillDesign = 'default' | 'diagonal-down' | 'diagonal-up';

/**
 * @description The default animation consists on a simple background ease-in-out transition.
 */
export type ButtonHoverAnimation = 'default' | 'slide-right' | 'slide-left' | 'slide-down' | 'slide-up';

export interface ButtonProps {
	className?: string;
	wrapperComponentStyle?: React.CSSProperties;
	fillDesign?: ButtonFillDesign;
	fillComponentStyle?: React.CSSProperties;
	fillHoverAnimationType?: ButtonHoverAnimation;
	ContentComponent?: ComponentAsProp;
	onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Button = ({
	className = '',
	wrapperComponentStyle,
	ContentComponent,
	fillComponentStyle,
	onClick,
	fillDesign = 'default',
	fillHoverAnimationType = 'default',
}: ButtonProps) => {
	return (
		<button
			className={`${className} --rasterized-button --flex-center`.trim()}
			onClick={onClick}
			style={wrapperComponentStyle}
			data-fill-design={fillDesign}
			data-hover-animation={fillHoverAnimationType}
		>
			<div className='content'>{extractPropComponent(ContentComponent)}</div>
			<div
				className='background --opacity-ease-in'
				style={fillComponentStyle}
				data-fill-design={fillDesign}
				data-hover-animation={fillHoverAnimationType}
			/>
		</button>
	);
};

export default Button;
