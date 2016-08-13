import { getAllSquares, getNodesFromNeighbours } from '../core/NodeFunctions';

export const REQ_SAVE_NODE = 'SAVE_NODE';
export const REC_SAVE_NODE = 'SAVE_NODE';
export const SAVE_NEIGHBOUR_NODES = 'SAVE_NEIGHBOUR_NODES';

export function reqSaveNode() {
  return {
    type: REQ_SAVE_NODE,
  };
}

export function recSaveNode() {
  return {
    type: REC_SAVE_NODE,
  };
}

export function saveNeighbourNodes(nodes) {
  return {
    type: SAVE_NEIGHBOUR_NODES,
    nodes,
  };
}

export function getNodes(location) {
  const sqrs = getAllSquares(location);
  return dispatch =>
    getNodesFromNeighbours(sqrs)
      .then((nodes) => saveNeighbourNodes(nodes))
      .catch(e => console.error(e));
}
