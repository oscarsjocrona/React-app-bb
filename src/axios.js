import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-fbb73.firebaseio.com/'
});

export default instance;