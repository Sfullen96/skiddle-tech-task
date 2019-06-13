import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { Container, Row, Col } from 'react-bootstrap';

import { Loader } from '..';

import SearchResult from './SearchResult';

/**
 * SearchResults
 *
 * The component that displays the main search results, hidden until a user
 * submits the form via the search button or pressing enter when focused on the
 * input
 */
const SearchResults = ({
  searchResults,
  searchTerm,
  totalPages,
  totalResults,
  changePage,
  isFetching,
}) => (
  <Container className="search__results">
    {isFetching && <Loader />}
    {!searchResults.length ? (
      <h2>There are no results for &quot;{searchTerm}&quot;</h2>
    ) : (
      <>
        <h2 className="mb-4">
          Found {totalResults} results for &quot;{searchTerm}&quot;
        </h2>
        <Row>
          {searchResults.map(result => (
            <Col xs="12" sm="6" md="4" className="search__results--result" key={result.id}>
              <SearchResult
                image={result.largeimageurl}
                venue={result.venue}
                id={result.id}
                name={result.eventname}
                date={result.date}
              />
            </Col>
          ))}
        </Row>
        <Row>
          <ReactPaginate
            previousLabel="previous"
            nextLabel="next"
            breakLabel="..."
            breakClassName="break"
            pageCount={totalPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={changePage}
            containerClassName="pagination"
            subContainerClassName="pages pagination"
            activeClassName="active"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            nextClassName="page-item"
            previousLinkClassName="page-link"
            nextLinkClassName="page-link"
          />
        </Row>
      </>
    )}
  </Container>
);

SearchResults.defaultProps = {
  searchResults: [],
  searchTerm: null,
  totalPages: null,
  totalResults: null,
  isFetching: false,
};

SearchResults.propTypes = {
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      error: PropTypes.bool,
      pageCount: PropTypes.number,
      results: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          largeimageurl: PropTypes.string,
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
  searchTerm: PropTypes.string,
  totalPages: PropTypes.number,
  totalResults: PropTypes.number,
  changePage: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

export default SearchResults;
