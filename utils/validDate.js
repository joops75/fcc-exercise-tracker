const daysPerMonth = {
    '01': 31, '02': 29, '03': 31, '04': 30, '05': 31, '06': 30,
    '07': 31, '08': 31, '09': 30, '10': 31, '11': 30, '12': 31
}

function validDate(str) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(str)) return false;
    const arr = str.split('-');
    if (+arr[1] < 1 || +arr[1] > 12) return false;
    if (+arr[2] < 1 || +arr[2] > daysPerMonth[arr[1]]) return false;
    return true;
}

module.exports = validDate;