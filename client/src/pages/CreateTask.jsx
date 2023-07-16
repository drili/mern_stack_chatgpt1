import React from 'react'
import PageHeading from '../components/PageHeading'

const CreateTask = () => {
    return (
        <div id='createTaskPage'>
            <PageHeading 
                heading="Create Task"
                subHeading={`Create a new task.`}
                suffix="Complete the form and submit the data"
            />

            <section className='grid grid-cols-2 gap-10 mb-10'>
                <span>
                    <h1>Test</h1>
                </span>
            </section>
        </div>
    )
}

export default CreateTask