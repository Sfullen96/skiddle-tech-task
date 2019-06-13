import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Figure } from 'react-bootstrap';
import moment from 'moment';

import './EventDetails.scss';

import { Loader } from '..';
import { getEvent as getEventService } from '../../services';

const EventDetails = ({
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
  } = event;

  return (
    <Container className="event">
      <Row>
        <Col xs="12" sm="3" className="event__image-container">
          <img
            src={largeimageurl}
            alt={`${eventname}`}
            className="figure-img img-fluid img-thumbnail event__image"
          />
        </Col>
        <Col xs="12" sm="9" className="event__main-info">
          <h1 className="event__title">{eventname}</h1>
          <p className="event__date">
            <i className="fa fa-calendar-alt" /> {moment(date).format('dddd Do MMMM YYYY')}
          </p>
          <p className="event__venue">
            <i className="fa fa-map-marker-alt" /> {venue.name}, {venue.town}
          </p>
          <p className="event__time">
            <i className="fa fa-clock" /> {moment(dateStart).format('H:mma')} -{' '}
            {moment(dateEnd).format('H:mma')}
          </p>
          <p className="event__age-limit">
            <i className="fa fa-user" />{' '}
            {MinAge === '0' ? 'No Age Restrictions' : `Minimum Age ${MinAge}`}
          </p>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h2 className="event__more-info">More Information</h2>
          <p className="event__description">{description}</p>
          <h3 className="event__price-heading">Entry Prices</h3>
          <p className="event__price">{entryprice}</p>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h2 className="event__artists-header">Artists</h2>
          {!artists.length
            ? 'This is not a musical event'
            : artists.map(artist => (
                <Figure>
                  <Figure.Image src={artist.image} thumbnail />
                  <Figure.Caption>{artist.name}</Figure.Caption>
                </Figure>
              ))}
        </Col>
      </Row>
    </Container>
  );
};

EventDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(EventDetails);
