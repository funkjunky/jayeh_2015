import React from 'react';
import { Provider } from 'react-redux';
import ___ from './helpers/global_pd.jsx';

const StoreProvider = ({ store, children }) => {
    return <Provider store={store}>{ children }</Provider>;
};

export default StoreProvider;
