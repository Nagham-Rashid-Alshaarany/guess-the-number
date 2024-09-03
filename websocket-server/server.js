const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3001 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    // Convert buffer to string if the message is received as a buffer
    const messageStr = message.toString('utf-8');
    console.log('Received:', messageStr);

    try {
      const parsedMessage = JSON.parse(messageStr);

      // Prepare the message to be broadcast
      const data = JSON.stringify({ sender: parsedMessage.sender, message: parsedMessage.message });

      // Broadcast the message to all clients
      wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:3001');
