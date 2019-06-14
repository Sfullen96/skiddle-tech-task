import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';

import './Artist.scss';

const ArtistDetails = ({ name, image, twitter, description, audioPreview }) => (
  <Container className="artist">
    <Row>
      <Col xs="12" sm="3" className="event__image-container">
        <img
          src={image}
          alt={`${name}`}
          className="figure-img img-fluid img-thumbnail artist__image"
        />
      </Col>
      <Col xs="12" sm="9" className="event__main-info">
        <Row>
          <Col xs="12" md="8">
            <h1 className="artist__name">{name}</h1>
            {twitter && (
              <p className="artist__twitter">
                <i className="fab fa-twitter" />{' '}
                <a
                  href={`https://twitter.com/${twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`https://twitter.com/${twitter}`}
                </a>
              </p>
            )}
          </Col>
          <Col xs="12" md="4">
            {/* disable the warning about not having a <track /> as one was not provided for this test */}
            {/* eslint-disable-next-line */}
            <audio controls className="artist__preview">
              <source src={audioPreview} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </Col>
        </Row>
        <div className="artist__description">
          <p>{description}</p>
        </div>
      </Col>
    </Row>
  </Container>
);

ArtistDetails.defaultProps = {
  twitter: null,
};

ArtistDetails.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  twitter: PropTypes.string,
  description: PropTypes.string.isRequired,
  audioPreview: PropTypes.string.isRequired,
};

export default ArtistDetails;
