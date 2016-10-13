const serializeFormData = (formData) => {
    let obj = {};
    for(let [key, val] of formData.entries())
        obj[key] = val;

    return obj;
};

export default serializeFormData;
