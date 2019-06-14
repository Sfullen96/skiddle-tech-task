import React from 'react';
import { shallow } from 'enzyme';

import EventDetails from '../../components/Event/EventDetails';

describe('<EventDetails />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <EventDetails.WrappedComponent
        image="testimage"
        name="Courteeners"
        date="22-06-19"
        venue={{ name: 'Heaton Park', town: 'Manchester', postcode: 'M253EX' }}
        dateStart="22-06-19 10:00:00"
        dateEnd="22-06-19 23:00:00"
        minAge="0"
        description="Description of this event"
        entryPrice="tbc"
        artists={[
          {
            artistid: '1',
            name: 'Courteeners',
            image: 'courteeners.png',
          },
          {
            artistId: '2',
            name: 'James',
            image: 'james.png',
          },
        ]}
        genres={[
          {
            genreid: '1',
            name: 'Indie',
          },
          {
            genreid: '2',
            name: 'Rock',
          },
        ]}
      />,
    );
  });

  it('should match the snaphot', () => expect(wrapper).toMatchSnapshot());

  it('should render without crashing', () => {
    expect(wrapper.find('Container.event').length).toEqual(1);
  });

  it('should render the event name', () => {
    wrapper.setProps({ name: 'Test Name' });
    expect(wrapper.find('.event__title').text()).toEqual('Test Name');
  });

  it('should show the image of the event, and it should have an appropriate alt', () => {
    wrapper.setProps({ image: 'testimage.png', name: 'Test Event' });
    expect(wrapper.find('.event__image').props().src).toEqual('testimage.png');
    expect(wrapper.find('.event__image').props().alt).toEqual('Test Event');
  });

  it('should render the event information, including date, venue, times and age restrictions', () => {
    wrapper.setProps({
      date: '2019-06-15',
      dateStart: '2019-06-15 10:00:00',
      dateEnd: '2019-06-15 23:00:00',
      venue: { name: 'Manchester Arena', town: 'Manchester', postcode: 'M46WG' },
      minAge: '0',
    });
    expect(wrapper.find('.event__date').text()).toEqual(' Saturday 15th June 2019');
    expect(wrapper.find('.event__venue').text()).toEqual(' Manchester Arena, Manchester');
    expect(wrapper.find('.event__time').text()).toEqual(' 10:00am - 23:00pm');
    expect(wrapper.find('.event__age-limit').text()).toEqual(' No Age Restrictions');

    wrapper.setProps({ minAge: '18' });
    expect(wrapper.find('.event__age-limit').text()).toEqual(' Minimum Age 18');
  });

  it('should render the correct tags', () => {
    wrapper.setProps({ genres: [{ genreid: '1', name: 'Indie' }, { genreid: '2', name: 'Rock' }] });
    expect(wrapper.find('.event__tags').find('Badge').length).toEqual(2);
    expect(
      wrapper
        .find('.event__tags')
        .find('Badge')
        .first()
        .text(),
    ).toEqual('Indie');
    expect(
      wrapper
        .find('.event__tags')
        .find('Badge')
        .at(1)
        .text(),
    ).toEqual('Rock');

    wrapper.setProps({ genres: [] });
    expect(wrapper.find('.event__tags').length).toEqual(0);
  });

  it('should render the description', () => {
    expect(wrapper.find('.event__description').text()).toEqual('Description of this event');
  });

  it('should render the entry prices', () => {
    expect(wrapper.find('.event__price').text()).toEqual('tbc');
  });

  it('should render the event address', () => {
    expect(wrapper.find('.event__address').text()).toEqual('Heaton Park, Manchester M253EX');
  });

  it('should not try and render artists if there are none', () => {
    wrapper.setProps({ artists: [] });
    expect(wrapper.find('.event__artist').length).toEqual(0);
    expect(wrapper.find('.event__artists p').text()).toEqual('This is not a musical event');
  });

  it('should render artists', () => {
    expect(
      wrapper
        .find('.event__artist')
        .find('.event__artist-name')
        .first()
        .text(),
    ).toEqual('Courteeners');
    expect(
      wrapper
        .find('.event__artist')
        .find('.event__artist-image')
        .first()
        .props().src,
    ).toEqual('courteeners.png');
    expect(
      wrapper
        .find('.event__artist')
        .find('.event__artist-image')
        .first()
        .props().alt,
    ).toEqual('Courteeners');

    expect(
      wrapper
        .find('.event__artist')
        .find('.event__artist-name')
        .at(1)
        .text(),
    ).toEqual('James');
    expect(
      wrapper
        .find('.event__artist')
        .find('.event__artist-image')
        .at(1)
        .props().src,
    ).toEqual('james.png');
    expect(
      wrapper
        .find('.event__artist')
        .find('.event__artist-image')
        .at(1)
        .props().alt,
    ).toEqual('James');
  });
});
