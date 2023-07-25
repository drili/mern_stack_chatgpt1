import React, { useContext, useEffect, useState } from 'react'
import PageHeading from '../components/PageHeading'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import TaskModal from '../components/task/TaskModal'
import TaskCard from '../components/task/TaskCard'

const workflowColumnsData = {
    col0: [
        { id: "col0", col: "0" }
    ],
    col1: [
        { id: "col1", col: "1" }
    ],
    col2: [
        { id: "col2", col: "2" }
    ],
    col3: [
        { id: "col3", col: "3" }
    ]
}

const Workflow = () => {
    const [workflowColumns, setWorkflowColumns] = useState(workflowColumnsData)
    const [tasks, setTasks] = useState([])
    const { user } = useContext(UserContext)
    const [filteredTasksByColumn, setFilteredTasksByColumn] = useState({})
    const [selectedTaskId, setSelectedTaskId] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const handleTaskModal = (taskId) => {
        setShowModal(true)
        setSelectedTaskId(taskId)
    }

    const onCloseModal = () => {
        setShowModal(false)
    }

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/tasks/fetch-by-user/${user.id}`)
            setTasks(response.data)
            console.log(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks', error)
        }
    }

    const updateTaskWorkflow = async (taskId, workflowStatus) => {
        try {
            const response = await axios.put(`http://localhost:5000/tasks/update-taskworkflow/${taskId}`, { workflowStatus })
            console.log(response)
        } catch (error) {
            console.error('Failed to update task workflowStatus', error)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [user])

    useEffect(() => {
        if (tasks.length > 0) {
            const filteredTasksObj = {}
            Object.entries(workflowColumnsData).forEach(([columnId, columnItems]) => {
                const columnNum = parseInt(columnItems[0].col, 10)
                filteredTasksObj[columnNum] = tasks.filter((task) => task.workflowStatus === columnNum)
            })
            setFilteredTasksByColumn(filteredTasksObj)
        }
    }, [tasks])

    const onDragEnd = (result) => {
        const { source, destination, draggableId } = result

        if (!destination) {
            return
        }

        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return
        }

        console.log(filteredTasksByColumn[source.droppableId])

         // *** Remove the task from the source column
        const sourceColumnId = source.droppableId
        const sourceColumnTasks = [...filteredTasksByColumn[sourceColumnId]]
        const taskIndexToRemove = source.index
        sourceColumnTasks.splice(taskIndexToRemove, 1)

        // *** Add the task to the destination column
        const destinationColumnId = destination.droppableId
        const destinationColumnTasks = [...filteredTasksByColumn[destinationColumnId]]
        const taskToMove = filteredTasksByColumn[sourceColumnId].find((task) => task._id === draggableId)
        destinationColumnTasks.splice(destination.index, 0, taskToMove)

        // *** Update filteredTasksByColumn state
        setFilteredTasksByColumn((prevFilteredTasks) => ({
            ...prevFilteredTasks,
            [sourceColumnId]: sourceColumnTasks,
            [destinationColumnId]: destinationColumnTasks,
        }))

        updateTaskWorkflow(draggableId, destination.droppableId)
    }

    return (
        <div id='workflowPage'>
            <PageHeading
                heading="Workflow"
                subHeading={`Welcome to the workflow area`}
                suffix="Drag-n-drop the tasks to move them."
            />

            <DragDropContext onDragEnd={onDragEnd}>
                <section className='flex gap-5'>
                    {Object.entries(workflowColumnsData).map(([key, value]) => (
                        <span className='flex-1' key={key}>
                            <h4>Workflow {value[0].col}</h4>
                            <Droppable droppableId={value[0].col}>
                                {(provided) => (
                                    <span
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className='flex flex-col gap-2'
                                    >
                                        {filteredTasksByColumn[value[0]?.col]?.map((task, index) => (
                                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                                {(provided) => (
                                                    // <span
                                                    //     ref={provided.innerRef}
                                                    //     {...provided.draggableProps}
                                                    //     {...provided.dragHandleProps}
                                                    //     className='flex flex-col border p-5'
                                                    //     // onClick={(e) => handleTaskOnclick(e, task._id)}
                                                    //     onClick={() => handleTaskModal(task._id)}
                                                    // >
                                                    //     <p>{task._id}</p>
                                                    //     <p>{task.taskName}</p>
                                                    // </span>
                                                    
                                                    <TaskCard
                                                        taskId={task._id}
                                                        taskName={task.taskName}
                                                        taskDescription={task.taskDescription}
                                                        taskPersons={task.taskPersons}
                                                        customerName={task.taskCustomer.customerName}
                                                        customerColor={task.taskCustomer.customerColor}
                                                        // customer={task.taskCustomer}
                                                    ></TaskCard>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </span>
                                )}
                            </Droppable>
                        </span>
                    ))}
                </section>
            </DragDropContext>

            {selectedTaskId && (
                <TaskModal
                    taskID={selectedTaskId}
                    showModalState={showModal}
                    // onCloseModal={() => setShowModal(false)}
                    onCloseModal={onCloseModal}
                    fetchTasks={fetchTasks}
                />
            )}
        </div>
    )
}

export default Workflow
