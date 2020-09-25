import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-app-f1d34.firebaseio.com/'
});

export default instance;