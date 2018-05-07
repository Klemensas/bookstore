import React from 'react';
import { Link } from 'react-router-dom';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { BookList } from '../components/BookList';
import { ErrorAlert } from '../components/ErrorAlert';

const GET_BOOKS = gql`
  {
    books {
      bookId,
      author,
      title,
      price,
      selected @client
    }
  }
`;

export const BookListPage = () => (
  <Query query={GET_BOOKS}>
    {({ loading, error, data }) => {
      return (
        <div>
          <div className="mb-2 d-flex justify-content-between">
            <strong>Currently available books</strong>
            <Link to='/book/create'>Add a new book</Link>
          </div>
          {loading ? <div>loading...</div> : null}
          {error ? <ErrorAlert error={error} /> : null}
          <BookList books={data && data.books ? data.books : []} />
        </div>
      );
    }}
  </Query>
)
