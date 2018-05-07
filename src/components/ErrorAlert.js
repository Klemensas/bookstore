import React from 'react';

export const ErrorAlert = ({ error }) => (
  <div className="alert alert-danger" role="alert">{error.message || error }</div>
)