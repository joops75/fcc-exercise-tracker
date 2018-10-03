function zeroFill(num) {
    if (num >= 10) return num;
    return '0' + num;
}

function getDateString() {
    const date = new Date();
    return `${date.getFullYear()}-${zeroFill(date.getMonth() + 1)}-${zeroFill(date.getDate())}`
}

module.exports = getDateString;