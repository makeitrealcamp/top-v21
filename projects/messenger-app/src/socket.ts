import { io } from 'socket.io-client';

const socket = io(String(process.env.REACT_APP_SERVER_URL));

socket.on('connect', () => {
  console.log('connected to the server');
});

export default socket;
