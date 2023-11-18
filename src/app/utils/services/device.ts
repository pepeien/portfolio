import { DeviceOrientation } from '@utils/interfaces';

const MOBILE_WIDTH_TRESHOLD = 801;

export class DeviceServices {
    public static isMobileView(deviceWidth: number): boolean {
        return deviceWidth <= MOBILE_WIDTH_TRESHOLD;
    }

    public static getOrientation(innerWidth: number): DeviceOrientation {
        return DeviceServices.isMobileView(innerWidth) ? 'horizontal' : 'vertical';
    }
}
