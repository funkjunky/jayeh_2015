import ___ from './bootstrap.jsx'; //import, just to have the code in bundle

const renderHtml = (html, state, host) => `
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
        <div id="app">${html}</div>
        ${process.env.NODE_ENV === 'production'
            ? '<script src="/static/bundle.js" defer></script>'
            : '<script src="http://localhost:8008/build/bundle.js" defer></script>'
        }
        <script>
            __serverStore = ${JSON.stringify(state)};
            __host = "${host}";
        </script>
    </body>
</html>
`;

export default renderHtml;
