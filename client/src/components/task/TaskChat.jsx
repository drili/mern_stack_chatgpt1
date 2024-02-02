import React, { useState, useEffect, useRef } from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from "draft-js-export-html"

import { BsFillSendFill } from "react-icons/bs";

import DraftEditor from '../drafteditor/DraftEditor';

const options = {
    entityStyleFn: (entity) => {
        const entityType = entity.get('type').toLowerCase();
        if (entityType === 'mention') {
            const data = entity.getData();
            return {
                element: 'span',
                attributes: {
                    className: 'mention',
                },
                style: {
                },
                text: `@${data.mention.name}`,
            };
        }
    },
};

const TaskChat = ({ taskID }) => {
    const [messages, setMessages] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [isInputEmpty, setIsInputEmpty] = useState(true)

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const contentIsMeaningful = (content) => {
        const plainText = content.getPlainText()
        return /\S/.test(plainText);
    }

    const handleEditorStateChange = (newState) => {
        setEditorState(newState)
        const currentContent = newState.getCurrentContent()
        setIsInputEmpty(!contentIsMeaningful(currentContent))
    }

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && !event.shiftKey && !event.ctrlKey) {
            event.preventDefault()
            handleSendMessage()
        }
    }

    const handleSendMessage = () => {
        const currentContent = editorState.getCurrentContent();
        if (!contentIsMeaningful(currentContent)) {
            return;
        }

        const htmlContent = stateToHTML(currentContent, options)
        // const messageText = currentContent.getPlainText();

        setMessages([...messages, htmlContent]);
        setEditorState(EditorState.createEmpty());
    };

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="flex flex-col overflow-y-auto max-h-[55vh]" id='TaskChatMentions'>
                {messages.map((message, index) => (
                    <div key={index} className="mb-4 flex align-top">
                        <div>
                            <img className='h-[40px] w-[40px] mt-1 rounded-md mr-4 object-cover' src='https://planningtool.hybridtech.dk/assets/img/persons/db.png' />
                        </div>
                        <div className='w-full'>
                            <div className="text-md text-slate-950 font-bold mb-1">Karl Iverson <span className='ml-2 font-light text-xs'>10:57 • 01-02-2024</span></div>
                            <div className="rounded-md" dangerouslySetInnerHTML={{ __html: message }}></div>
                        </div>
                    </div>
                ))}

                <div ref={messagesEndRef} />
            </div>

            <div className="border-t border-gray-200 pt-5">
                <section onKeyDown={handleKeyDown}>
                    <DraftEditor
                        editorState={editorState}
                        setEditorState={handleEditorStateChange}
                    />
                </section>

                <section className='flex justify-end mt-5'>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:border-green-800 disabled:bg-green-100"
                        onClick={handleSendMessage}
                        disabled={isInputEmpty}
                    >
                        <BsFillSendFill /> Comment
                    </button>
                </section>
            </div>
        </div>
    );
};

export default TaskChat;