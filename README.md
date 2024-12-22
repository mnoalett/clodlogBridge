# clodlogBridge

This project is a simple server that listens for ADIF records sent via UDP from FLDigi and forwards them to a CloudLog instance. This solves the issue where FLDigi only allows configuration of the CloudLog server's default HTTP port (80), but your CloudLog server might be running on a different port (e.g., 8080).

The server listens for UDP packets containing ADIF strings and then forwards those strings to the CloudLog API for logging the QSO details.

## Features

- UDP Server: Listens for incoming ADIF records via UDP.
    
- CloudLog Integration: Forwards received ADIF records to CloudLog using the CloudLog API.
    
- Environment Configuration: Uses environment variables for configuring CloudLog URI, API key, and station ID.
  

## Installation

Clone the repository:

    git clone https://github.com/yourusername/cloudlog-udp-forwarder.git
    cd cloudlog-udp-forwarder

Install the dependencies:

    npm install

Create a .env file in the root of the project to store your configuration:

    CLOUD_LOG_URI=<http://<your-cloudlog-server.com>:<port>
    API_KEY=your_cloudlog_api_key
    STATION_ID=your_station_profile_id
    PORT=9876

- CLOUD_LOG_URI: The URL to your CloudLog server (including the port).
- API_KEY: The API key from CloudLog.
- STATION_ID: Your station profile ID in CloudLog.
- PORT: The UDP port on which the server will listen for incoming ADIF records (default is 9876).

## Run the application:

    npm start