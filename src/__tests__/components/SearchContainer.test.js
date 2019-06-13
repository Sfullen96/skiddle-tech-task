import React from 'react';
import { shallow, mount } from 'enzyme';

import { SearchContainer } from '../../components';
import Search from '../../components/Search/Search';
import SearchResults from '../../components/Search/SearchResults';

describe('<SearchContainer />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<SearchContainer />);
  });

  it('should match the snapshot', () => expect(wrapper).toMatchSnapshot());

  it('should render without crashing', () => {
    expect(wrapper.find('div.search').length).toEqual(1);
  });

  it('should contain the <Search /> component', () => {
    expect(wrapper.find('Search').length).toEqual(1);
  });
});

describe('Mounted <SearchContainer />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<SearchContainer />);
  });

  it('should contain the <SearchResults /> component once a search is submitted', () => {
    expect(wrapper.find('SearchResults').length).toEqual(0);
    wrapper.find('input.rbt-input').simulate('change', { target: { value: 'Test' } });
    wrapper.find('form').simulate('submit');
    expect(wrapper.find('SearchResults').length).toEqual(1);
  });
});
