import React from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';

const TOGGLE_BOOK = gql`
  mutation toggleBook($bookId: Int!) {
    toggleBook(bookId: $bookId) @client
  }
`;

export class Book extends React.Component {
  render() {
    const book = this.props.book;
    return (
      <Mutation mutation={TOGGLE_BOOK} variables={{ bookId: book.bookId }}>
      {toggleBook => (
        <div className="card mb-3">
          <div className="card-body">
            <h5 className="cart-title">{book.bookId}, {book.title}</h5>
            <h6 className="card-subtitle text-muted mb-2">by {book.author}</h6>
      
            {/* Ideally should use a separate price component */}
            <div>Costs {book.price}</div>
            <div className="mt-2 d-flex justify-content-between align-items-center">
              <div className="custom-control custom-checkbox">
                <input type="checkbox" value={book.bookId} onClick={toggleBook} className="custom-control-input" id={`selectBook${book.bookId}`} />
                <label className="custom-control-label" htmlFor={`selectBook${book.bookId}`}>Select</label>
              </div>
              <Link to={`book/${book.bookId}`} book={book}>Edit</Link>
            </div>
          </div>
        </div>
      )}
      </Mutation>
    );
  }
}