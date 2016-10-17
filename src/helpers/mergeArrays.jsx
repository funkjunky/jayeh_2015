const mergeArrays = (a, b) => {
    let newArr = [];
    a.forEach((av) => newArr.push(b.find((bv) => bv._id === av._id) || av));
    b.forEach((bv) => {
        if(newArr.indexOf(bv) === -1)
            newArr.push(bv);
    });
    return newArr;
};

export default mergeArrays;
