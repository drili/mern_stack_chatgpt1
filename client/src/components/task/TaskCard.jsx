import React, { useContext, useEffect, useState } from 'react'
import { BsFillLightningChargeFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai"
import { FaCalendar, FaClock } from "react-icons/fa";

import TaskModal from './TaskModal'

const TaskCard = ({ taskId, taskName, taskDescription, taskPersons, customerName, customerColor, taskLow, taskHigh, taskSprintId, taskSprintName, taskType, estimatedTime, taskDeadline }) => {
    const [selectedTaskId, setSelectedTaskId] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const MAX_DESC_LENGTH = 80
    const truncatedTaskDescription =
        taskDescription.length > MAX_DESC_LENGTH
            ? taskDescription.slice(0, MAX_DESC_LENGTH) + "..."
            : taskDescription

    return (
        <div
            id={taskId}
            className={`task-card block p-3 mb-2 border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer ${taskType === "quickTask" ? "bg-amber-50 border-amber-500" : "bg-white"}`}>
            <span>
                <section className='flex gap-2'>
                    <span
                        className={`border rounded-md px-2 py-0.5 text-[10px]`}
                        style={{
                            color: `${customerColor}`,
                            border: `1px solid ${customerColor}`
                        }}
                    >
                        {customerName}
                    </span>
                    {taskSprintName && (
                        <span
                            className={`border rounded-md px-2 py-0.5 text-[10px] text-slate-400`}
                            style={{
                                // color: `${customerColor}`,
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

                {taskType !== "quickTask" && (
                <span className='flex gap-1 mt-3 items-center'>
                    <p className='text-xs font-bold text-slate-500'><FaClock className='font-bold' /></p>
                    {/* <p className='text-xs'>Low {taskLow}</p>
                    <p className='text-xs'>/</p>
                    <p className='text-xs'>High {taskHigh}</p> */}
                    <p className='text-xs font-bold text-slate-500'>{((taskLow + taskHigh) / 2).toFixed(2)} hours</p>

                </span>
            )}

            {taskType === "quickTask" && estimatedTime > 0 && (
                <span className='flex gap-1 mt-3 items-center'>
                    <p className='text-xs font-bold text-slate-500'><FaClock /></p>
                    <p className='text-xs font-bold text-slate-500'>{estimatedTime} est. hours</p>
                </span>
            )}

            <span className=''>
                <section className='relative h-[45px] mt-2.5 overflow-hidden'>
                    <hr className='mb-3' />
                    {taskPersons.map((person, index) => {
                        let personsLeft = Math.max(taskPersons.length - 2);

                        if (index < 2) {
                            return (
                                <span key={index}>
                                    <img
                                        id={index}
                                        className='absolute w-[25px] h-[25px] object-cover object-center rounded-full'
                                        src={`http://localhost:5000/uploads/${person.user.profileImage}`}
                                        style={{
                                            left: `${index * 15}px`
                                        }}
                                    />
                                    {taskPersons.length > 2 && index < 1 && (
                                        <span
                                            className='absolute w-[25px] h-[25px] object-cover object-center rounded-full bg-rose-400 flex items-center justify-center text-white font-medium text-xs'
                                            style={{
                                                left: `30px`,
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

                    {taskType === "quickTask" && (
                        <span className='absolute right-0 bottom-[10px]'>
                            <span className='flex items-center gap-2'>
                                <p className='font-bold text-xs'>{taskDeadline}</p>
                                <BsFillLightningChargeFill className='text-amber-500' />
                            </span>
                        </span>
                    )}
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