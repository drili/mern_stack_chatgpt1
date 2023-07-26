import { useState } from 'react'

const useTaskModal = () => {
    const [selectedTaskId, setSelectedTaskId] = useState(null)
    const [showModal, setShowModal] = useState(false)

    const handleTaskModal = (taskId) => {
        setShowModal(true)
        setSelectedTaskId(taskId)
    }

    const onCloseModal = () => {
        setShowModal(false)
    }

    return {
        selectedTaskId,
        showModal,
        handleTaskModal,
        onCloseModal,
    }
}

export default useTaskModal