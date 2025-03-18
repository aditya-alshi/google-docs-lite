import { useRef } from 'react';
import * as Y from 'yjs';


function CollaborativeEditor({ token }) {

    const ydoc = new Y.Doc();
    const socket = new WebSocket(`ws://localhost:5000/?token=${token}`);

    socket.binaryType = "arraybuffer"

    const text = ydoc.getText('shareText'); 
    
    
    const textRef = useRef(null);

    socket.onopen = () => {
        const update = Y.encodeStateAsUpdate(ydoc);
        socket.send(update)
    }

    socket.onmessage = event => {
        console.log("onMessage triggered")
        const update = new Uint8Array(event.data)
        Y.applyUpdate(ydoc, update);
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
                <div></div>
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