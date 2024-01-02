import axios from 'axios';

const teams = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:3001/teams');
    if (response.status === 200) {
      const teams = response.data;
      const teamsOptions = teams.map((team) => ({
        id: team.id,
        name: team.name,
      }));

      return teamsOptions;
    } else {
      throw new Error('Error getting teams');
    }
  } catch (error) {
    console.error('Error fetching teams:', error);
  }
};

export default teams;