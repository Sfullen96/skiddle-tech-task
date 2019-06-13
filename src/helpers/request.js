import Axios from 'axios';

const { REACT_APP_API_KEY: apiKey } = process.env;

export const getRequest = async (url, params = {}) => {
  try {
    const parameters = {
      ...params,
      api_key: apiKey,
    };

    return await Axios({
      method: 'get',
      url,
      params: parameters,
    });
  } catch (error) {
    throw error;
  }
};
