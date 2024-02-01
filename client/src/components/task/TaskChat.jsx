import React, { useState } from 'react';

const TaskChat = ({ taskID }) => {
    const [messages, setMessages] = useState([]); // Placeholder for chat messages
    const [newMessage, setNewMessage] = useState(""); // State for new message input

    const handleSendMessage = () => {
        // Logic to send message
        // For now, just adding to local state
        setMessages([...messages, newMessage]);
        setNewMessage("");
    };

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="flex flex-col overflow-y-auto max-h-[55vh]">
                {messages.map((message, index) => (
                    <div key={index} className="mb-4 flex align-top">
                        <div>
                            <img className='h-[40px] w-[40px] mt-1 rounded-md mr-4 object-cover' src='https://planningtool.hybridtech.dk/assets/img/persons/db.png'/>
                        </div>
                        <div className='w-full'>
                            <div className="text-md text-slate-950 font-bold mb-1">Karl Iverson <span className='ml-2 font-light text-xs'>10:57 01-02-2024</span></div>
                            <div className="bg-gray-50 p-2 rounded-md">{message}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                    <input
                        type="text"
                        className="flex-1 p-2 border border-gray-300 rounded-md"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        onClick={handleSendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskChat;