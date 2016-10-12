import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { match, browserHistory, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Routes from './routes.jsx';
import getStore from './helpers/getStore.jsx';

if(typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', (e) => {
        const consumeData = () => {
            if(!window.__dataConsumed) {
                window.__dataConsumed = true;
                return window.__serverStore;
            } else
                return false;
        };

        let store, data;
        if(data = consumeData())
            store = getStore(data);
        else
            store = getStore();

        const history = syncHistoryWithStore(browserHistory, store);
        match({ history, routes: Routes(store) }, (error, redirectLocation, renderProps) => {
            render(<Provider store={store}><Router {...renderProps} /></Provider>, document.getElementById('app'));
        });
    });
}
