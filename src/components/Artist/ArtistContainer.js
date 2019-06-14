import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './Artist.scss';

import Loader from '../Loader/Loader';
import { getArtist as getArtistService } from '../../services';
import ArtistDetails from './ArtistDetails';

const ArtistContainer = ({
  match: {
    params: { id },
  },
}) => {
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    const getArtist = async _id => {
      const data = await getArtistService(_id);
      setArtist(data);
    };
    getArtist(id);
  }, [id]);

  if (!artist) {
    return <Loader />;
  }

  const { name, imageurl, twitter, description, spotifymp3url } = artist;

  return (
    <ArtistDetails
      name={name}
      image={imageurl}
      twitter={twitter}
      description={description}
      audioPreview={spotifymp3url}
    />
  );
};

ArtistContainer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(ArtistContainer);
