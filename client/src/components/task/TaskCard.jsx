import React from 'react'

const TaskCard = ({ taskId, taskName, taskDescription, taskPersons, customerName, customerColor }) => {
    const MAX_DESC_LENGTH = 100
    const truncatedTaskDescription =
        taskDescription.length > MAX_DESC_LENGTH
            ? taskDescription.slice(0, MAX_DESC_LENGTH) + "..."
            : taskDescription

    return (
        <div id={taskId} className='task-card block p-4 mb-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer'>
            <span>
                <span 
                    className={`border rounded-md px-4 py-1 text-xs`}
                    style={{
                        color: `${customerColor}`,
                        border: `1px solid ${customerColor}`
                    }}
                >
                    {customerName}
                </span>
                <h3 className='font-bold mt-5'>{taskName}</h3>
            </span>

            <span>
                <p className='text-sm mt-3 leading-4'>{truncatedTaskDescription}</p>
            </span>

            <span className='relative'>
                <section className=''>
                    {taskPersons.map((person, index) => (
                        <img 
                            id={index}
                            className='w-[40px] h-[40px] object-cover object-center rounded-full' 
                            src={`http://localhost:5000/uploads/${person.profileImage}`}/>
                    ))}
                </section>
            </span>
        </div>
    )
}

export default TaskCard