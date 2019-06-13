import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import './Search.scss';

import { search } from '../../services';
import Search from './Search';
import SearchResults from './SearchResults';

/**
 * SearchContainer
 *
 * A component which encompasses the search field and the search results
 * components, and controls all the stateful logic
 */
const SearchContainer = () => {
  // Declare our initial state variables using the 'useState' hook
  const [isFetching, setIsFetching] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [totalResults, setTotalResults] = useState(null);
  const [redirect, setRedirect] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const resultsPerPage = 20;

  // If state contains a redirect, send them to it
  // the 'push' prop pushes to history to allow backwards
  // navigation in browser
  if (redirect) {
    return <Redirect to={redirect} push />;
  }

  /**
   * @function doSearch
   *
   * The actual search function, handles the search and the setting
   * of results in state.
   *
   * @param {String} keyword - The user-typed search term itself
   * @param {Number} nextPage - The next page, used to calculate offset
   */
  const doSearch = async (keyword, nextPage) => {
    // Set the loading state
    setIsFetching(true);
    // Keep the search term in state to be used in displaying e.g.
    // Found 10 results for "{searchTerm}"
    setSearchTerm(keyword);

    // Calculate the offset, defaulting to 0
    let offset = 0;
    if (nextPage) {
      offset = (nextPage - 1) * resultsPerPage;
    }

    // Actually fetch the data
    const { error, results, totalCount } = await search(keyword, offset);

    // ToDo: Improve error handling with a message
    if (error) {
      setIsFetching(false);
      setSearchResults([]);
      return;
    }

    // Set the results in state
    setTotalPages(Math.ceil(totalCount / resultsPerPage));
    setSearchResults(results);
    setTotalResults(totalCount);
    setIsFetching(false);
  };

  /**
   * @function handleDropdownOptionSelection
   *
   * Handle a selection being chosen from the dropdown to
   * redirect them to the event they clicked
   * @param {Number} eventId - The event ID
   */
  const handleDropdownOptionSelection = eventId => {
    setRedirect(`/event/${eventId}`);
  };

  /**
   * @function onSubmit
   *
   * Triggered when a user presses the maginfying glass button, at this point
   * there are already search results in state so we simply need to allow them
   * to be shown by setting a variable in state
   * @param {*} e - The event
   */
  const onSubmit = e => {
    e.preventDefault();
    setShowResults(true);
  };

  /**
   * @function changePage
   *
   * Handle changing page, either backwards or forwards
   * @param {*} current - The current page
   */
  const changePage = async current => doSearch(searchTerm, parseInt(current.selected + 1, 10));

  /**
   * @function onKeyDown
   *
   * Check if the user presses the enter key (code 13). <AsyncTypeahead /> provides no way
   * to submit the form on enter, and as we want the form to be submitted and the main results
   * shown under the search field on enter press we need this workaround
   * @param {*} e - The event
   * @param {*} typeahead - The ref to the typeahead component
   */
  const onKeyDown = async (e, typeahead) => {
    if (e.keyCode === 13) {
      setSearchTerm(e.target.value);
      doSearch(e.target.value);
      // Manually blur the input
      typeahead.current.getInstance().blur();
      // Show the main results
      setShowResults(true);
    }
  };

  return (
    <div className="search">
      <Search
        doSearch={doSearch}
        isFetching={isFetching}
        searchResults={searchResults}
        searchTerm={searchTerm}
        totalPages={totalPages}
        totalResults={totalResults}
        showResults={showResults}
        resultsPerPage={20}
        handleDropdownOptionSelection={handleDropdownOptionSelection}
        onSubmit={onSubmit}
        onKeyDown={onKeyDown}
      />
      {showResults && (
        <SearchResults
          searchResults={searchResults}
          searchTerm={searchTerm}
          totalPages={totalPages}
          totalResults={totalResults}
          changePage={changePage}
          isFetching={isFetching}
        />
      )}
    </div>
  );
};

export default SearchContainer;
