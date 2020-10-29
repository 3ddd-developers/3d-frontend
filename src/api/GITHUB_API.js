import axios from 'axios';
import config from '../../config';

const axios_github = axios.create({
    baseURL: config.github
});

const axios_github_api = axios.create({
    baseURL: config.github_api
});

const GITHUB = {
    getAccessToken(data) {
        return axios_github.get(`/github/login/oauth/access_token?client_id=${config.github.client_id}&client_secret=${config.github.client_secret}&code=${data}`);
    }
    // TODO
}

const GITHUB_API = {
    getUserInfo(data) {
        return axios_github_api.get('/api/github/user', {
            headers: {
                Authorization: `token ${data}`,
            },
        });
    },
    // TODO
}

export { GITHUB, GITHUB_API };
