import { useState, useEffect } from "react";
import validate from "./validate";
import axios from 'axios';
import teams from "./teams";
import '../Form/form.css';

function FormDriver() {

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
                    setError({
                        ...error,
                        forename: '',
                        surname: '',
                        description: '',
                        image: '',
                        nacionality: '',
                        birth: '',
                        message: 'Good job! Created!'
                    })
                    setDriver({
                        forename: "",
                        surname: "",
                        description: "",
                        image: "",
                        nacionality: "",
                        birth: "",
                        teams: []
                    })
                } else {
                    console.error('Error creating activity');
                    alert('error creating')
                }
            })
            .catch((error) => {
                alert(error)
            })
    }

    const [teamsOptions, setTeamsOptions] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            const options = await teams();
            setTeamsOptions(options);
        };

        fetchTeams();
    }, []);

    return (
        <div className='formulario'>
            <form onSubmit={handleSubmit}>
                <h2 className='tracking-in-expand'>Create your driver</h2>
                <div className='item'>
                    <label htmlFor='forename'>Name </label>
                    <input
                        type='text'
                        name='forename'
                        value={driver.forename}
                        onChange={handleChange}
                    />
                    <div>
                        <span className='required'>{error.forename}</span>
                    </div>
                </div>
                <div className='item'>
                    <label htmlFor='surname'>Last Name </label>
                    <input
                        type='text'
                        name='surname'
                        value={driver.surname}
                        onChange={handleChange}
                    />
                    <div>
                        <span className='required'>{error.surname}</span>
                    </div>

                </div>
                <div className='item'>
                    <label htmlFor='description'>Description </label>
                    <input
                        type='text'
                        name='description'
                        value={driver.description}
                        onChange={handleChange}
                    />
                    <div>
                        <span className='required'>{error.description}</span>
                    </div>
                </div>
                <div className='item'>
                    <label htmlFor='image'>URL image </label>
                    <input
                        type='text'
                        name='image'
                        value={driver.image}
                        onChange={handleChange}
                    />
                    <div>
                        <span className='required'>{error.image}</span>
                    </div>
                </div>
                <div className='item'>
                    <label htmlFor='nacionality'>Nationality </label>
                    <input
                        type='text'
                        name='nacionality'
                        value={driver.nacionality}
                        onChange={handleChange}
                    />
                    <div>
                        <span className='required'>{error.nacionality}</span>
                    </div>
                </div>
                <div className='item'>
                    <label htmlFor='birth'>Birth </label>
                    <input
                        type='date'
                        name='birth'
                        value={driver.birth}
                        onChange={handleChange}
                    />
                    <div>
                        <span className='required'>{error.birth} </span>
                    </div>
                </div>

                <div className='teams'>
                    <p>Select teams with control + click in the team and submit</p>
                    <label></label>
                    <select
                        id="teams"
                        onChange={handleChange}
                        multiple
                        style={{ height: "200px" }}
                    >
                        {teamsOptions.map((team) => (
                            <option 
                            key={team.id} 
                            value={team.id}
                            >
                                {team.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <span className='span-general'> {error.message}</span>
                </div>
                <div className='but'>
                    <button type="submit" className='button' >Submit</button>
                </div>


            </form>
        </div>
    )
}

export default FormDriver