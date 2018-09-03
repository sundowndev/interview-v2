"use strict";

/**
 * Position class
 * @constructor
 */
export default function Position() {
    this.latitude = 0;
    this.longitude = 0;

    /**
     * Transform Latitude to DDM
     * @param lat
     * @returns {{decimal: number, minutes: number, direction: string}}
     */
    this.LatToDDM = (lat) => {
        let sDirection = (lat > 0) ? 'N' : 'S';

        let iDecimal = Math.abs(parseInt(lat));
        let iMinutes = Math.abs(parseInt((lat - parseInt(lat)) * 60));

        /*
        return {
            decimal: iDecimal,
            minutes: iMinutes,
            direction: sDirection
        };
         */
        return {
            decimal: iDecimal,
            minutes: iMinutes,
            direction: sDirection
        };
    };

    /**
     * Check position
     * @param geo
     * @param circle
     * @returns {boolean}
     */
    this.CheckPos = (geo, circle) => {
        const DDM = this.LatToDDM(geo.lat);

        switch (circle) {
            case 'eq':
                return (DDM.decimal === 0);

            case 'cancer':
                return (DDM.decimal === 23 && DDM.minutes === 26 && DDM.direction === 'N');

            case 'cap':
                return (DDM.decimal === 23 && DDM.minutes === 26 && DDM.direction === 'S');

            case 'artic':
                return (DDM.decimal === 66 && DDM.minutes === 33 && DDM.direction === 'N');

            case 'antartic':
                return (DDM.decimal === 66 && DDM.minutes === 33 && DDM.direction === 'S');

            default:
                return false;
        }
    };
}