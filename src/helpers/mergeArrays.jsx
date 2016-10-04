const mergeArrays = (a, b) => {
    let newArr = [];
    a.forEach((av) => newArr.push(b.find((bv) => bv._id === av._id) || av));
    a.forEach((av) => {
        if(newArr.some((bv) => bv._id === av._id))
            newArr.push(av);
    };
    return newArr;
};

export default mergeArrays;
