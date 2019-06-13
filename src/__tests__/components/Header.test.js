import React from 'react';
import { shallow } from 'enzyme';

import Header from '../../components/Header/Header';

describe('<Header />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Header.WrappedComponent location={{ pathname: '/testpath' }} />);
  });

  it('should render without crashing', () => {
    expect(wrapper.find('.navbar').length).toEqual(1);
  });

  it('should render nothing if on the search page', () => {
    wrapper.setProps({ location: { pathname: '/' } });
    expect(wrapper.find('.navbar').length).toEqual(0);
  });
});
