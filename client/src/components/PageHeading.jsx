import React, { useContext } from 'react'
import { UserContext } from '../context/UserContext';

const PageHeading = ({ heading, subHeading, suffix }) => {
    const { user } = useContext(UserContext)

    return (
        <div id='pageHeading' className='mb-10'>
            <h1 className='font-bold mb-5'>{ heading }</h1>
            <h5>{ subHeading }, <b>{ user && user.username }</b>. { suffix }</h5>
        </div>
    )
}

export default PageHeading