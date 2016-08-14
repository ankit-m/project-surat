import { getAllSquares, getNodesFromNeighbours, deleteNode, submitData } from '../core/NodeFunctions';

export const REQ_SAVE_NODE = 'SAVE_NODE';
export const REC_SAVE_NODE = 'SAVE_NODE';
export const SAVE_NEIGHBOUR_NODES = 'SAVE_NEIGHBOUR_NODES';
export const DELETE_NODE = 'DELETE_NODE';
export const SET_SQUARES = 'SET_SQUARES';

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

function deleteNodeRec() {
  return {
    type: DELETE_NODE,
  };
}

function saveNeighbourNodes(nodes) {
  return {
    type: SAVE_NEIGHBOUR_NODES,
    nodes,
  };
}

function setSquares(squares) {
  return {
    type: SET_SQUARES,
    squares,
  };
}
export function removeNode(nodeCoords) {
  return (dispatch) =>
    deleteNode(nodeCoords)
    .then(() => dispatch(deleteNodeRec()))
    .catch((e) => console.error(e));
}

export function saveNode(nodeObj) {
  return dispatch => {
    dispatch(reqSaveNode());
    submitData(nodeObj)
      .then(() => dispatch(recSaveNode()))
      .catch(e => console.error(e));
  };
}
export function getNodes(location) {
  console.log(location);
  const sqrs = getAllSquares(location);
  console.log(sqrs);

  return dispatch => {
    dispatch(setSquares(sqrs));
    getNodesFromNeighbours(sqrs)
      .then((nodes) => dispatch(saveNeighbourNodes(nodes)))
      .catch(e => console.error(e));
  };
}
