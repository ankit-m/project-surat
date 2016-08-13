// import { FIREBASE_URL } from '../Const';

export function createNode(id, title, expiry, owner, isProtected, password, range) {
  const node = {
    id,
    title,
    expiry,
    owner,
    isProtected,
    password,
    range,
  };
  return node;
}

export function deleteNode(id) {

}

export function getNodesFromSquare(square) {

}

export function getAllSquares(geoLocation) {

}

export function getNodesFromNeighbours(squares) {

}

export function saveNode(node, square) {

}

export function getNodesInRange(radius, nodes, geoLocation) {

}
