const { useState, useEffect } = require("react");

function WebSocketChat({ token }) {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [ws, setWs] = useState(null);

    useEffect(() => {
        if(token) {
            // Connect to WebSocket with token
            const socket = new WebSocket(`ws://localhost:8001/?token=${token}`);
            setWs(socket);

            socket.onopen = () => {
                console.log('Connected to Websocket server');
            };

            socket.onmessage = (event) => {
                setMessages((prev) => [...prev, event.data]);
            };

            socket.onclose = () => {
                console.log('Disconneted from WebSocket server');
            };
            

            return () => socket.close();
        }
        
    }, [token]);


    const sendMessage = () => {
        if(ws && input) {
            const payload = JSON.stringify({token, data: input})
            setMessages((prev) => [...prev, `You: ${input}`]);
            ws.send(payload);
            setInput('');
        }
    };

    return (
        <div>
          <h2>WebSocket Chat</h2>
          <div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
          <div>
            <h3>Messages:</h3>
            
            {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
            ))}
          </div>
        </div>
      );
}

export default WebSocketChat;