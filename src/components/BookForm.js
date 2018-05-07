import React from 'react';

import gql from 'graphql-tag';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import Yup from 'yup';

import { ErrorAlert } from './ErrorAlert';

const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $price: Float!) {
    createBook(title: $title, author: $author, price: $price) {
      title,
      author,
      price,
    }
  }
`;

const EDIT_BOOK = gql`
  mutation editBook($bookId: Int!, $title: String!, $author: String!, $price: Float!) {
    editBook(bookId: $bookId, title: $title, author: $author, price: $price) {
      bookId,
      title,
      author,
      price
    }
  }
`;

export const BookForm = ({
  handleSubmit,
  errors,
  touched,
  values,
  handleChange,
  handleBlur,
  isSubmitting,
  formHeader,
  history
}) => (
  <div>
    {formHeader}

    <form onSubmit={handleSubmit}>
      {errors.form && <ErrorAlert error={errors.form} />}
      <div className="form-group">
        <label htmlFor="title">
          Title
          <input
            className="form-control"
            id="title"
            type="text"
            placeholder="Best book"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
          />
         {errors.title && touched.title && <ErrorAlert error={errors.title} />}
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="author">
          Author
          <input
            className="form-control"
            id="author"
            type="text"
            placeholder="Real author"
            value={values.author}
            onChange={handleChange}
            onBlur={handleBlur}
          />
         {errors.author && touched.author && <ErrorAlert error={errors.author} />}
        </label>
      </div>
      <div className="form-group">
        <label htmlFor="price">
          Price
          <input
            className="form-control"
            id="price"
            type="number"
            placeholder="3.50"
            value={values.price}
            onChange={handleChange}
            onBlur={handleBlur}
          />
         {errors.price && touched.price && <ErrorAlert error={errors.price} />}
        </label>
      </div>
      <button type="submit" disabled={isSubmitting} className="btn btn-primary">Create</button>
      <button className="btn btn-danger float-right" type="button" onClick={history.goBack}>Cancel</button>
    </form>
  </div>
)

const formikData = withFormik({
  validationSchema: Yup.object().shape({
    title: Yup.string().required(),
    author: Yup.string().required(),
    price: Yup.number().required().positive(),
  }),
  mapPropsToValues: (props) => ({
    title: props.title || '',
    author: props.author || '',
    price: props.price || '',
  }),
  handleSubmit: (payload, { props, setSubmitting, setErrors }) => {
    const { author, title, price } = payload;
    const bookId = props.bookId;
    props.mutateBook({ variables: { bookId, author, title, price }})
      .then(
        () => props.history.push('/'),
        (err) => {
          /* Note: apollo errorPolicy functionality seems to have issues,
          currently only network errors are passed
          most likely related to https://github.com/apollographql/apollo-client/issues/2703

          As a fast solution falling back to a default message
          */
          const error = err && err.graphQLErrpos ? err.graphQLErrpos : 'Unexpected error'
          setSubmitting(false);
          setErrors({ form: error })
        }
      );
  }
})

export const BookCreateFormGraphQL = compose(
  graphql(CREATE_BOOK, { name: 'mutateBook', options: { fetchPolicy: 'all' } }),
  formikData
)(BookForm);

export const BookEditFormGraphQL = compose (
  graphql(EDIT_BOOK, { name: 'mutateBook', options: { fetchPolicy: 'all' } }),
  formikData
)(BookForm);

export const BookCreateFormWithRouter = withRouter(BookCreateFormGraphQL);
export const BookEditFormWithRouter = withRouter(BookEditFormGraphQL);