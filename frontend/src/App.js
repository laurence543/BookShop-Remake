import React, { Component } from 'react';
import 'antd/dist/antd.css';

import CustomLayout from './containers/Layout';
import BookList from "./containers/BookListView";

class App extends Component {

  render() {
    return (
      <div>
        <CustomLayout>
            <BookList/>
        </CustomLayout>
      </div>
    );
  }
}

export default App;