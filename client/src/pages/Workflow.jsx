import React, { useContext, useEffect, useState } from 'react'
import PageHeading from '../components/PageHeading'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { UserContext } from '../context/UserContext'
import axios from 'axios';

const listsData = {
    list1: [
        { id: 'item1', content: 'Item 1' },
        { id: 'item2', content: 'Item 2' },
        { id: 'item3', content: 'Item 3' },
    ],
    list2: [
        { id: 'item4', content: 'Item 4' },
        { id: 'item5', content: 'Item 5' },
        { id: 'item6', content: 'Item 6' },
    ],
    list3: [
        { id: 'item7', content: 'Item 7' },
        { id: 'item8', content: 'Item 8' },
        { id: 'item9', content: 'Item 9' },
    ],
    list4: [
        { id: 'item10', content: 'Item 10' }
    ],
};

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
    const [lists, setLists] = useState(listsData)
    const [workflowColumns, setWorkflowColumns] = useState(workflowColumnsData)
    const [tasks, setTasks] = useState([])
    const { user } = useContext(UserContext)
    const [filteredTasksByColumn, setFilteredTasksByColumn] = useState({});

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/tasks/fetch-by-user/${user.id}`)
            setTasks(response.data)
        } catch (error) {
            console.error('Failed to fetch tasks', error);
        }
    }

    const onDragEnd = (result) => {
        const { source, destination } = result

        // If dropped outside a droppable area
        if (!destination) {
            return
        }

        // If dropped in the same list and same position
        if (source.droppableId === destination.droppableId && source.index === destination.index) {
            return
        }

        const sourceList = lists[source.droppableId]
        const destinationList = lists[destination.droppableId]
        const [movedItem] = sourceList.splice(source.index, 1)

        destinationList.splice(destination.index, 0, movedItem)

        setLists((prevLists) => ({
            ...prevLists,
            [source.droppableId]: sourceList,
            [destination.droppableId]: destinationList,
        }))
    }

    useEffect(() => {
        fetchTasks()
    }, [user])

    useEffect(() => {
        if (tasks.length > 0) {
            if (tasks.length > 0) {
                const filteredTasksObj = {};
                Object.entries(workflowColumnsData).forEach(([columnId, columnItems]) => {
                    const columnNum = parseInt(columnItems[0].col, 10);
                    filteredTasksObj[columnNum] = tasks.filter((task) => task.workflowStatus === columnNum);
                });
                setFilteredTasksByColumn(filteredTasksObj);
            }
        }
    }, [tasks])
    
    return (
        <div id='workflowPage'>
            <PageHeading 
                heading="Workflow"
                subHeading={`Welcome to the workflow area`}
                suffix="Drag-n-drop the tasks to move them."
            />

            <section className='flex flex-row'>
                {Object.entries(workflowColumns).map(([itemId, items]) => (
                    <section key={itemId} className=''>
                        {items.map((item) => (
                            <section key={item.id} className=''>
                                <span>Workflow {item.col}</span>
                                <span id='filteredTasks'>
                                    {filteredTasksByColumn[item.col]?.map((task) => (
                                        <section key={task._id} className=''>
                                            <span>{task.taskName}</span>
                                            <span>{task.taskDescription}</span>
                                        </section>
                                    ))}
                                </span>
                            </section>
                        ))}
                    </section>
                ))}

                <hr />
            </section>

            <section>
                <DragDropContext onDragEnd={onDragEnd}>
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                        {Object.entries(lists).map(([listId, items]) => (
                        <Droppable key={listId} droppableId={listId}>
                            {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={{
                                width: '200px',
                                padding: '8px',
                                border: '1px solid #ddd',
                                borderRadius: '4px',
                                margin: '16px',
                                }}
                            >
                                {items.map((item, index) => (
                                <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                        userSelect: 'none',
                                        padding: '8px',
                                        margin: '4px',
                                        backgroundColor: 'lightblue',
                                        borderRadius: '4px',
                                        ...provided.draggableProps.style,
                                        }}
                                    >
                                        {item.content}
                                    </div>
                                    )}
                                </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                            )}
                        </Droppable>
                        ))}
                    </div>
                    </DragDropContext>
            </section>
        </div>
    )
}

export default Workflow