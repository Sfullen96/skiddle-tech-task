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

  it('should contain 4 route components', () => {
    expect(wrapper.find('Route').length).toEqual(4);
  });

  it('should contain the correct routes', () => {
    const expectedRoutes = ['/', '/search', '/event/:id', '/artist/:id'];
    wrapper.find('Route').forEach(route => {
      expect(expectedRoutes.indexOf(route.props().path) !== -1).toEqual(true);
    });
  });
});
