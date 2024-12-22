import dgram from 'node:dgram';
import axios from 'axios';
import dotenv from 'dotenv';

const server = dgram.createSocket('udp4');
dotenv.config();

const http = axios.create({
    baseURL: `http://${process.env.CLOUD_LOG_URI}/index.php/api`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Checks the validity of the API key.
http.get(`/check_auth/${process.env.API_KEY}`).then((response) => {
    console.log(response.data);
}).catch((error) => {
    console.error(error.stack);
});

server.on('error', (err) => {
    console.error(`server error:\n${err.stack}`);
    server.close();
});

server.on('message', (msg, rinfo) => {
    console.log(`message from ${rinfo.address}:${rinfo.port}`);
    console.log('ADIF String:', msg.toString());

    if (!msg || msg.length === 0) {
        console.error('Invalid or empty ADIF string received');
        return;
    }

    http.post('/qso', {
        'key': process.env.API_KEY,
        'station_profile_id': process.env.STATION_ID,
        'type': 'adif',
        'string': msg.toString()
    }).then((response) => {
        console.log(response.data);
    }).catch((error) => {
        console.error(error);
    });
});

server.on('listening', () => {
    const address = server.address();
    console.log(`server listening ${address.address}:${address.port}`);
});

server.bind(Number(process.env.PORT) || 9876);