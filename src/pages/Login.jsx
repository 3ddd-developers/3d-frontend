import React from 'react';
import { Button, Row, Container, Col } from 'react-bootstrap';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";

const Login = ({ history, location }) => {
    const onGoogleClick = () => {
        // TODO: 소셜 계정 연동
        console.log('google login');
    }

    const onGitHubClick = () => {
        // TODO: 소셜 계정 연동
        console.log('github login');
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=b2d5bcafe57172c77c97&redirect_uri=http://localhost:9000/#/authorized';
    }

    return (
        <>
            <Row style={{ justifyContent: 'center' }}><Button style={{ width: '360px', height: '50px', fontWeight: '500' }} variant="dark" onClick={onGitHubClick}><FaGithub style={{ width: '25px', height: '25px', marginRight: '5px' }} />GitHub 계정으로 로그인</Button></Row>
            <Row style={{ justifyContent: 'center' }}><Button variant="secondary" style={{ width: '360px', height: '50px', fontWeight: '500', marginTop: '5px' }} disabled onClick={onGoogleClick}><FcGoogle style={{ width: '25px', height: '25px', marginRight: '5px' }} />Google 계정으로 로그인</Button></Row>
        </>
    );
};

export default Login;