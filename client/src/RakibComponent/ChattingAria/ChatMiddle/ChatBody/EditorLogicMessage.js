import React, { useMemo } from 'react'
import CodeBlock from '@tiptap/extension-code-block'
import Document from '@tiptap/extension-document'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import StarterKit from '@tiptap/starter-kit'
import Bold from '@tiptap/extension-bold'
import Text from '@tiptap/extension-text'
import Italic from '@tiptap/extension-italic'
import Code from '@tiptap/extension-code'
import htmlParser from 'html-react-parser'
import { generateHTML } from '@tiptap/react'
function EditorLogicMessage({ data }) {
    const output = useMemo(() => {
        return generateHTML(data, [
            Document,
            StarterKit, Underline, Link, CodeBlock, Bold, Code, Text, Italic,
        ])
    }, [data])
    return (
        <>{htmlParser(output)}</>
    )
}

export default EditorLogicMessage
