import React, { useContext, useEffect, useState } from 'react'
import PageHeading from '../components/PageHeading'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { UserContext } from '../context/UserContext'
import axios from 'axios'
import TaskModal from '../components/task/TaskModal'
import TaskCard from '../components/task/TaskCard'
import useTaskModal from '../functions/useTaskModal'
import getCurrentSprint from '../functions/getCurrentSprint'
import WorkflowFilters from '../components/workflow/WorkflowFilters'

const workflowColumnsData = {
    col0: [
        { id: "col0", col: "0", name: "Tasks Backlog" }
    ],
    col1: [
        { id: "col1", col: "1", name: "This Week" }
    ],
    col2: [
        { id: "col2", col: "2", name: "In Progress" }
    ],
    col3: [
        { id: "col3", col: "3", name: "Completed" }
    ]
}

const Workflow = () => {
    const [workflowColumns, setWorkflowColumns] = useState(workflowColumnsData)
    const [tasks, setTasks] = useState([])
    const [filteredTasks, setFilteredTasks] = useState([])
    const { user } = useContext(UserContext)
    const [filteredTasksByColumn, setFilteredTasksByColumn] = useState({})
    const { selectedTaskId, showModal, handleTaskModal, onCloseModal } = useTaskModal()
    const activeSprint  = getCurrentSprint()
    const [newSprintArray, setNewSprintArray] = useState(null)

    const fetchTasksByUserAndSprint = async (activeSprintArray) => {
        try {
            // const response = await axios.get(`http://localhost:5000/tasks/fetch-by-user/${user.id}`)
            const activeSprintCheck = activeSprintArray ? activeSprintArray : newSprintArray
            
            if (activeSprintCheck) {
                const response = await axios.get(`http://localhost:5000/tasks/fetch-by-user-sprint/${user.id}?month=${activeSprintCheck.sprintMonth}&year=${activeSprintCheck.sprintYear}`)

                if (response.data.length == 0) {
                    setTasks([])
                    setFilteredTasks([])
                    return
                }
                setTasks(response.data)
                setFilteredTasks(response.data)

            }
           
        } catch (error) {
            console.error('Failed to fetch tasks', error)
        }
    }

    const updateTaskWorkflow = async (taskId, workflowStatus) => {
        try {
            const response = await axios.put(`http://localhost:5000/tasks/update-taskworkflow/${taskId}`, { workflowStatus })
            // console.log(response)
        } catch (error) {
            console.error('Failed to update task workflowStatus', error)
        }
    }

    const updateFilteredTasks = async (searchTerm) => {
        const filtered = tasks.filter(task =>
            task.taskName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.taskDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.taskCustomer.customerName.toLowerCase().includes(searchTerm.toLowerCase())
        )

        setFilteredTasks(filtered)
    }

    const updatedFilteredTasksCustomer = async (customerName) => {
        const filtered = tasks.filter(task =>
            task.taskCustomer.customerName.toLowerCase().includes(customerName.toLowerCase())
        )

        setFilteredTasks(filtered)
    }

    useEffect(() => {
        fetchTasksByUserAndSprint(activeSprint)
    }, [user, activeSprint])

    useEffect(() => {
        if (filteredTasks.length > 0) {
            const filteredTasksObj = {}
            Object.entries(workflowColumnsData).forEach(([columnId, columnItems]) => {
                const columnNum = parseInt(columnItems[0].col, 10)
                filteredTasksObj[columnNum] = filteredTasks.filter((task) => task.workflowStatus === columnNum)
            })
            setFilteredTasksByColumn(filteredTasksObj)
        } else {
            setFilteredTasksByColumn([])
        }

    }, [tasks, filteredTasks])

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

            <WorkflowFilters
                activeSprint={activeSprint}
                fetchTasksByUserAndSprint={fetchTasksByUserAndSprint}
                updateFilteredTasks={updateFilteredTasks}
                updatedFilteredTasksCustomer={updatedFilteredTasksCustomer}
                setNewSprintArray={setNewSprintArray}
            ></WorkflowFilters>

            <DragDropContext onDragEnd={onDragEnd}>
                <section className='flex gap-5'>
                    {Object.entries(workflowColumnsData).map(([key, value]) => (
                        <span className='flex-1' key={key}>
                            <h3 className='font-bold mb-5 border-b pb-2'>{value[0].name}</h3>
                            <Droppable droppableId={value[0].col}>
                                {(provided) => (
                                    <span
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className='flex flex-col gap-1 bg-slate-100 rounded-md py-2 px-2'
                                    >
                                        {filteredTasksByColumn[value[0]?.col]?.map((task, index) => (
                                            <Draggable key={task._id} draggableId={task._id} index={index}>
                                                {(provided) => (
                                                    <span
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        // className='flex flex-col border p-5'
                                                        // onClick={(e) => handleTaskOnclick(e, task._id)}
                                                        onClick={() => handleTaskModal(task._id)}
                                                    >
                                                        <TaskCard
                                                            key={task._id}
                                                            taskId={task._id}
                                                            taskName={task.taskName}
                                                            taskDescription={task.taskDescription}
                                                            taskPersons={task.taskPersons}
                                                            customerName={task.taskCustomer.customerName}
                                                            customerColor={task.taskCustomer.customerColor}
                                                            taskLow={task.taskTimeLow}
                                                            taskHigh={task.taskTimeHigh}
                                                            taskSprintId={task.taskSprints[0]._id}
                                                            taskSprintName={task.taskSprints[0].sprintName}
                                                            // customer={task.taskCustomer}
                                                        ></TaskCard>
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

            {selectedTaskId && (
                <TaskModal
                    taskID={selectedTaskId}
                    showModalState={showModal}
                    // onCloseModal={() => setShowModal(false)}
                    onCloseModal={onCloseModal}
                    fetchTasks={fetchTasksByUserAndSprint}
                    // fetchTasksByUserAndSprint={fetchTasksByUserAndSprint}
                />
            )}
        </div>
    )
}

export default Workflow
