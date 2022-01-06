import React from 'react';

//Enums
import { HttpStatusCode } from '../utils/enums';

export interface ErrorPageProps {
	httpError: HttpStatusCode;
}

const Error = ({ httpError }: ErrorPageProps) => {
	return (
		<div className='error'>
			<span className='error__number'>{httpError}</span>
			<div className='error__info'>
				<div className='error__info__title'>
					<span>{HttpStatusCode[httpError]}</span>
					<div />
				</div>
			</div>
		</div>
	);
};

export default Error;
