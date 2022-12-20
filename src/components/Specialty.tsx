import React from 'react';
import { v4 } from 'uuid';

export interface SpecialtyProps {
	level: number;
	name: string;
	isSelected?: boolean;
	isSelectabale?: boolean;
	frameworks?: Omit<SpecialtyProps, 'isSelected' | 'isSelectabale' | 'frameworks'>[];
	onClick?: () => void;
}

const Specialty = ({ level, name, onClick, isSelected = false, isSelectabale = true }: SpecialtyProps) => {
	const onButtonClick = () => {
		if (onClick) {
			onClick();
		}
	};

	return (
		<button
			className={`specialty`}
			data-is-selected={isSelectabale === true && isSelected === true}
			onClick={onButtonClick}
		>
			<span className='specialty__name'>{name}</span>
			<div className='specialty__steps'>
				{Array(level)
					.fill(0)
					.map((_, index) => {
						return (
							<div
								key={v4()}
								className='specialty__step'
								style={{ animationDelay: `${(index + 1 - level) / 10}s` }}
							></div>
						);
					})}
			</div>
		</button>
	);
};

const willRerender = (prevProps: SpecialtyProps, nextProps: SpecialtyProps) => {
	return prevProps.isSelected === nextProps.isSelected;
};
export default React.memo(Specialty, willRerender);
