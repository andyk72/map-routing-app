import initialState from '../initialState';
import * as actionTypes from '../actions/actionTypes';
import { geolocationCoordinatesToObject } from '../../data/geolocationFormatter';

const geolocation = (state = initialState.geolocation, action) => {
    console.log('action = ', action);
    switch (action.type) {
      case actionTypes.GEOLOCATION_COORDS_REGISTER:
        return {
            ...state,
            coords: geolocationCoordinatesToObject(action.coords)
        };
      default:
        return state;
    }
  }
  
  export default geolocation;