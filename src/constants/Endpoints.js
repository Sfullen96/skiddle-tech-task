const { REACT_APP_API_URL: apiUrl } = process.env;

const Endpoints = {
  SEARCH: `${apiUrl}events/search`,
  GET_EVENT: `${apiUrl}events/$id`,
};

export default Endpoints;
