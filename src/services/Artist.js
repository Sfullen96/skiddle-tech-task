import camelCaseKeys from 'camelcase-keys-recursive';

import { Endpoints } from '../constants';
import { getRequest } from '../helpers';

/**
 * @function getArtist
 *
 * Fetch an artist by its ID
 *
 * @param {number} id
 */
const getArtist = async id => {
  try {
    const { data } = await getRequest(Endpoints.GET_ARTIST, { id });
    const { results } = data;
    return camelCaseKeys(results);
  } catch (e) {
    return e;
  }
};

export default getArtist;
