import React from 'react';

var Header = React.createClass({
    render: function() {
        return (
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row', width: '100%', borderBottom: 'solid 2px grey', fontFamily: 'Baskerville'}}>
                <div>
                    <h1 style={{fontSize: 48, textAlign: 'right'}}>Jayeh.ca</h1>
                    <h2 style={{fontSize: 24}}>Pro Frisbee Guy / Coder <a href="https://github.com/funkjunky" target="_blank"><i className="fa fa-github"></i></a></h2>
                </div>
            </div>
        );
    },
});

export default Header;
