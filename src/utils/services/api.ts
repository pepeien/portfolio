import { isURLValid } from '.';
import { ApiResponse } from '../interfaces';

export function fetchFromApi<T>(
    path = '',
    method = 'GET',
    body?: BodyInit,
): Promise<ApiResponse<T>> {
    return new Promise((resolve, reject) => {
        if (!process.env.REACT_APP_API_URL || isURLValid(process.env.REACT_APP_API_URL) === false) {
            reject();
        }
        const hostURL = process.env.REACT_APP_API_URL ?? '';

        const url = new URL(`${removeExtraSlashes(hostURL)}/${removeExtraSlashes(path)}`);

        fetch(removeExtraSlashes(url.href), {
            method: method,
            body: body,
        })
            .then((response) => {
                if (!response.ok) {
                    resolve({
                        wasSuccessful: false,
                        result: undefined,
                    });
                }

                return response.json();
            })
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            .then((data) => data as ApiResponse<T>)
            .then((data) => {
                resolve({
                    wasSuccessful: data.wasSuccessful,
                    result: data.result,
                });
            })
            .catch((error) => reject(error));
    });
}

const removeExtraSlashes = (target: string): string => {
    return target.replace(/^[\\/]+|[\\/]+$/g, '');
};
