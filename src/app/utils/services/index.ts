//Externals
import { AES, enc } from 'crypto-js';
import { v4 as uuidV4 } from 'uuid';

//Internals
import { DeviceOrientation } from '../interfaces';

/**
 * @param [str]
 * @returns boolean
 */
export const isStringValid = (str?: string): boolean => {
    return !(!str || /^\s*$/.test(str));
};

/**
 * @param target
 * @returns boolean
 */
export const validateInitialValue = (target: string): boolean => {
    const intialValue = process.env.INITIAL_VALUE ?? '';
    const toBeValidatedAgainst = AES.encrypt(
        '\u002F\u0074\u002D\u0070\u006F\u0074\u0074\u006F',
        intialValue,
    );
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
export const isMobileView = (deviceWidth: number): boolean => {
    const mobileWidthTreshold = 801;

    return deviceWidth <= mobileWidthTreshold;
};

/**
 * @param innerWidth
 * @returns DivisorOrientation
 */
export const getDeviceOrientation = (innerWidth: number): DeviceOrientation => {
    return isMobileView(innerWidth) ? 'horizontal' : 'vertical';
};

/**
 *
 * @param onDelayEnd
 * @param [delayInMs]
 * @returns void
 */
export const emulateDelay = (onDelayEnd: () => void, delayInMs = 100): void => {
    setTimeout(() => {
        onDelayEnd();
    }, delayInMs);
};

/**
 *
 * @returns string
 */
export const getUniqueKey = (): string => {
    const uniqueKey = uuidV4();

    return uniqueKey;
};

/**
 *
 * @param path
 * @returns string
 */
export const formatPathname = (path: string): string => {
    if (path[path.length - 1] === '/') {
        return path;
    }

    return path + '/';
};

/**
 *
 * @param target
 * @returns string
 */
export const firstToUpperCase = (target: string): string => {
    if (target.length === 1) {
        return target.toUpperCase();
    }

    return target.charAt(0).toUpperCase() + target.slice(1);
};
