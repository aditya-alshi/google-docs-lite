import Register from "./Register";
import Login from "./Login";
import WebSocketChat from "./WebSocketChat";
import { useState } from "react";
import CollaborativeEditor from "./CollaborativeEditor";

function App() {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState("")
  

  const handleLogin = (token) => {
    setToken(token.token);
    setUserName(token.userName)
  };

  return (
    <div className="App">
      <h1>WebSocket Authenticated Chat</h1>
      {!token && (
        <>
          <Register />

          <Login onLogin={handleLogin} />
        </>
      )}
      {token && (
        <>
          {/* <WebSocketChat token={token} /> */}
          <CollaborativeEditor token={token} userName={userName}/>
        </>
      )}
    </div>
  );
}
export default App;

// import { useEffect, useState } from "react";

// function App() {

//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [ws, setWs] = useState(null);

//   useEffect(() => {
//     //Connect to WebSocket server
//     const socket = new WebSocket('ws://localhost:8080');

//     // save the Websocket connection to state
//     setWs(socket);

//     // socket.onmessage = (event) => {
//     //   setMessages((prevMessages) => [...prevMessages, event.data])
//     // }

//     socket.addEventListener('message', (event) => {
//       setMessages((prevMessages) => [...prevMessages, event.data]);
//     });

//     return () => socket.close(); // Cleanup on component unmount
//   }, []);

//   const sendMessage = () => {
//     if(ws && input) {
//       ws.send(input); // Send message to Websocket server
//       setInput('');
//     }
//   }

//   return (
//     <div className="App">
//       <h1>WebSocket Chat</h1>
//       <div>
//         <input
//           type="text"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Type a message..."
//         />
//         <button onClick={sendMessage}>Send</button>
//       </div>
//       <div>
//         <h2>Messages:</h2>
//         {messages.map((msg, index) => (
//           <p key={index}>{msg}</p>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;
