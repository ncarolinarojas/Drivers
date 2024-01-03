import axios from 'axios';

const getDrivers = () => {
    axios.get('http://localhost:5000/drivers')
        .then((res) => res.data)
        .catch((error) => console.log(error))
}

export default getDrivers;