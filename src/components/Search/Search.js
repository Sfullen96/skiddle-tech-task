import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import { Form, Button } from 'react-bootstrap';
import moment from 'moment';

import './Search.scss';
import logo from '../../images/skiddle-logo-white-stacked.png';

/**
 * Search
 *
 * The component that contains the search box. Uses module react-bootstrap-typeahead
 * (https://github.com/ericgio/react-bootstrap-typeahead) to provide async searching of
 * the API, as well as debouncing.
 */
const Search = ({
  doSearch,
  isFetching,
  searchResults,
  handleDropdownOptionSelection,
  onSubmit,
  onKeyDown,
}) => {
  // Generate a ref to the typeahead comp so we can explicitly blur
  // when the enter key is pressed - see 'onKeyDown' func in SearchContainer.js
  const typeahead = useRef(null);

  /**
   * @function generateMenuItem
   *
   * Generate a custom dropdown list item
   * @param {Object} option
   */
  const generateMenuItem = option => (
    <div className="search__input-container--menu-item">
      <p className="mb-0">
        <strong>{option.eventname}</strong>
      </p>
      <p>
        <small>
          {moment(option.date).format('DD/MM/YYYY')} @ {option.venue.name}, {option.venue.town}
        </small>
      </p>
    </div>
  );

  return (
    <div className="search__search-bar-container mb-4">
      <div className="search__overlay" />
      <div className="search__input-container">
        <img src={logo} alt="Skiddle Logo" className="search__input-container--logo" />
        <Form onSubmit={onSubmit}>
          <AsyncTypeahead
            onSearch={e => doSearch(e)}
            className="search__input-container--input"
            isLoading={isFetching}
            options={searchResults}
            // Must have typed 3 characters before attempting search
            // to avoid too many results
            minLength={3}
            onChange={option => handleDropdownOptionSelection(option.id)}
            placeholder="Search for Events..."
            id="search"
            delay={500} // How long after typing has stopped before searching
            labelKey={option =>
              `${option.eventname} - ${moment(option.date).format('DD/MM/YYYY')} @${
                option.venue.name
              }, ${option.venue.town}`
            }
            maxResults={5}
            renderMenuItemChildren={option => generateMenuItem(option)}
            onKeyDown={e => onKeyDown(e, typeahead)}
            ref={typeahead}
          />
          <Button variant="outline-light" type="submit" className="search__input-container--submit">
            <i className="fa fa-search" />
          </Button>
        </Form>
      </div>
    </div>
  );
};

Search.defaultProps = {
  searchResults: [],
};

Search.propTypes = {
  doSearch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      error: PropTypes.bool,
      pageCount: PropTypes.number,
      results: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          date: PropTypes.string,
          venue: PropTypes.shape({
            name: PropTypes.string,
            town: PropTypes.string,
          }),
          eventname: PropTypes.string,
        }),
      ),
      totalCount: PropTypes.number,
    }),
  ),
  handleDropdownOptionSelection: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
};

export default Search;
