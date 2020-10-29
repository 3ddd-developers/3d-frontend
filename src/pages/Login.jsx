import React from 'react';
import { Button, Row, Container, Col } from 'react-bootstrap';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import config from '../../config';

const Login = () => {
    const onGoogleClick = () => {
        // TODO: 소셜 계정 연동
        console.log('google login');
    }

    const onGitHubClick = () => {
        window.location.href = `https://github.com/login/oauth/authorize?client_id=${config.github.client_id}&redirect_uri=https://localhost:9000`;
    }

    return (
        <>
            <Row style={{ justifyContent: 'center' }}><Button style={{ width: '360px', height: '50px', fontWeight: '500' }} variant="dark" onClick={onGitHubClick}><FaGithub style={{ width: '25px', height: '25px', marginRight: '5px' }} />GitHub 계정으로 로그인</Button></Row>
            <Row style={{ justifyContent: 'center' }}><Button variant="secondary" style={{ width: '360px', height: '50px', fontWeight: '500', marginTop: '5px' }} disabled onClick={onGoogleClick}><FcGoogle style={{ width: '25px', height: '25px', marginRight: '5px' }} />Google 계정으로 로그인</Button></Row>
        </>
    );
};

export default Login;