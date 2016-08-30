/**
 * android \ ios 公用启动文件
 */

import React from 'react';
import { createStore } from 'redux';
import  { Provider } from 'react-redux';
import App from './containers/App';
import save from './reducers'

const store = createStore(save);

class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

export default Root;