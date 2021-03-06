import React, { useReducer, useEffect } from 'react';
import '../../App.sass';
import Search from './Search';
import BusinessList from '../Business/BusinessList';

const initialState = {
  loading: true,
  businesses: [],
  errorMessage: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_BUSINESSES_REQUEST':
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case 'SEARCH_BUSINESSES_SUCCESS':
      return {
        ...state,
        loading: false,
        businesses: action.payload
      };
    case 'SEARCH_BUSINESSES_FAILURE':
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

const SearchRoot = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const search = searchValue => {
    dispatch({
      type: 'SEARCH_BUSINESSES_REQUEST'
    });

    fetch(`${process.env.REACT_APP_BACKEND_URL}search?query=${searchValue}`)
      .then(response => response.json())
      .then(jsonResponse => {
        console.log(jsonResponse);
        if (jsonResponse[0].length || jsonResponse[1].length) {
          dispatch({
            type: 'SEARCH_BUSINESSES_SUCCESS',
            payload: jsonResponse[0].concat(jsonResponse[1])
          });
        } else {
          dispatch({
            type: 'SEARCH_BUSINESSES_FAILURE',
            error: jsonResponse.Error
          });
        }
      });
  };

  let displayResults = () => {
    console.log(businesses);
    if (businesses.length > 0) {
      return (
        // Todo update classnames to "businesses"
        <div>
          {loading && !errorMessage ? (
            // <span>loading... </span>
            <p></p>
          ) : errorMessage ? (
            <div className="errorMessage">{errorMessage}</div>
          ) : (
            <BusinessList businesses={businesses} />
          )}
        </div>
      );
    } else {
      return;
    }
  };

  const { businesses, errorMessage, loading } = state;

  return (
    <div className="App">
      <Search search={search} />
      {displayResults()}
    </div>
  );
};

export default SearchRoot;
