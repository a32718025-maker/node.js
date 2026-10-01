function isDate(x) {
    return Object.prototype.toString.call(x) === '[object Date]';
}

module.exports = {
    isDate: isDate
};
