import React, { useState, useEffect, useRef, useContext, useLayoutEffect } from 'react';
import { EditorState } from 'draft-js';
import { stateToHTML } from "draft-js-export-html"

import { BsFillSendFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs"

import DraftEditor from '../drafteditor/DraftEditor';
import { UserContext } from '../../context/UserContext'

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
                text: `@${data.mention.username}`,
            };
        }
    },
};

const formatDate = (dateString) => {
    const options = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateString);

    return date.toLocaleTimeString('en-US', options).replace(',', ' •');
};

const TaskChat = ({ taskID }) => {
    const [messages, setMessages] = useState([]);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [isInputEmpty, setIsInputEmpty] = useState(true)
    const [comments, setComments] = useState([])

    const messagesEndRef = useRef(null)
    const chatContainerRef = useRef(null)

    const { user } = useContext(UserContext)

    // *** Server requests
    const handleDeleteComment = async (commentId) => {
        try {
            const response = await fetch(`http://localhost:5000/comments/delete-comment-by-id/${commentId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) {
                throw new Error("Could not delete comment")
            }

            setComments(prevComments => prevComments.filter(comment => comment._id !== commentId))
            const data = await response.json()
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const fetchComments = async (taskId) => {
        try {
            const response = await fetch("http://localhost:5000/comments/fetch-comments-by-task", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskId: taskId
                })
            })

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json()
            setComments(data)
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const sendCommentToServer = async (htmlContent) => {
        try {
            const response = await fetch("http://localhost:5000/comments/create-comment", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    taskId: taskID,
                    htmlContent, htmlContent,
                    createdBy: user.id,
                })
            })

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            fetchComments(taskID)
        }
    }

    // *** Frontend functionalities
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
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

    // *** User handling from mentions
    const extractMentions = (editorState) => {
        const contentState = editorState.getCurrentContent();
        const mentionedUsers = [];

        contentState.getBlockMap().forEach((block) => {
            block.findEntityRanges(
                (character) => {
                    const entityKey = character.getEntity();
                    return (
                        entityKey !== null &&
                        contentState.getEntity(entityKey).getType() === 'mention'
                    );
                },
                (start, end) => {
                    const entityKey = block.getEntityAt(start);
                    const mentionData = contentState.getEntity(entityKey).getData();
                    mentionedUsers.push(mentionData.mention);
                }
            );
        });

        return mentionedUsers;
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
        sendCommentToServer(htmlContent)

        const mentionedUsers = extractMentions(editorState)
        console.log("Mentioned users:", mentionedUsers);
    };

    useLayoutEffect(() => {
        scrollToBottom()
    }, [comments])

    useEffect(() => {
        fetchComments(taskID)
        scrollToBottom()
    }, [taskID])

    return (
        <div className="flex flex-col h-full bg-white">
            <div className="flex flex-col overflow-y-auto max-h-[55vh]" id='TaskChatMentions' ref={chatContainerRef}>
                {comments.map((message, index) => (
                    <div key={index} className="mb-4 flex align-top group relative hover:bg-slate-50">
                        <div>
                            <img 
                                className='h-[40px] w-[40px] mt-1 rounded-md mr-4 object-cover' 
                                src={`http://localhost:5000/uploads/${message.createdBy.profileImage}`}
                            />
                        </div>

                        <div className='w-full'>
                            <div className="text-md text-slate-950 font-bold mb-1">{message.createdBy.username} 
                                <span className='ml-2 font-light text-xs'>{formatDate(message.createdAt)}</span>
                            </div>
                            <div className="rounded-md" dangerouslySetInnerHTML={{ __html: message.htmlContent }}></div>
                        </div>

                        {message.createdBy._id === user.id && (
                            <button
                                className='delete-button hidden group-hover:block absolute right-0 top-0 py-2 px-3'
                                onClick={() => handleDeleteComment(message._id)}
                                id={message._id}
                            >
                                <BsFillTrashFill className='text-xs text-rose-950' />
                            </button>
                        )}
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