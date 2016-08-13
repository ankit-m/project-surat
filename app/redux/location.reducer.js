import { SAVE_NEIGHBOUR_NODES, REQ_SAVE_NODE } from './node.actions';

export default function location(state = {}, action) {
  switch (action.type) {
    case REQ_SAVE_NODE:
      return {
        ...state,
        lol: 'kushan',
      };
    case SAVE_NEIGHBOUR_NODES:
      return {
        ...state,
        nearByNodes: action.nodes,
      };
    default:
      return state;
  }
}
