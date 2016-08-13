import { expect } from 'chai';
import { listFeatures } from '../app/redux/dataSet.actions';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

const DATASET_ID = 'cio5g309a004eusknialll02g';

describe('async intranet actions', () => {

  //   const expectedActions = [
  //     { type: 'REQUEST_INTRANET_TREE' },
  //     { type: 'RECEIVE_INTRANET_TREE',
  //       tree: { Academic: {}, Lecture: {} },
  //       timeStamp: 'NaN hours ' },
  //  ];

  const store = mockStore({ reducer: { dataSet: {} } });
  const receiveFC = sinon.spy();
  listFeatures(DATASET_ID, store.dispatch, null, receiveFC);

  it('should call receiveFC', () => {
    expect(receiveFC.calledOnce).to.be.true;
  });
  // store.dispatch(
  //    getFeatureCollection())
  //      .then(() => { // return of async actions
  //        console.log(store.getActions());
  //       //  expect(store.getActions()));
  //      })
      //  .then(done) // test passed
      //  .catch(done); // test failed
});
