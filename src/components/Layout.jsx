import React from 'react';
import Title from 'react-title-component';

const Layout = ({ children }) => (
    <div id="layout">
        <Title render="Jayeh" />
        { children }
        <p style={{ marginTop: 100, textAlign: 'right' }}>
            jayeh.ca © 2016 (Jason McCarrell)
        </p>
    </div>
);

export default Layout;
