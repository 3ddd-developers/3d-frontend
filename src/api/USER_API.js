import axios from 'axios';
import config from '../../config';

const axios_user = axios.create({
    baseURL: config.user
});

const USER_API = {
    // TODO
    registerUser(data) {
        return axios_user.post(data);
    },
}

export default USER_API;
