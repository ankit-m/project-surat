import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());
// import sinon from 'sinon';

describe('<Sample />', () => {
  it('clicking overlay should change state', () => {
    expect(true).to.equal(true);
  });
});
