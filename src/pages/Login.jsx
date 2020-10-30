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
            <Container style={{ minHeight: '405px', paddingTop: '5%' }}>
                <Row style={{ justifyContent: 'center' }}>
                    <h2 className="form-title">로그인</h2>
                </Row>
                <Row style={{ justifyContent: 'center', marginTop: '15px' }}>GitHub 또는 Google 계정으로 3D 서비스를 이용할 수 있습니다.</Row>
                <Row style={{ justifyContent: 'center', marginTop: '20px' }}><Button style={{ width: '360px', height: '50px', fontWeight: '500' }} variant="dark" onClick={onGitHubClick}><FaGithub style={{ width: '25px', height: '25px', marginRight: '5px' }} />GitHub 계정으로 로그인</Button></Row>
                <Row style={{ justifyContent: 'center' }}><Button variant="secondary" style={{ width: '360px', height: '50px', fontWeight: '500', marginTop: '15px' }} disabled onClick={onGoogleClick}><FcGoogle style={{ width: '25px', height: '25px', marginRight: '5px' }} />Google 계정으로 로그인</Button></Row>

            </Container>

        </>
    );
};

export default Login;