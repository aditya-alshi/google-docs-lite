import Register from "./Register";
import Login from "./Login";

import { useState } from "react";
import CollaborativeEditor from "./CollaborativeEditor";
import TheQuilEditor from "./TheQuilEditor";
import WebSocketChat from "./WebSocketChat";


function App() {
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState("")


  const handleLogin = (token) => {
    setToken(token.token);
    setUserName(token.userName)
  };

  return (
    <div className="App">
      {/* <TheQuilEditor /> */}
      <h1>WebSocket Authenticated Chat</h1>
      {!token && (
        <>
          <Register />

          <Login onLogin={handleLogin} />
        </>
      )}
      {token && (
        <>
        {console.log(token)}
        <CollaborativeEditor token={token} userName={userName} />
          {/* <WebSocketChat token={token} /> */}
        </>
      )}
    </div>
  );
}
export default App;
