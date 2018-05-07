import React from 'react';

import { Book } from './Book';

export const BookList = ({ books = [] }) => {
  if (books && books.length) {
    return (
      <div className="row">
        {books.map((book, i) => <div key={i} className="col-sm-6"><Book book={book} /></div>)}
      </div>
    );
  }
  return <div />;
};
