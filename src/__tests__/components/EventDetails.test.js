import React from 'react';
import { shallow } from 'enzyme';

import { EventDetails } from '../../components';

describe('<EventDetails />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<EventDetails />);
  });

  it('should render without crashing', () => {
    expect(wrapper.find('div.event').length).toEqual(1);
  });
});
