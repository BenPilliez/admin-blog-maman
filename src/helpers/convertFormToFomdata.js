export const converFormToFormData = (form) => {
    let formData = new FormData()
    for (let key of Object.keys(form)) {
        if (typeof form[key] === 'object') {
            if (form[key].length > 1) {
                form[key].map((item) => {
                    return formData.append(key, item)
                })
            } else {
                formData.append(key, form[key])
            }

        } else {

            formData.append(key, form[key])
        }
    }

    return formData

}
