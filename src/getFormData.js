export function getFormData(formRef) {
    const formData = new FormData(formRef);
    let arrOfValues = []
    for (const [key, value] of formData) {
        console.log(`${key}: ${value}`);
        arrOfValues.push(value)
    }
    if (arrOfValues.length === 4) {
        arrOfValues.splice(1, 0, "");
    }
    return arrOfValues;
}