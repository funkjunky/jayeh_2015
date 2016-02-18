var FormatDate = function(timestamp) {
    var date = new Date(parseInt(timestamp));
    return date.toDateString();
};

module.exports = FormatDate;
