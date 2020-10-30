import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { CgAsterisk } from "react-icons/cg";
import USER_API from '../api/USER_API';

const SignUp = () => {
    const id = window.location.href.slice(window.location.href.indexOf('=') + 1, window.location.href.indexOf('&'));
    const name = window.location.href.slice(window.location.href.indexOf('name=') + 5, window.location.href.indexOf('&email'));
    const email = window.location.href.slice(window.location.href.indexOf('email=') + 6);

    const [nickname, setNickname] = useState('');
    const [mail, setMail] = useState('');

    const onChange = evt => {
        evt.target.id === 'nickname' ? setNickname(evt.target.value) : setMail(evt.target.value);
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        evt.stopPropagation();

        if (nickname === '' || mail === '') return;

        // TODO: 회원가입 서비스 연동 
        let json = {
            userId: id,
            name: nickname,
            email: mail
        }

        // console.log(json);
        // return;

        USER_API.registerUser(json)
            .then(response => {
                // console.log(response);
                window.sessionStorage.setItem('id', response.data.response);
                // window.sessionStorage.setItem('userId', id);
                window.sessionStorage.setItem('name', nickname);
                window.location.href = '/';
                // TODO: 로그인된 상태로 메인으로 이동하는 로직 추가 (App.jsx useEffect 참고)
                // TODO: 로그인 API 가 별도로 있는지 확인 
            })
            .catch(err => {
                console.log(response);
            })
    }

    const onClickCancel = () => {
        window.location.href = '/';
    }

    useEffect(() => {
        if (name !== 'null') setNickname(name);
        if (email !== 'null') setMail(email);
    }, []);

    return (
        <>
            <Row style={{ justifyContent: 'center' }}>
                <h2 className="form-title">회원가입</h2>
            </Row>
            <Row style={{ justifyContent: 'center' }}><p className="form-description">3D 가입을 위한 정보를 입력해 주세요.</p></Row>

            <hr className="form-hr" />
            <Form style={{ width: '500px', margin: 'auto' }} onSubmit={handleSubmit} >

                <Form.Group controlId="nickname">
                    <Form.Label className="form-label">닉네임<CgAsterisk className="form-required" /></Form.Label>
                    <Form.Control required placeholder="홍길동" defaultValue={name} onChange={onChange} />

                </Form.Group>
                <Form.Group controlId="mail">
                    <Form.Label className="form-label">이메일<CgAsterisk className="form-required" /></Form.Label>
                    <Form.Control required type='email' placeholder="ex) example@gmail.com" defaultValue={email === 'null' ? '' : email} onChange={onChange} />
                    <Form.Text id="titleHelpBlock" muted>
                        스터디/프로젝트 지원 시 지원 결과에 대한 알림을 전송받거나, 스터디/프로젝트 모집 시 모집 현황에 대한 알림을 전송받을 수 있습니다.
  </Form.Text>
                </Form.Group>



                <Row style={{ justifyContent: 'center', marginTop: '60px' }}>
                    <Button type="submit" className="form-button" style={{ backgroundColor: '#80AAA6', borderColor: '#80AAA6' }}>
                        가입하기
  </Button>
                    <Button onClick={onClickCancel} className="form-button" style={{ backgroundColor: '#D7CDC2', borderColor: '#D7CDC2', marginLeft: '10px' }}>
                        취소
  </Button>

                </Row>

            </Form>
        </>
    );
};

export default SignUp;