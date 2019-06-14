import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Container, Row, Col, Figure, Badge } from 'react-bootstrap';
import moment from 'moment';

import './EventDetails.scss';

const EventDetails = ({
  image,
  name,
  date,
  venue,
  dateStart,
  dateEnd,
  minAge,
  description,
  entryPrice,
  artists,
  genres,
}) => {
  return (
    <Container className="event">
      <Row>
        <Col xs="12" sm="3" className="event__image-container">
          <img
            src={image}
            alt={`${name}`}
            className="figure-img img-fluid img-thumbnail event__image"
          />
        </Col>
        <Col xs="12" sm="9" className="event__main-info">
          <h1 className="event__title">{name}</h1>
          <p className="event__date">
            <i className="fa fa-calendar-alt" />{' '}
            {moment(date, 'YYYY-MM-DD').format('dddd Do MMMM YYYY')}
          </p>
          <p className="event__venue">
            <i className="fa fa-map-marker-alt" /> {venue.name}, {venue.town}
          </p>
          <p className="event__time">
            <i className="fa fa-clock" /> {moment(dateStart, 'YYYY-MM-DD HH:mm:ss').format('H:mma')}{' '}
            - {moment(dateEnd, 'YYYY-MM-DD HH:mm:ss').format('H:mma')}
          </p>
          <p className="event__age-limit">
            <i className="fa fa-user" />{' '}
            {minAge === '0' ? 'No Age Restrictions' : `Minimum Age ${minAge}`}
          </p>
          {genres && genres.length ? (
            <p className="event__tags">
              <i className="fa fa-tag" />{' '}
              {genres.map(genre => (
                <Badge key={genre.genreid} pill variant="info" className="event__tag">
                  {genre.name}
                </Badge>
              ))}
            </p>
          ) : (
            ''
          )}
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h2 className="event__more-info">More Information</h2>
          <p className="event__description">{description}</p>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h3 className="event__price-heading">Entry Prices</h3>
          <p className="event__price">{entryPrice}</p>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col>
          <h2 className="event__more-info">Where is it?</h2>
          <p className="event__address">
            {venue.name}, {venue.town} {venue.postcode}
          </p>
        </Col>
      </Row>
      <hr />
      <Row className="event__artists">
        <Col>
          <h2 className="event__artists-header">Artists</h2>
          <Row>
            {!artists.length ? (
              <Col>
                <p>This is not a musical event</p>
              </Col>
            ) : (
              artists.map(artist => (
                <Col xs="12" sm="4" md="3" key={artist.artistid}>
                  <Figure className="event__artist">
                    <Figure.Image
                      src={artist.image}
                      thumbnail
                      className="event__artist-image"
                      alt={artist.name}
                    />
                    <Link to={`/artist/${artist.artistid}`}>
                      {' '}
                      <Figure.Caption className="event__artist-name">{artist.name}</Figure.Caption>
                    </Link>
                  </Figure>
                </Col>
              ))
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

EventDetails.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  venue: PropTypes.shape({
    name: PropTypes.string,
    town: PropTypes.string,
    postcode: PropTypes.string,
  }).isRequired,
  dateStart: PropTypes.string.isRequired,
  dateEnd: PropTypes.string.isRequired,
  minAge: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  entryPrice: PropTypes.string.isRequired,
  artists: PropTypes.arrayOf(
    PropTypes.shape({
      artistid: PropTypes.string,
      name: PropTypes.string,
      image: PropTypes.string,
    }),
  ).isRequired,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      genreid: PropTypes.string,
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default withRouter(EventDetails);
