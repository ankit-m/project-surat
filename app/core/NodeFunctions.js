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
  const xValue = parseFloat((Math.floor(lat/SQUARE_SIDE) * SQUARE_SIDE).toPrecision(12));
  const yValue = parseFloat((Math.floor(long/SQUARE_SIDE) * SQUARE_SIDE).toPrecision(12));
  return [xValue, yValue];
}

export function deleteNode(nodeCoords) {
  const squareId = getSquareCoords(...nodeCoords);
  firebase.database().ref(`main/${squareId}/${coordsToId(nodeCoords)}`).remove();
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
