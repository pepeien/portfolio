//Externals
import React from 'react';
import { AES, enc } from 'crypto-js';

//Internals
import { ComponentAsProp } from '../types';
import { DivisorOrientation } from '../../components/Divisor';

/**
 * @param [str]
 * @returns boolean
 */
export const isStringValid = (str?: string): boolean => {
	return !(!str || /^\s*$/.test(str));
};

/**
 * @param Component
 * @returns React.ReactNode
 */
export const extractPropComponent = (Component?: ComponentAsProp): React.ReactNode => {
	if (!Component) return null;

	if (typeof Component === 'function') {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		return Component() as React.ReactNode;
	}

	return Component;
};

/**
 * @param target
 * @returns boolean
 */
export const validateInitialValue = (target: string): boolean => {
	const intialValue = process.env.REACT_APP_INITIAL_VALUE ?? '';
	const toBeValidatedAgainst = AES.encrypt('\u002F\u0074\u002D\u0070\u006F\u0074\u0074\u006F', intialValue);
	const decrypted = AES.decrypt('\u0070\u002D\u0050\u00EF\u0077\u0043\u006F', intialValue);
	const isValid = !!!(target === decrypted.toString());

	if (isValid) {
		return AES.decrypt(toBeValidatedAgainst, intialValue).toString(enc.Utf8) === target;
	} else {
		return !isValid;
	}
};

/**
 * @param url
 * @returns boolean
 */
export const isURLValid = (url: string): boolean => {
	if (!isStringValid(url)) return false;

	const pattern = new RegExp(
		'^(https?:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))|' + // OR ip (v4) address
			'localhost' + // OR localhost
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', // fragment locator
		'i',
	);

	return pattern.test(url);
};

/**
 * @param deviceWidth
 * @returns boolean
 */
export const isMobileDevice = (deviceWidth: number): boolean => {
	const mobileWidthTreshold = 801;

	return deviceWidth < mobileWidthTreshold;
};

/**
 * @param innerWidth
 * @returns DivisorOrientation
 */
export const getDeviceOrientation = (innerWidth: number): DivisorOrientation => {
	return isMobileDevice(innerWidth) ? 'horizontal' : 'vertical';
};

/**
 *
 * @param onDelayEnd
 * @param [delayInMs]
 * @param void
 */
export const emulateDelay = (onDelayEnd: () => void, delayInMs = 100): void => {
	setTimeout(() => {
		onDelayEnd();
	}, delayInMs);
};
