import { useEffect, useRef, useState } from 'react';

interface WebSocketMessage {
  sender: string;
  message: string;
}

export const useWebSocket = (url: string) => {
  const [messages, setMessages] = useState<WebSocketMessage[]>([]);
  const websocketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    websocketRef.current = ws;

    ws.onopen = () => {
      console.log('WebSocket connection established');
    };

    ws.onmessage = async (event: MessageEvent) => {
      if (typeof event.data === 'string') {
        // Handle string data (JSON)
        try {
          const receivedMessage: WebSocketMessage = JSON.parse(event.data);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        } catch (error) {
          console.error('Error parsing JSON string:', error);
        }
      } else if (event.data instanceof Blob) {
        // Handle Blob data
        try {
          const textData = await event.data.text(); // Convert Blob to text
          const receivedMessage: WebSocketMessage = JSON.parse(textData);
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        } catch (error) {
          console.error('Error parsing Blob data:', error);
        }
      }
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (message: WebSocketMessage) => {
    if (websocketRef.current && websocketRef.current.readyState === WebSocket.OPEN) {
      websocketRef.current.send(JSON.stringify(message));
    }
  };

  return { messages, sendMessage };
};
