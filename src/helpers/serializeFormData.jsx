const serializeFormData = (formData) => {
    let obj = {};
    for(let [key, val] of formData.entries()) {
        switch(val) {
            case 'false':
                obj[key] = false; break;
            case 'null':
                obj[key] = null; break;
            case 'undefined':
                obj[key] = undefined; break;
            default:
                obj[key] = val;
        }
    }

    return obj;
};

export default serializeFormData;
