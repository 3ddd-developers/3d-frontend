import axios from 'axios';
import config from '../../config';

const axios_study = axios.create({
    baseURL: config.study
});

const STUDY_API = {
    getStudy(data) {
        return axios_study.get('/post/' + data);
    },
    createStudy(data) {
        return axios_study.post('/post', data);
    },
    // TODO
    postApply(id, data) {
        return axios_study.post(`/apply/${id}`, data);
    },
    cancelApply(id, data) {
        return axios_study.put(`/apply/status/${id}`, data);
    },
    deleteStudy(id, data) {
        return axios_study.delete(`/post/${id}`, {
            data: data
        })
    },
    updateStudy(id, data) {
        return axios_study.put(`/post/${id}`, data)
    }
}

export default STUDY_API;
