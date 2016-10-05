import MarkdownIt from 'markdown-it';

import MarkdownRegexp from 'markdown-it-regexp';
import MdHighlight from 'markdown-it-highlightjs';
import MdVariables from 'mdvariables';
import MdFigCaption from 'mdfigcaption';
import MdReact from 'mdreact';
import React from 'react';
import HeaderName from '../md-plugins/mdHeaderName.jsx';
//TODO: ReduxGameHeader and all one-offs should be loaded dynamically eventually
import mdReduxGameHeader from '../md-plugins/mdReduxGameHeader.jsx';

var jayehmd = function(variables) {
            var md = new MarkdownIt();
            md.use(MdReact);
            md.use(MdHighlight);
            md.use(MdVariables(function() {
                return variables;
            }));
            md.use(MdFigCaption);
            md.use(HeaderName);
            md.use(mdReduxGameHeader);

            return md;
};

export default jayehmd;
