import Axios from 'axios';

const { REACT_APP_API_KEY: apiKey } = process.env;

export const getRequest = async (url, params = {}, queryStringParams = {}) => {
  try {
    let requestUrl = url;

    if (url.includes('$')) {
      const paramKeys = Object.keys(params);
      paramKeys.forEach(param => {
        requestUrl = url.replace(`$${param}`, params[param]);
      });
    }

    const parameters = {
      ...queryStringParams,
      api_key: apiKey,
    };

    return await Axios({
      method: 'get',
      url: requestUrl,
      params: parameters,
    });
  } catch (error) {
    throw error;
  }
};
