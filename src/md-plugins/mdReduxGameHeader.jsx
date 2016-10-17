import RghComponent from '../components/one-offs/ReduxGameHeader.jsx';
import React from 'react';
import Plugin from 'markdown-it-regexp';

var mdReduxGameHeader = Plugin(
    /%reduxgameheader%/g,
    function(match, utils) {
        return <RghComponent />;
    }
);

export default mdReduxGameHeader;
