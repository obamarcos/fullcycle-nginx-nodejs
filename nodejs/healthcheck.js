const http = require('http');
const options = {
    protocol: 'http:',
    host: '127.0.0.1',
    port: 3000,
    path:  '/dockerhealthcheck',
    method: 'GET',
    timeout: 1500
};

const healthCheck = http.request(options, (res) => {
    console.log(`HEALTHCHECK STATUS: ${res.statusCode}`);
    if (res.statusCode == 200) {
        process.exit(0);
    }
    else {
        process.exit(1);
    }
});

healthCheck.on('error', function (err) {
    console.error('ERROR');
    process.exit(1);
});

healthCheck.end();