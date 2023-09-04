import React from 'react'
import { endOfMonth, startOfMonth, differenceInBusinessDays } from "date-fns"

const monthWorkdays = (year, month) => {
    const endOfMonthDate = endOfMonth(new Date(`${month} ${year}`))
    const startOfMonthDate = startOfMonth(new Date(`${month} ${year}`))
    const differenceInBusinessDaysDate = differenceInBusinessDays(endOfMonthDate, startOfMonthDate)

    return differenceInBusinessDaysDate
}

export default monthWorkdays