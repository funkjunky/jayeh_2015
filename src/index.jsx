import React from 'react';

const Index = ({ children }) => (
    <html lang="en">
        <head>
            <title>Jayeh - Jasons tech and opinions</title>
            <link rel="stylesheet" href="/dist/base.css" />
            <link rel="stylesheet" href="/dist/default.css" />
            <link rel="stylesheet" href="/node_modules/font-awesome/css/font-awesome.min.css" />
            <link rel="stylesheet" href="/dist/styles/codepen-embed.css" />
            <link rel="stylesheet" type="text/css" href="https://fonts.googleapis.com/css?family=Open+Sans" />
        </head>
        <body>
            { children }
            <p style={{marginTop: 100, textAlign: 'right'}}>
                jayeh.ca © 2016 (Jason McCarrell)
            </p>
        </body>
    </html>
);
/* taking out until server side works.
            {process.env.NODE_ENV === 'production'
                ? <script src="/build/bundle.js" defer></script>
                : <script src="http://localhost:8008/build/bundle.js" defer></script>
            }
 */

export default Index;
