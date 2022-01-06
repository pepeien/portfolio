import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

//Enums
import { HttpStatusCode } from '../utils/enums';

export interface ErrorPageProps {
	httpStatusCode?: HttpStatusCode;
	httpStatusCause?: string;
}

const Status = ({ httpStatusCode, httpStatusCause }: ErrorPageProps) => {
	const params = useParams() as ErrorPageProps;
	const location = useLocation();
	const statusCode = httpStatusCode ? httpStatusCode : params.httpStatusCode ?? HttpStatusCode.NOT_FOUND;
	const statusCause = httpStatusCause && httpStatusCause.length > 0 ? httpStatusCause : location.pathname;

	const isHttpStatusCodeValid = (statusCode: number): boolean => {
		const statusCodeList = Object.keys(HttpStatusCode);
		const isNumberValid = statusCodeList.includes(String(statusCode));

		return isNumberValid;
	};

	const getStatusCode = (code: number) => (isHttpStatusCodeValid(code) ? code : 404);

	const getStatusInfo = (code: number) => {
		const validErrorCode = getStatusCode(code);

		return HttpStatusCode[validErrorCode];
	};

	return (
		<div className='error --fade-in'>
			<div className='error__number --zoom-in'>
				{getStatusCode(statusCode).toString() === HttpStatusCode.I_AM_A_TEAPOT.toString() ? (
					<div />
				) : (
					<span>{getStatusCode(statusCode)}</span>
				)}
			</div>
			<div className='error__info'>
				<div className='error__info__title --primary'>
					<span className='--slide-in'>{statusCause}</span>
				</div>
				<div className='error__info__title'>
					<span className='--slide-in'>{getStatusInfo(statusCode)}</span>
					<div className='--blink --infinite-animation' />
				</div>
			</div>
		</div>
	);
};

export default Status;
