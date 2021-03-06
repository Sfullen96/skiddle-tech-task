import camelCaseKeys from 'camelcase-keys-recursive';

import { Endpoints } from '../constants';
import { getRequest } from '../helpers';

/**
 * @function getEvent
 *
 * Fetch an event by its ID
 *
 * @param {number} id
 */
const getEvent = async id => {
  try {
    const { data } = await getRequest(Endpoints.GET_EVENT, { id });
    const { results } = data;
    return camelCaseKeys(results);
  } catch (e) {
    return e;
  }
};

export default getEvent;
