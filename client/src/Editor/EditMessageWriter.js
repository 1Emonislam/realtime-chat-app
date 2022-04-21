import { Tooltip } from '@mui/material';
import CodeBlock from '@tiptap/extension-code-block';
import Link from '@tiptap/extension-link';
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useCallback } from "react";
import {
    FaBold, FaCode, FaHeading,
    FaItalic, FaLink, FaListOl,
    FaListUl,
    FaPlusCircle,
    FaQuoteLeft,
    FaRedo, FaRegGrinAlt, FaStrikethrough,
    FaUnderline,
    FaUndo, FaUnlink
} from "react-icons/fa";
import { MdAlternateEmail } from 'react-icons/md';
import { RiAttachment2, RiSendPlane2Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { editMessage } from '../store/actions/messageAction';
import { MESSAGE_WRITE } from '../store/type/messageTypes';
import './Editor.css';
const MenuBar = ({ editor }) => {
    const dispatch = useDispatch();
    const { groupMessage, auth } = useSelector(state => state);
    // console.log(groupMessage)
    const { messageInfoStore } = groupMessage;
    // console.log(messageInfoStore)
    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)
        // cancelled
        if (url === null) {
            return
        }
        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink()
                .run()
            return
        }
        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url })
            .run()
    }, [editor])
    if (!editor) {
        return null;
    }
    return (
        <div className="menuBar">
            <div>

                <button>
                    <FaPlusCircle style={{ fontSize: '18px', position: 'relative', top: '2px' }} />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "is_active" : ""}
                >
                    <FaBold />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "is_active" : ""}
                >
                    <FaItalic />
                </button>
                {!editor?.isActive('link') ? <button onClick={setLink} className={editor.isActive('link') ? 'is-active' : 'hidden'}>
                    <FaLink />
                </button> : <button
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    disabled={!editor.isActive('link')}
                >
                    <FaUnlink />
                </button>}
                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={editor.isActive("underline") ? "is_active" : ""}
                >
                    <FaUnderline />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    className={editor.isActive("strike") ? "is_active" : ""}
                >
                    <FaStrikethrough />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 2 }) ? "is_active" : ""
                    }
                >
                    <FaHeading />
                </button>
                <button
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                    className={
                        editor.isActive("heading", { level: 3 }) ? "is_active" : ""
                    }
                >
                    <FaHeading className="heading3" />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive("bulletList") ? "is_active" : ""}
                >
                    <FaListUl />
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive("orderedList") ? "is_active" : ""}
                >
                    <FaListOl />
                </button>
                {editor.isActive('codeBlock') ? <button
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={editor.isActive('codeBlock') ? 'is-active' : ''}
                >
                    <FaCode style={{ fontSize: '18px', position: 'relative', top: '2px' }} />
                </button> :
                    <button
                        onClick={() => editor.chain().focus().setCodeBlock().run()}
                        disabled={editor.isActive('codeBlock')}
                    >
                        <FaCode style={{ fontSize: '18px', position: 'relative', top: '2px' }} />
                    </button>}
                <button
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={editor.isActive("blockquote") ? "is_active active_btn" : ""}
                >
                    <FaQuoteLeft />
                </button>
                <button onClick={() => editor.chain().focus().undo().run()}>
                    <FaUndo />
                </button>
                <button onClick={() => editor.chain().focus().redo().run()}>
                    <FaRedo />
                </button>

            </div>
            <div>
                <button>
                    <FaRegGrinAlt />
                </button>
                <button>
                    <MdAlternateEmail />
                </button>
                <button>
                    < RiAttachment2 />
                </button>
                {/*    dispatch(editMessage(groupMessage?.write, messageInfo?.chat?._id, messageInfo?._id, auth?.user?.token)); */}
                {auth?.user?.token && messageInfoStore?.chat?._id && messageInfoStore?._id ? <button onClick={() => dispatch(editMessage(groupMessage?.write, messageInfoStore?.chat?._id, messageInfoStore?._id, auth?.user?.token, editor))}>
                    <RiSendPlane2Fill />
                </button> : <Tooltip title="Permission Denied!" arrow>
                    <button style={{ color: '#ccc' }}><RiSendPlane2Fill /></button>
                </Tooltip>}
            </div>
        </div>
    );
};

export const EditMessageWriter = () => {
    const dispatch = useDispatch();
    const editor = useEditor({
        extensions: [StarterKit, Underline, CodeBlock, Link],
        content: ``,
        onUpdate: ({ editor }) => {
            const data = editor.getJSON();
            dispatch({
                type: MESSAGE_WRITE,
                payload: {
                    data: data,
                },
            })
        },
    });
    return (
        <div className="textEditor">
            <EditorContent style={{ color: 'darkcyan' }} editor={editor} />
            <MenuBar editor={editor} />
        </div >
    );
};
