import React, { useContext, useEffect, useState } from 'react'
import TaskModal from './TaskModal'

const TaskCard = ({taskId, taskName, taskDescription, taskPersons, customerName, customerColor, taskLow, taskHigh}) => {
    const [selectedTaskId, setSelectedTaskId] = useState(null)
    const [showModal, setShowModal] = useState(false)
    
    const MAX_DESC_LENGTH = 100
    const truncatedTaskDescription =
        taskDescription.length > MAX_DESC_LENGTH
            ? taskDescription.slice(0, MAX_DESC_LENGTH) + "..."
            : taskDescription

    return (
        <div 
            id={taskId} 
            className='task-card block p-4 mb-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer'>
            <span>
                <span 
                    className={`border rounded-md px-4 py-1 text-xs k`}
                    style={{
                        color: `${customerColor}`,
                        border: `1px solid ${customerColor}`
                    }}
                >
                    {customerName}
                </span>
                <h3 className='font-bold mt-5 leading-5'>{taskName}</h3>
            </span>

            <span>
                <p className='text-sm mt-3 leading-4'>{truncatedTaskDescription}</p>
            </span>

            <span className='flex gap-1 mt-2'>
                <p className='text-sm font-bold'>Time:</p>
                <p className='text-sm font-bold'>{taskLow}</p>
                <p className='text-sm font-bold'>•</p>
                <p className='text-sm font-bold'>{taskHigh}</p>
            </span>

            <span className=''>
                <section className='relative h-[50px] mt-5 overflow-hidden'>
                    <hr className='mb-2'/>
                    {taskPersons.map((person, index) => (
                        <img 
                            key={index}
                            id={index}
                            className='absolute w-[40px] h-[40px] object-cover object-center rounded-full' 
                            src={`http://localhost:5000/uploads/${person.profileImage}`}
                            style={{
                                left: `${index * 30}px`
                            }}
                            />
                    ))}
                </section>
            </span>

            {selectedTaskId && (
                <TaskModal
                    taskID={selectedTaskId}
                    showModalState={showModal}
                    // onCloseModal={() => setShowModal(false)}
                    onCloseModal={onCloseModal}
                    // fetchTasks={fetchTasks}
                />
            )}
        </div>
    )
}

export default TaskCard