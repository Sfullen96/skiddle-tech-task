import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './EventDetails.scss';

import { Loader } from '..';
import { getEvent as getEventService } from '../../services';
import EventDetails from './EventDetails';

const EventContainer = ({
  match: {
    params: { id },
  },
}) => {
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const getEvent = async _id => {
      const data = await getEventService(_id);
      setEvent(data);
    };
    getEvent(id);
  }, [id]);

  if (!event) {
    return <Loader />;
  }

  const {
    largeimageurl,
    eventname,
    date,
    venue,
    dateStart,
    dateEnd,
    MinAge,
    description,
    entryprice,
    artists,
    genres,
  } = event;

  return (
    <EventDetails
      image={largeimageurl}
      name={eventname}
      date={date}
      venue={venue}
      dateStart={dateStart}
      dateEnd={dateEnd}
      minAge={MinAge}
      description={description}
      entryPrice={entryprice}
      artists={artists}
      genres={genres}
    />
  );
};

EventContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(EventContainer);
