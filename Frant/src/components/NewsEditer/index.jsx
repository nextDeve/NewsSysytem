import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import './index.css'
function NewsEditer(props) {
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    useEffect(() => {
        if (props.content) {
            const contentBlock = htmlToDraft(props.content)
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
            const editState = EditorState.createWithContent(contentState)
            setEditorState(editState)
        }
    }, [props.content])
    return (
        <Editor
            editorState={editorState}
            wrapperClassName="wrapper-editer"
            editorClassName="editor"
            onEditorStateChange={(editorState) => setEditorState(editorState)}
            onBlur={() => {
                props.getContent(draftToHtml(convertToRaw(editorState.getCurrentContent())))
            }}
        />
    )
}
export default NewsEditer