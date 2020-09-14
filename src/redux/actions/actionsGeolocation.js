import * as actionTypes from './actionTypes';

export const coordsRegister = coords => ({
    type: actionTypes.GEOLOCATION_COORDS_REGISTER,
    coords
});