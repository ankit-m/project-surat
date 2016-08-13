import { SUCCESS_POSITION } from './location.actions';

const initialState = {
  coords: null,
};
export default function location(state = initialState, action) {
  switch (action.type) {
    case SUCCESS_POSITION:
      return {
        ...state,
        coords: action.coords,
      };
    default:
      return state;
  }
}
