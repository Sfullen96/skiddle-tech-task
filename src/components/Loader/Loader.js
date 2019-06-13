import React from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { Row } from 'react-bootstrap';

const Loader = () => (
  <Row className="loader">
    <ScaleLoader loading />
  </Row>
);

export default Loader;
