import { useState } from "react";
import validate from "./validate";
import axios from 'axios';

function Form() {

    const [driver, setDriver] = useState({
        forename: "",
        surname: "",
        description: "",
        image: "",
        nacionality: "",
        birth: "",
        teams: []
    })

    const [error, setError] = useState({
        forename: "",
        surname: "",
        description: "",
        image: "",
        nacionality: "",
        birth: "",
        message: ""
    })

    const handleChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setDriver({ ...driver, [property]: value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validate(driver, error, setError)) {
            return;
        }

        axios.post('http://127.0.0.1:3001/postDriver', driver)
            .then((res) => {
                if (res.status === 200) {
                    alert('driver created')
                    setDriver({
                        forename: "",
                        surname: "",
                        description: "",
                        image: "",
                        nacionality: "",
                        birth: ""
                    })
                } else {
                    console.error('Error creating activity');
                    alert('error creating')
                }
            })
            .catch((error) => {
                alert(error)
            })

        console.log('esta funcionando')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='forename'>Name</label>
                    <input
                        type='text'
                        name='forename'
                        value={driver.forename}
                        onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor='surname'>Last Name</label>
                    <input
                        type='text'
                        name='surname'
                        value={driver.surname}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='description'>Description</label>
                    <input
                        type='text'
                        name='description'
                        value={driver.description}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='image'>URL image</label>
                    <input
                        type='text'
                        name='image'
                        value={driver.image}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='nacionality'>Nationality</label>
                    <input
                        type='text'
                        name='nacionality'
                        value={driver.nacionality}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='birth'>Birth</label>
                    <input
                        type='date'
                        name='birth'
                        value={driver.birth}
                        onChange={handleChange}
                    />
                </div>
                <span> {error.message}</span>
                <button type="submit" className='submit'>Submit</button>

            </form>
        </div>
    )
}

export default Form