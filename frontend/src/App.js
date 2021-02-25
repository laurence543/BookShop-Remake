import React, {Component} from 'react';
import 'antd/dist/antd.css';
import {BrowserRouter as Router} from "react-router-dom";
import CustomLayout from './containers/Layout';
import BaseRouter from "./routes";

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                    <CustomLayout>
                        <BaseRouter/>
                    </CustomLayout>
                </Router>
            </div>
        );
    }
}

export default App;
