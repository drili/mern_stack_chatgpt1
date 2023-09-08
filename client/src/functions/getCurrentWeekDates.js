const getCurrentWeekDates = () => {
    const currentDate = new Date()
    const currentDayOfWeek = currentDate.getDay()
    const monday = new Date(currentDate)
    monday.setDate(currentDate.getDate() - currentDayOfWeek + 1)

    const dates = []

    for (let i = 0; i < 5; i++) {
        const date = new Date(monday)
        date.setDate(monday.getDate() + i)
        const formattedDate = date.toLocaleDateString('da-DK', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).replace(/\./g, '-')
        dates.push(formattedDate)
    }

    return dates
}

export default getCurrentWeekDates
