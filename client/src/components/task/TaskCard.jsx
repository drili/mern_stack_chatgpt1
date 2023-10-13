import React, { useContext, useEffect, useState } from 'react'
import TaskModal from './TaskModal'

const TaskCard = ({taskId, taskName, taskDescription, taskPersons, customerName, customerColor, taskLow, taskHigh, taskSprintId, taskSprintName}) => {
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
                <section className='flex gap-2'>
                    <span 
                        className={`border rounded-md px-4 py-1 text-xs k`}
                        style={{
                            color: `${customerColor}`,
                            border: `1px solid ${customerColor}`
                        }}
                    >
                        {customerName}
                    </span>
                    {taskSprintName && (
                        <span 
                            className={`border rounded-md px-4 py-1 text-xs k`}
                            style={{
                                color: `${customerColor}`,
                                border: `1px solid}`
                            }}
                        >
                            {taskSprintName}
                        </span>
                    )}
                    
                </section>
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
                <section className='relative h-[45px] mt-5 overflow-hidden'>
                    <hr className='mb-3'/>
                    {taskPersons.map((person, index) => {
                        let personsLeft = Math.max(taskPersons.length - 2);

                        if (index < 2) {
                            return (
                                <span key={index}>
                                        <img 
                                        id={index}
                                        className='absolute w-[30px] h-[30px] object-cover object-center rounded-full' 
                                        src={`http://localhost:5000/uploads/${person.user.profileImage}`}
                                        style={{
                                            left: `${index * 20}px`
                                        }}
                                    />
                                    {taskPersons.length > 2 && index < 1 && (
                                        <span
                                            className='absolute w-[30px] h-[30px] object-cover object-center rounded-full bg-indigo-500 flex items-center justify-center text-white font-medium text-xs'
                                            style={{
                                                left: `40px`,
                                                zIndex: "1"
                                            }}
                                        >
                                            +{personsLeft}
                                        </span>
                                    )}
                                </span>
                            )
                        }
                    })}
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