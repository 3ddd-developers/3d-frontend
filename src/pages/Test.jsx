import React from 'react';
import qs from 'qs';
import axios from 'axios';

const Test = () => {
    const { code } = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
    });

    // if (code) window.sessionStorage.setItem('gcode', code);
    if (code) {
        let json = {
            code: code,
            client_id: 'b2d5bcafe57172c77c97',
            client_secret: '75bf0b3a856e6a9756fdffb5579e4bc4a1ca637f'
        }

        let client_id = 'b2d5bcafe57172c77c97', client_secret = '75bf0b3a856e6a9756fdffb5579e4bc4a1ca637f';

        axios.get(`/github/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`)
            .then(function (response) {
                // console.log(response);
                if (response.data.includes('error')) {
                    // TODO
                    // 에러 처리
                    return;
                }
                let at = response.data.slice(response.data.indexOf('=') + 1, response.data.indexOf('&'));
                window.localStorage.setItem('at', at);
            })
            .catch(function (error) {
                console.log(error);
            });

        // axios.get('/github/login/oauth/authorize', {
        //     params: {
        //         code: code,
        //         client_id: 'b2d5bcafe57172c77c97',
        //         client_secret: '75bf0b3a856e6a9756fdffb5579e4bc4a1ca637f'
        //     }
        // })
        //     .then(function (response) {
        //         console.log(response);
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

    }


    return (
        <>
            Test
        </>
    );
};

export default Test;