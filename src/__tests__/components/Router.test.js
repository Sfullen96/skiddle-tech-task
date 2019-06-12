import React from 'react';
import { shallow } from 'enzyme';

import Router from '../../Router';

describe('<Router />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Router />);
  });

  it('should render without crashing', () => {
    expect(wrapper.find('Switch').length).toEqual(1);
  });

  it('should contain 1 route component', () => {
    expect(wrapper.find('Route').length).toEqual(1);
  });
});
