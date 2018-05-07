import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { BookListPage } from './containers/BookListPage';
import { BookEditPage } from './containers/BookEditPage';
import { BookCreatePage } from './containers/BookCreatePage';

export class App extends Component {
  render() {
    return (
      <main className="container p-5">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={BookListPage}/>
            <Route path="/book/create" component={BookCreatePage}/>
            <Route path="/book/:bookId" render={props => <BookEditPage {...props} />} />
          </Switch>
        </BrowserRouter>
      </main>
    );
  }
}
