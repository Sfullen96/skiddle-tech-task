import React from 'react';
import { shallow } from 'enzyme';

import ArtistDetails from '../../components/Artist/ArtistDetails';

describe('<ArtistDetails />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ArtistDetails
        name="Courteeners"
        image="testimage.png"
        description="test"
        audioPreview="audio.mp3"
      />,
    );
  });

  it('should match the snaphot', () => expect(wrapper).toMatchSnapshot());

  it('should render without crashing', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });

  it('should render the artist name', () => {
    expect(wrapper.find('.artist__name').text()).toEqual('Courteeners');
  });

  it('should render the image of the artist, and it should have an appropriate alt', () => {
    wrapper.setProps({ image: 'testimage.png', name: 'Test Artist' });
    expect(wrapper.find('.artist__image').props().src).toEqual('testimage.png');
    expect(wrapper.find('.artist__image').props().alt).toEqual('Test Artist');
  });

  it('should not render a twitter link if the prop is not available', () => {
    wrapper.setProps({ twitter: null });
    expect(wrapper.find('artist__twitter').length).toEqual(0);
  });

  it('should render a twitter link', () => {
    wrapper.setProps({ twitter: 'thecourteeners' });
    expect(wrapper.find('.artist__twitter').containsAllMatchingElements([<p />, <a />, <i />]));
    expect(
      wrapper
        .find('.artist__twitter')
        .find('a')
        .props().href,
    ).toEqual('https://twitter.com/thecourteeners');
    expect(
      wrapper
        .find('.artist__twitter')
        .find('a')
        .text(),
    ).toEqual('https://twitter.com/thecourteeners');
  });

  it('should render the description of the artist', () => {
    expect(wrapper.find('.artist__description p').text()).toEqual('test');
  });

  it('should render an audio preview', () => {
    expect(wrapper.find('.artist__preview source').props().src).toEqual('audio.mp3');
  });
});
