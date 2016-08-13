import chai, { expect } from 'chai';
import { deleteNode,
  getNodesInRange,
  getSquareCoords,
  saveNode,
  coordsToId,
  getNodesFromSquare,
  genericFirebaseSave,
} from '../app/core/NodeFunctions';

describe('getNodesInRange', () => {
  const geoLocation = [8.003, 7.4121];

  it('should have a correct square', () => {
    const squareCoords = getSquareCoords(...geoLocation);
    expect(squareCoords).to.deep.equal([8, 7.412]);
  });

  it('should correctly get nodeInRange', () => {
    const nodes = [
      {
        coords: [0.42, 0.1],
      },
      {
        coords: [0, 7.4121],
      },
      {
        coords: [8.00452, 7.412092],
      },
      {
        coords: [8.0062, 7.412092],
      },

    ];
    const filteredNodes = getNodesInRange(0.0032, nodes, geoLocation);

    expect(filteredNodes).to.deep.equal([
      {
        coords: [8.00452, 7.412092],
      },
    ]);
  });
});
//
// describe('firebase', () => {
//   it('saveNode', done => {
//     const node = { id: '0.42|0.1', coords: [0.42, 0.1], title: 'test data' };
//     console.log(saveNode(node, coordsToId(getSquareCoords(...node.coords)))
//     .then((e) => { console.log(e); done(); })
//     .catch(e => { console.log(e); done(); }));
//   });
// //   // it('gets node', done => {
// //   //   getNodesFromSquare('check').then((d) => {
// //   //     // console.log();
// //   //     console.log(d);
// //   //     done();
// //   //   });
// //   // });
// });

describe('firebaseSample', () => {
  it('Firebase generic save option', () => {
    const result = genericFirebaseSave();
    console.log(result);
  });
});
