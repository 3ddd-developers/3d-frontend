import axios from 'axios';
import config from '../../config';

const axios_study = axios.create({
    baseURL: config.study
});

const STUDY_API = {
    getStudyList(data) {
        return axios_study.get('/post' + data);
    },
    // TODO
}

export default STUDY_API;
