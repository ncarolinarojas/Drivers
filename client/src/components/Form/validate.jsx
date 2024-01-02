const validate = (form, error, setError) => {

    let isValid = true 

    if (!form.forename || !form.surname || !form.description || !form.image || !form.nacionality || !form.birth) setError({...error, message: 'all campus need information to create a driver'});
    else setError({...error, forename: ''});

    if (/^[a-zA-Z\s']+$/.test(form.forename)) {
        setError({...error, forename: ''})
    } else {
        setError({...error, forename: 'forename have to be a name, not a number'})
        isValid = false
    }

    if (/^[a-zA-Z\s']+$/.test(form.surname)) {
        setError({...error, forename: ''})
    } else {
        setError({...error, forename: 'surname have to be a name, not a number'})
        isValid = false
    }

    return isValid
}

export default validate;