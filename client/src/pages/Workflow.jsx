import React, { useState } from 'react'
import PageHeading from '../components/PageHeading'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const Workflow = () => {
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
    
    const [lists, setLists] = useState(listsData)

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
    
    return (
        <div id='workflowPage'>
            <PageHeading 
                heading="Workflow"
                subHeading={`Welcome to the workflow area`}
                suffix="Drag-n-drop the tasks to move them."
            />

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