import { useRef } from 'react';
import * as Y from 'yjs';
import * as awarenessProtocol from 'y-protocols/awareness.js'

function CollaborativeEditor({ token, username }) {


    const ydoc = new Y.Doc();
    const socket = new WebSocket(`ws://localhost:8001/?token=${token}`);
    const awareness = new awarenessProtocol.Awareness(ydoc); 
    socket.binaryType = "arraybuffer"

    const text = ydoc.getText('shareText'); 
    
    const textRef = useRef(null);
    const activeUsers = useRef(null)
    

    socket.onopen = () => {
        const update = Y.encodeStateAsUpdate(ydoc);
        socket.send(update)
    }

    awareness.on('change', () => {
        const users = [];
        awareness.getStates().forEach(state => {
            if (state.user) {
                users.push(state.user.name); // Collect usernames of active users
            }
        });
    
        // Update the DOM with the active users list
        activeUsers.current.innerHTML = '';
        users.forEach(username => {
            const userItem = document.createElement('div');
            userItem.textContent = username;
            activeUsers.current.appendChild(userItem);
        });
    });
    
    awareness.setLocalStateField('user', {
        name: username,
        color: '#30bcef' // Example color; customize as needed
    });

    socket.onmessage = event => {
        console.log("onMessage triggered")
        const update = new Uint8Array(event.data)
        if (awarenessProtocol.isAwarenessUpdate(update)) {
            // Apply awareness update
            awarenessProtocol.applyAwarenessUpdate(awareness, update, socket);
        } else {

            Y.applyUpdate(ydoc, update);
        }
        if(textRef.current) {
            textRef.current.value = text
        }
    }
    
    // text.observe(() => {
    //     console.log("observe triggered")
    // })

    // One thing here to learn was, you don't need .observe to listen for changes. The Y object listens for changes any way
    
    
    function handleInputChange(e){
        text.delete(0, text.length);
        text.insert(0, textRef.current.value)
        const update = Y.encodeStateAsUpdate(ydoc);
        socket.send(update);
    }


    return (
        <div>
            <h2>Collaborative Document Editor</h2>
            <div>Online : 
                <div
                    ref={activeUsers}
                >

                </div>
            </div>
            <textarea
                ref={textRef}
                onChange={handleInputChange}
                placeholder='Start collaborating here...'
                rows="18"
                cols="50"
            />
        </div>
    )

}

export default CollaborativeEditor;