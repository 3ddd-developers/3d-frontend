import React, { useState } from 'react';

import { Form, Button, Row, Col } from 'react-bootstrap';
import { CgAsterisk } from "react-icons/cg";
import axios from 'axios';
import classNames from 'classnames';
const SignUp = () => {
    const [error, setError] = useState('');
    const onChange = evt => {

    }
    const handleSubmit = () => {

    }
    const onFocus = () => {

    }
    const onClickCancel = () => {

    }
    return (
        <>
            <Row style={{ justifyContent: 'center' }}>
                <h2 className="form-title">회원가입</h2>
            </Row>
            <Row style={{ justifyContent: 'center' }}><p className="form-description">3D 가입을 위한 정보를 입력해 주세요.</p></Row>

            <hr className="form-hr" />
            <Form style={{ width: '500px', margin: 'auto' }} onSubmit={handleSubmit} >

                <Form.Group controlId="title">
                    <Form.Label className="form-label">닉네임<CgAsterisk className="form-required" /></Form.Label>
                    <Form.Control className={classNames({ 'form-error': error.title })} required aria-describedby="titleHelpBlock" placeholder="홍길동" onChange={onChange} onFocus={onFocus} />

                </Form.Group>
                <Form.Group controlId="subject">
                    <Form.Label className="form-label">이메일<CgAsterisk className="form-required" /></Form.Label>
                    <Form.Control required placeholder="ex) example@gmail.com" onChange={onChange} />
                    <Form.Text className={classNames({ 'form-text-error': error.title })} id="titleHelpBlock" muted>
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