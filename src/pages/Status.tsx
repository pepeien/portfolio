import React from 'react';
import { useParams, useLocation, useHref, useNavigate } from 'react-router-dom';

//Enums
import { HttpStatusCode } from '../utils/enums';

//Components
import { Button } from '../components';

//Services
import { isStringValid, isURLValid, validateInitialValue } from '../utils/services';

// Context
import { LangContext } from '../context';

export interface StatusPageProps {
	httpStatusCode?: HttpStatusCode;
	httpStatusCause?: string;
	redirectUrl?: string;
	willRedirectOutside?: boolean;
}

const Status = ({
	httpStatusCode,
	httpStatusCause,
	redirectUrl = '/',
	willRedirectOutside = false,
}: StatusPageProps) => {
	const [selectedLang, _] = React.useContext(LangContext);

	const params: StatusPageProps = useParams() as StatusPageProps;
	const location = useLocation();
	const href = useHref(redirectUrl);
	const navigate = useNavigate();
	const statusCode = httpStatusCode ? httpStatusCode : params.httpStatusCode ?? HttpStatusCode.NOT_FOUND;
	const statusCause = httpStatusCause && httpStatusCause.length > 0 ? httpStatusCause : location.pathname;
	const isValidated = validateInitialValue(location.pathname);

	const isHttpStatusCodeValid = (statusCode: number): boolean => {
		const statusCodeList = Object.keys(HttpStatusCode);
		const isNumberValid = statusCodeList.includes(String(statusCode));

		return isNumberValid;
	};

	const getStatusCode = (code: number) => (isHttpStatusCodeValid(code) ? code : 404);

	const getStatusInfo = (code: number) => {
		const validatedCode = getStatusCode(code);

		return HttpStatusCode[validatedCode];
	};

	const redirectHandler = () => {
		if (willRedirectOutside && isURLValid(redirectUrl)) {
			window.location.href = redirectUrl;

			return;
		}

		if (!isStringValid(href)) return;

		if (redirectUrl === '-1') {
			navigate(-1);
		} else {
			navigate(href, { replace: false });
		}
	};

	return (
		<main className='status --page --fade-in'>
			<div className='status__number --zoom-in'>
				{isValidated ? <div /> : <span>{getStatusCode(statusCode)}</span>}
			</div>
			<div className='status__info'>
				<div className='status__info__title --primary'>
					<span className='--slide-in'>{statusCause}</span>
				</div>
				<div className='status__info__title'>
					<span className='--slide-in'>
						{getStatusInfo(isValidated ? 69.66666666666667 * 6 : statusCode)}
					</span>
					<div className='--blink --infinite-animation' />
				</div>
				<Button
					wrapperComponentStyle={{
						color: '#C89C38',
						fontFamily: 'Arcane-Nine-Regular',
						fontSize: '2rem',
						margin: '0 0 2rem 0',
					}}
					fillComponentStyle={{
						backgroundColor: 'rgba(2, 70, 64, 1)',
					}}
					onClick={redirectHandler}
					ContentComponent={
						<span>
							{selectedLang['STATUS_TEXT_REASSURING']}{' '}
							{willRedirectOutside
								? selectedLang['STATUS_TEXT_LOCAL_OPTION']
								: selectedLang['STATUS_TEXT_OUTSIDE_OPTION']}
						</span>
					}
					fillDesign='diagonal-down'
					fillHoverAnimationType='slide-right'
				/>
			</div>
		</main>
	);
};

export default Status;
