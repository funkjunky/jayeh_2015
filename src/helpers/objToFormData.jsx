const objToFormData = (obj) => Object.keys(obj).reduce((formData, key) => {
    formData.append(key, obj[key]);
    return formData;
}, new FormData());

export default objToFormData;
