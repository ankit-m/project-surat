import { SAVE_NEIGHBOUR_NODES } from './node.actions';

export default function node(state = {}, action) {
  switch (action.type) {
    case SAVE_NEIGHBOUR_NODES:
      return {
        ...state,
        nearByNodes: action.nodes,
      };
    default:
      return state;
  }
}
