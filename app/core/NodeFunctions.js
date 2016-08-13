import firebase from '../firebase';
import { SQUARE_SIDE } from '../Const';

export function createNode(coords, data, expiry, owner, isProtected, password, range) {
  const node = {
    id: `${coords[0]}|${coords[1]}`,
    coords,
    data,
    expiry,
    owner,
    isProtected,
    password,
    range,
  };
  return node;
}
// id = 'x|y' => [x, y] => [float(x) , float(y)]
export function idToCoords(id) {
  return id.split('|').map((s) => parseFloat(s));
}

export function coordsToId(nodeCoords) {
  return nodeCoords.join('|');
}

function precise(num) {
  // console.log(num);
  return parseFloat(num.toPrecision(12));
}

export function getSquareCoords(lat, long) {
  const xValue = precise((Math.floor(lat/SQUARE_SIDE) * SQUARE_SIDE));
  const yValue = precise(Math.floor(long/SQUARE_SIDE) * SQUARE_SIDE);
  return [xValue, yValue];
}

export function deleteNode(nodeCoords) {
  const squareId = coordsToId(getSquareCoords(...nodeCoords));
  console.log(squareId);
  console.log(btoa(squareId));
  return firebase.database().ref(`main/${btoa(squareId)}/${btoa(coordsToId(nodeCoords))}`).remove();
}

// returns promised { nodeId: node, nodeId: node, ,}
export function getNodesFromSquare(squareCoords) {
  const squareId = coordsToId(squareCoords);
  return firebase.database().ref(`main/${btoa(squareId)}`).once('value')
    .then((snap) => snap.val());
}

export function getAllSquares(geoLocation) {
  const centerSqr = getSquareCoords(...geoLocation);
  const squares = [];
  //  top row
  squares.push([precise(centerSqr[0] - SQUARE_SIDE), precise(centerSqr[1] - SQUARE_SIDE)]);
  squares.push([precise(centerSqr[0] - SQUARE_SIDE), precise(centerSqr[1])]);
  squares.push([precise(centerSqr[0] - SQUARE_SIDE), precise(centerSqr[1] + SQUARE_SIDE)]);

  // center row
  squares.push([precise(centerSqr[0]), precise(centerSqr[1] - SQUARE_SIDE)]);
  squares.push([precise(centerSqr[0]), precise(centerSqr[1])]);
  squares.push([precise(centerSqr[0]), precise(centerSqr[1] + SQUARE_SIDE)]);

  // bottom row
  squares.push([precise(centerSqr[0] + SQUARE_SIDE), precise(centerSqr[1] - SQUARE_SIDE)]);
  squares.push([precise(centerSqr[0] + SQUARE_SIDE), precise(centerSqr[1])]);
  squares.push([precise(centerSqr[0] + SQUARE_SIDE), precise(centerSqr[1] + SQUARE_SIDE)]);

  return squares;
}

export function getNodesFromNeighbours(squareCoordsArray) {
  return Promise.all(squareCoordsArray.map(squareCoords => getNodesFromSquare(squareCoords)))
    // filters and undefined r
    .then(res => res.filter(r => r))
    // at this point res be [ {hash1: node1, hash2, node2} ] -> [ [node1, node2] , [node3, node4] ]
    .then(res => res.map(r => Object.keys(r).map(o => r[o])))
    // flatten [ [r, x], [y, p] ] -> [r, x, y, p]
    .then(res => [].concat(...res));
}

export function saveNode(node, squareId) {
  return firebase.database().ref(`main/${btoa(squareId)}/${btoa(node.id)}`)
    .set(node).then(() => {
      console.log(`main/${btoa(squareId)}/${btoa(node.id)}`);
    });
}

export function getNodesInRange(radius, nodes, geoLocation) {
  return nodes.filter((node) => (
     Math.sqrt(
      Math.pow(node.coords[0] - geoLocation[0], 2)
    + Math.pow(node.coords[1] - geoLocation[1], 2)
    ) <= radius
  ));
}

// coords will be an array of [lat, lng]
export function submitData({ coords, data, expiry, owner, isProtected, password, range }) {
  const node = createNode(coords, data, expiry, owner, isProtected, password, range);
  const squareId = coordsToId(getSquareCoords(coords[0], coords[1]));
  return saveNode(node, squareId);
}
