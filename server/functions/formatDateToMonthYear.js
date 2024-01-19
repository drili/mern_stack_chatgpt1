function formatDateToMonthYear(dateStr) {
    const parts = dateStr.split('-');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    const date = new Date(year, month, day);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

module.exports = formatDateToMonthYear;
