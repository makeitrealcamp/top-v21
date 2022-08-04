const { createClient } = require('redis');

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

async function connect() {
  await client.connect();
}

async function disconnect() {
  await client.disconnect();
}

module.exports = {
  client,
  connect,
  disconnect,
};
