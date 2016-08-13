import React from 'react';
import { shallow, mount } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
chai.use(chaiEnzyme());
// import sinon from 'sinon';
import Sample from '../app/Sample';

describe('<Sample />', () => {
  it('clicking overlay should change state', () => {
    const wrapper = shallow(<Sample />);
    expect(wrapper.find('.magical')).to.have.length(1);
  });
});
