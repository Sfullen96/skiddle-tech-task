import React from 'react';
import PropTypes from 'prop-types';
import { Figure, Button } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';

/**
 * SearchResult
 *
 * The individual search result tile
 */
const SearchResult = ({ image, venue, id, name, date }) => (
  <Figure>
    <div className="figure-image-container">
      <Figure.Image width="100%" height="220" src={image} thumbnail />
    </div>
    <div className="figure-caption-container">
      <Figure.Caption>
        <p className="event-name">{name}</p>
        <p className="event-info">
          {moment(date).format('DD/MM/YYYY')} @ {venue.name}, {venue.town}
        </p>
      </Figure.Caption>
    </div>
    <div className="event-more-info-container">
      <hr />
      <Link to={`/event/${id}`}>
        <Button variant="outline-dark" type="button">
          More Info <i className="fa fa-chevron-right" />
        </Button>
      </Link>
    </div>
  </Figure>
);

SearchResult.propTypes = {
  image: PropTypes.string.isRequired,
  venue: PropTypes.shape({
    name: PropTypes.string,
    town: PropTypes.string,
  }).isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default SearchResult;
