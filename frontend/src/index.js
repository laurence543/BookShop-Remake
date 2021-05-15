import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import './index.css';
import App from './App';
import ukUA from 'antd/lib/locale/uk_UA';
import store from './store/store';
import reportWebVitals from "./reportWebVitals";

const app = (
    <Provider store={store}>
        <ConfigProvider locale={ukUA}>
            <App />
        </ConfigProvider>
    </Provider>
)

ReactDOM.render(app, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
