import React, { useEffect } from 'react'

const DashboardActivityCard = ({ data }) => {

    const accumulateTimeByType = (data) => {
        const timeAccumulated = {
            intern: 0,
            client: 0,
            offtime: 0,
            sicktime: 0
        }

        data.forEach(item => {
            if (item.registrationType in timeAccumulated) {
                timeAccumulated[item.registrationType] += item.timeRegistered
            }
        })

        return timeAccumulated
    }

    const accumulatedTime = accumulateTimeByType(data)

    return (
        <>
            <h3 className="font-bold">Your recent activity this sprint</h3>
            <div id="recentActivity" className="grid grid-cols-2 place-items-center text-center">
                <div className="w-full py-5 px-2 border-r border-b border-solid border-gray-100">
                    <h2 className="text-amber-400 font-bold">{accumulatedTime.intern} hours</h2>
                    <p>Intern time</p>
                </div>
                <div className="w-full py-5 px-2 border-l border-b border-solid border-gray-100">
                    <h2 className="text-amber-400 font-bold">{accumulatedTime.client} hours</h2>
                    <p>Client time</p>
                </div>
                <div className="w-full py-5 px-2 border-r border-t border-solid border-gray-100">
                    <h2 className="text-amber-400 font-bold">{accumulatedTime.offtime} hours</h2>
                    <p>Off time</p>
                </div>
                <div className="w-full py-5 px-2 border-l border-t border-solid border-gray-100">
                    <h2 className="text-amber-400 font-bold">{accumulatedTime.sicktime} hours</h2>
                    <p>Sick time</p>
                </div>
            </div>

            <span>
                <p>Percentage allocated from time registrations based on task information.</p>
            </span>
        </>
    )
}

export default DashboardActivityCard