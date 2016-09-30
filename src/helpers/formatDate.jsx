var formatDate = function(timestamp) {
    var date = new Date(parseInt(timestamp));
    return date.toDateString();
};

export default formatDate;
