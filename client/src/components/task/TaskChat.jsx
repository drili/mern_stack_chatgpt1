import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { BsFillSendFill } from "react-icons/bs";

import DraftEditor from '../drafteditor/DraftEditor';

const TaskChat = ({ taskID }) => {
    const [messages, setMessages] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const handleSendMessage = () => {
        // setMessages([...messages, newMessage]);
        // setNewMessage("");
        const currentContent = editorState.getCurrentContent();
        const messageText = currentContent.getPlainText();

        setMessages([...messages, messageText]);
        setEditorState(EditorState.createEmpty());
    };

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="flex flex-col overflow-y-auto max-h-[55vh]">
                {/* TODO: Include message formatting, e.g. bold, mentions, etc... */}
                {messages.map((message, index) => (
                    <div key={index} className="mb-4 flex align-top">
                        <div>
                            <img className='h-[40px] w-[40px] mt-1 rounded-md mr-4 object-cover' src='https://planningtool.hybridtech.dk/assets/img/persons/db.png' />
                        </div>
                        <div className='w-full'>
                            <div className="text-md text-slate-950 font-bold mb-1">Karl Iverson <span className='ml-2 font-light text-xs'>10:57 • 01-02-2024</span></div>
                            <div className="bg-gray-50 p-2 rounded-md">{message}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="border-t border-gray-200 pt-5">
                <section>
                    <DraftEditor
                        editorState={editorState}
                        setEditorState={setEditorState}
                    />
                </section>

                <section className='flex justify-end mt-5'>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:border-green-800"
                        onClick={handleSendMessage}
                    >
                        <BsFillSendFill /> Comment
                    </button>
                </section>

                {/* <input
                        type="text"
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                        placeholder="Type a message..."
                        // value={newMessage}
                        // onChange={(e) => setNewMessage(e.target.value)}
                    /> */}
            </div>
        </div>
    );
};

export default TaskChat;