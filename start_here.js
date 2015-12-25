var ChildProcess = require('child_process');

var handler;
if(process.env.IS_REST_SERVER == 'true')
    handler = ChildProcess.exec('./node_modules/generic_rest_server/generic_rest_server.js ./grs_config.js');
else
    handler = ChildProcess.exec('node server.js');

handler.stdout.on('data', function(data) {
    console.log(data);
});
handler.stderr.on('data', function(data) {
    console.error(data);
});
handler.on('close', function(code) {
    console.log('Exiting. Code: ', code);
});