// Get Quill and yjs into picture.
// Somehow bind quil to yjs. Because yjs will help Quil become collaborative.
// let's make it work

import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {Schema, DOMParser} from "prosemirror-model"
import {schema} from "prosemirror-schema-basic"
import {addListNodes} from "prosemirror-schema-list"
import {exampleSetup} from "prosemirror-example-setup"
import { useEffect, useState } from "react"

function TheQuilEditor() {
  const [theView, setTheView] = useState("")
  useEffect(() => {
    const mySchema = new Schema({
      nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
      marks: schema.spec.marks
    })
    new EditorView(document.querySelector("#editor"), {
      state: EditorState.create({
        doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#content")),
        plugins: exampleSetup({schema: mySchema})
      })
    })
    
  }, [])
  console.log(theView)
  return (
    <div>
      {}
    </div>
  )
}

export default TheQuilEditor;
