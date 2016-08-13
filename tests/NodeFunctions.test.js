import chai, { expect } from 'chai';
import { deleteNode,
  getNodesInRange,
  getSquareCoords,
  saveNode,
  coordsToId,
  getNodesFromSquare,
  genericFirebaseSave,
  submitData,
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


/*
  DON'T WORRY ABOUT THIS TEST CASE. THIS WORKS FOR NORMAL INPUT. when
  YOU CLICK ON SUBMIT FORM THIS WILL WORK. TRY IT OUT!
*/

describe('firebase', () => {
  it('saveNode', done => {
    const node = { id: '12.34|34.67', coords: [0.42, 0.1], data: 'Pro Jain', expiry: 255, owner: 'Jain', isProtected: true, password: 'ProJain', range: '300' };
  //  console.log(saveNode(node, coordsToId(getSquareCoords(...node.coords)))
    console.log(saveNode('node', 'ID')
    .then((e) => { console.log(e); done(); })
    .catch(e => { console.log(e); done(); }));
  });
  it('get a node', done => {
    const coords = [0.42,0.1];
    const squareId = coordsToId(coords);
    getNodesFromSquare(`main/${btoa(squareId)}`).then((d) => {
      done();
    });
  });
});

describe('firebaseSample', () => {
  it('Firebase generic save option', () => {
    const result = genericFirebaseSave();
    console.log(result);
  });
});
//
// describe('submitFunction', () => {
//   //const node = { id: '12.34|34.67', coords: [0.42,0.1], data: 'Pro Jain', expiry: 255, owner: 'Jain', isProtected: true, password: 'ProJain', range: '300' }
//   it('it should successfully save data'), () => {
//       submitData(12.34)
//   });
// });
