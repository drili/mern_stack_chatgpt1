import React from 'react'
import { Card } from "flowbite-react"

const DashboardCards = ({
    totalAccumulatedTime,
    workDays,
    finishedTasks,
    tasks,
    totalAllocatedTimeLow,
    totalAllocatedTimeHigh
}) => {
    return (
        <>
            <span>
                <Card className="h-full">
                    <div>
                        <span className="flex flex-col gap-2 mb-5">
                            <h3 className="font-bold">Your Time Registered This Sprint</h3>
                            <h2 className="text-4xl font-bold">{totalAccumulatedTime} hours</h2>
                        </span>

                        <span className="flex flex-col gap-2">
                            <span className="relative">
                                <span className="line absolute block h-[2px] bg-slate-100 w-full"></span>
                                <span
                                    className={`line absolute block h-[2px] bg-slate-500`}
                                    style={{ width: `${parseFloat((totalAccumulatedTime / (workDays * 8)) * 100, 2).toFixed(0)}%` }}
                                ></span>
                            </span>
                            <p className="text-sm">{parseFloat((totalAccumulatedTime / (workDays * 8)) * 100, 2).toFixed(2)}% of total ({workDays * 8} hours)</p>
                        </span>
                    </div>
                </Card>
            </span>

            <span>
                <Card className="h-full">
                    <span className="flex flex-col gap-2 mb-5">
                        <h3 className="font-bold">Finished tasks this sprint</h3>
                        <h2 className="text-4xl font-bold">{finishedTasks.length} tasks</h2>
                    </span>

                    <span className="flex flex-col gap-2">
                        <span className="relative">
                            <span className="line absolute block h-[2px] bg-slate-100 w-full"></span>
                            <span
                                className={`line absolute block h-[2px] bg-slate-500`}
                                style={{ width: `${parseFloat((finishedTasks.length / tasks.length) * 100, 2).toFixed(0)}%` }}
                            ></span>
                        </span>
                        <p className="text-sm">{parseFloat((finishedTasks.length / tasks.length) * 100, 2).toFixed(2)}% of total ({tasks.length} tasks)</p>
                    </span>
                </Card>
            </span>

            <span>
                <Card className="h-full">
                    <span className="flex flex-col gap-2 mb-5">
                        <h3 className="font-bold">Total allocated time this sprint</h3>
                        <h2 className="text-4xl font-bold">
                            {parseFloat((totalAllocatedTimeLow + totalAllocatedTimeHigh) / 2)} hours
                        </h2>
                    </span>

                    <span className="flex flex-col gap-2">
                        <p className="text-sm">Allocated Low: <b>{totalAllocatedTimeLow}</b> • Allocated High: <b>{totalAllocatedTimeHigh}</b></p>
                    </span>
                </Card>
            </span>
        </>
    )
}

export default DashboardCards