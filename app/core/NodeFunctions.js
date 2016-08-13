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

export function getSquareCoords(lat, long) {
  const xValue = Math.floor(lat/SQUARE_SIDE) * SQUARE_SIDE;
  const yValue = Math.floor(long/SQUARE_SIDE) * SQUARE_SIDE;
  return [xValue, yValue];
}

export function deleteNode(nodeCoords) {
  const squareId = getSquareCoords(...nodeCoords);
  firebase.database().ref(`main/${squareId}/${coordsToId(nodeCoords)}`).remove();
}

// returns promised { nodeId: node, nodeId: node, ,}
export function getNodesFromSquare(squareId) {
  return firebase.database().ref(`main/${squareId}`).once('value')
    .then((snap) => snap.val());
}

export function genericFirebaseSave() {
  return firebase.database().ref('main/check').push({
    'Hello': 1,
  }).then((result) => console.log(result));
}

export function getAllSquares(geoLocation) {
  const centerSqr = getSquareCoords(...geoLocation);
  const squares = [];
  //  top row
  squares.push([centerSqr[0] - SQUARE_SIDE, centerSqr[1] - SQUARE_SIDE]);
  squares.push([centerSqr[0] - SQUARE_SIDE, centerSqr[1]]);
  squares.push([centerSqr[0] - SQUARE_SIDE, centerSqr[1] + SQUARE_SIDE]);

  // center row
  squares.push([centerSqr[0], centerSqr[1] - SQUARE_SIDE]);
  squares.push(centerSqr);
  squares.push([centerSqr[0], centerSqr[1] + SQUARE_SIDE]);

  // bottom row
  squares.push([centerSqr[0] + SQUARE_SIDE, centerSqr[1] - SQUARE_SIDE]);
  squares.push([centerSqr[0] + SQUARE_SIDE, centerSqr[1]]);
  squares.push([centerSqr[0] + SQUARE_SIDE, centerSqr[1] + SQUARE_SIDE]);

  return squares;
}

export function getNodesFromNeighbours(squaresIds) {
  return Promise.all(squaresIds.map(squareId => getNodesFromSquare(squareId)));
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
  saveNode(node, squareId);
}
