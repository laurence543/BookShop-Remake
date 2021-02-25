import React from 'react';
import {Route} from 'react-router-dom';
import BookList from "./containers/BookListView";
import BookDetail from "./containers/BookDetailView";

const BaseRouter = () => (
    <div>
        <Route exact path="/books" component={BookList}/>
        <Route exact path="/books/:bookID/" component={BookDetail}/>
    </div>
);

export default BaseRouter;
