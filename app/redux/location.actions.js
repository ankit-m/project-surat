import { getNodes } from './node.actions';

export const SUCCESS_POSITION = 'SUCCESS_POSITION';
export const ERROR_POSITION = 'ERROR_POSITION';
export function setGeo(position) {
  return {
    type: SUCCESS_POSITION,
    coords: [position.coords.latitude, position.coords.longitude],
  };
}

export function geoSuccess(position) {
  return dispatch => {
    dispatch(setGeo(position));
    dispatch(getNodes([position.coords.latitude, position.coords.longitude]));
  };
}

export function geoError() {
  return {
    type: ERROR_POSITION,
  };
}
