import React, { useContext, useEffect, useState } from 'react'
import PageHeading from '../components/PageHeading'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { UserContext } from '../context/UserContext'
import axios from 'axios'

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

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/tasks/fetch-by-user/${user.id}`)
            setTasks(response.data)
        } catch (error) {
            console.error('Failed to fetch tasks', error)
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

         // Remove the task from the source column
        const sourceColumnId = source.droppableId
        const sourceColumnTasks = [...filteredTasksByColumn[sourceColumnId]]
        const taskIndexToRemove = source.index
        sourceColumnTasks.splice(taskIndexToRemove, 1)

        // Add the task to the destination column
        const destinationColumnId = destination.droppableId
        const destinationColumnTasks = [...filteredTasksByColumn[destinationColumnId]]
        const taskToMove = filteredTasksByColumn[sourceColumnId].find((task) => task._id === draggableId)
        destinationColumnTasks.splice(destination.index, 0, taskToMove)

        // Update filteredTasksByColumn state
        setFilteredTasksByColumn((prevFilteredTasks) => ({
            ...prevFilteredTasks,
            [sourceColumnId]: sourceColumnTasks,
            [destinationColumnId]: destinationColumnTasks,
        }))
    }

    return (
        <div id='workflowPage'>
            <PageHeading
                heading="Workflow"
                subHeading={`Welcome to the workflow area`}
                suffix="Drag-n-drop the tasks to move them."
            />

            <DragDropContext onDragEnd={onDragEnd}>
                <section className='flex'>
                    {Object.entries(workflowColumnsData).map(([key, value]) => (
                        <span className='flex-1' key={key}>
                            <h4>Workflow {value[0].col}</h4>
                            <Droppable droppableId={value[0].col}>
                                {(provided) => (
                                    <span
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className='flex flex-col'
                                    >
                                        {filteredTasksByColumn[value[0]?.col]?.map((task, index) => (
                                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                                {(provided) => (
                                                    <span
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className='border p-5'
                                                    >
                                                        {task._id}
                                                        {task.taskName}
                                                    </span>
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
        </div>
    )
}

export default Workflow
