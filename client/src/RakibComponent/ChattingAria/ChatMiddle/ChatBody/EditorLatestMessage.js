import React, { useMemo } from 'react'
import CodeBlock from '@tiptap/extension-code-block'
import Document from '@tiptap/extension-document'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Text from '@tiptap/extension-text'
import Italic from '@tiptap/extension-italic'
import { generateHTML } from '@tiptap/react'
function EditorLatestMessage({ data }) {
    const output = useMemo(() => {
        return generateHTML(data, [
            Document,
            StarterKit, Underline, Link, CodeBlock, Bold, Text, Italic
        ])
    }, [data])
    const para = document.createElement("p");
    para.innerHTML = output;
    console.log(para?.innerText)
    return (
        <span>{para?.innerText}</span>
    )
}

export default EditorLatestMessage;