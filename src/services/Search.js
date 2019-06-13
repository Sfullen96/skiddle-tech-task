import camelCaseKeys from 'camelcase-keys-recursive';

import { Endpoints } from '../constants';
import { getRequest } from '../helpers';

/**
 * @function search
 *
 * The function which calls the Skiddle API to fetch event data based
 * on a keyword and offset
 *
 * @param {string} keyword - The search term
 * @param {number} offset - Used to paginate results
 */
const search = async (keyword, offset = 0) => {
  try {
    const { data } = await getRequest(Endpoints.SEARCH, {}, { keyword, offset });
    const { error, pagecount, results, totalcount } = data;
    return camelCaseKeys({
      error,
      pageCount: pagecount,
      results,
      totalCount: parseInt(totalcount, 10),
    });
  } catch (e) {
    return e;
  }
};

export default search;
