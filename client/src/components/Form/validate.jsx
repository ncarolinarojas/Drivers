const validate = (form, error, setError) => {

    let isValid = true

    if (!form.forename.trim()) {
        setError((prevError) => ({ ...prevError, forename: 'required' }));
        isValid = false;
    } else setError((prevError) => ({ ...prevError, forename: '' }));

    if (!form.surname.trim()) {
        setError((prevError) => ({ ...prevError, surname: 'required' }));
        isValid = false;
    } else setError((prevError) => ({ ...prevError, surname: '' }));
    
    if (!form.description.trim()) {
        setError((prevError) => ({ ...prevError, description: 'required' }));
        isValid = false;
    } else setError((prevError) => ({ ...prevError, description: '' }));

    if (/\.(jpeg|jpg|gif|png|bmp)$/i.test(form.image)) {
        setError((prevError) => ({ ...prevError, image: 'required' }));
        isValid = false;
    } else setError((prevError) => ({ ...prevError, image: '' }));

    if (!form.nacionality.trim()) {
        setError((prevError) => ({ ...prevError, nacionality: 'required' }));
        isValid = false;
    } else setError((prevError) => ({ ...prevError, nacionality: '' }));

    if (!form.birth || form.birth === "YYYY-MM-DD") {
        setError((prevError) => ({ ...prevError, birth: 'required' }));
        isValid = false;
    } else setError((prevError) => ({ ...prevError, birth: '' }));

    return isValid
}

export default validate;