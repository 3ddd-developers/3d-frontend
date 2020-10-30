import axios from 'axios';
import config from '../../config';

const axios_user = axios.create({
    baseURL: config.user
});

const USER_API = {
    getMyStudy(data) {
        return axios_user.get(`/mypage/${data}/post`);
    },
    // getMyApply(data) {
    //     return axios_user.get(`/mypage/${data}/post/apply`);
    // },
    getMyApply(data) {
        return axios_user.get(`/mypage/${data}/apply`);
    },
    getMyInfo(data) {
        return axios_user.get(`/mypage/${data}`);
    },
    // TODO
    updateMyInfo(data) {

    },
    registerUser(data) {
        return axios_user.post('join', data);
    },
    exists(data) {
        return axios_user.post('exists', data);
    }
}

export default USER_API;
