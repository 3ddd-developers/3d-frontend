import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Tab, Table, Form, Button } from 'react-bootstrap';

const Mypage = () => {
    const [description, setDescription] = useState('계정 정보를 확인 및 수정할 수 있습니다.');
    const [tab, setTab] = useState('account');
    const [disable, setDisable] = useState({ nickname: true, email: true });

    const onEditNickname = evt => {
        if (disable.nickname) {
            setDisable({ ...disable, nickname: false });
        } else {
            // TODO: Validation, Update API 호출 
            setDisable({ ...disable, nickname: true });
        }
    }

    const onEditEmail = evt => {
        if (disable.email) {
            setDisable({ ...disable, email: false });
        } else {
            // TODO: Validation, Update API 호출 
            setDisable({ ...disable, email: true });
        }
    }



    const onSelect = t => {
        setTab(t);
        switch (t) {
            case 'account':
                setDescription('계정 정보를 확인 및 수정할 수 있습니다.');
                break;
            case 'study':
                setDescription('나의 스터디 모집 및 지원 현황을 확인할 수 있습니다.');
                break;
            case 'project':
                setDescription('나의 프로젝트 모집 및 지원 현황을 확인할 수 있습니다.');
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (!window.localStorage.getItem('userId')) {
            window.location.href = '/#/login';
            return;
        }
    }, []);

    return (
        <>
            <Row style={{ justifyContent: 'center' }}>
                <h2 className="form-title">마이 페이지</h2>
            </Row>
            <Row style={{ justifyContent: 'center', marginTop: '15px' }}><p className="form-description">{description}</p></Row>

            <Tabs className='mypage' activeKey={tab} id="tab" onSelect={onSelect}>
                <Tab eventKey="account" title="계정 관리">
                    <Row className='account'>
                        <Form style={{ width: '500px', margin: 'auto', padding: '20px' }}>

                            <Form.Group controlId="nickname">
                                <Form.Label className="form-label">닉네임</Form.Label>
                                <Row>
                                    <Col sm='10'>
                                        <Form.Control disabled={disable.nickname} defaultValue='taechonkim' />
                                    </Col>
                                    <Col sm='2'>
                                        <Button name="nickname" className='account-button' onClick={onEditNickname}>
                                            {disable.nickname ? '수정' : '저장'}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label className="form-label">이메일</Form.Label>
                                <Row>
                                    <Col sm='10'>
                                        <Form.Control disabled={disable.email} type='email' defaultValue='mirijo02233092@gmail.com' />
                                    </Col>
                                    <Col sm='2'>
                                        <Button name="email" className='account-button' onClick={onEditEmail}>
                                            {disable.email ? '수정' : '저장'}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                        </Form>
                    </Row>
                </Tab>
                <Tab eventKey="study" title="스터디">
                    <Row style={{ justifyContent: 'center', marginTop: '30px' }}>
                        <span style={{ marginBottom: '20px', width: '100%', textAlign: 'center' }}>모집 현황</span>
                        <Table style={{ textAlign: 'center', width: '900px' }} striped bordered hover>
                            <thead>
                                <tr>
                                    <th>제목</th>
                                    <th>상태</th>
                                    <th>현황</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>리액트 스터디 모집해요!</td>
                                    <td>모집중</td>
                                    <td>2 / 4</td>
                                </tr>
                                <tr>
                                    <td>알고리즘 스터디 해요~</td>
                                    <td>모집완료</td>
                                    <td>3 / 3</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                    <Row style={{ justifyContent: 'center', marginTop: '30px' }}>
                        <span style={{ marginBottom: '20px', width: '100%', textAlign: 'center' }}>지원 현황</span>
                        <Table style={{ textAlign: 'center', width: '900px' }} striped bordered hover>
                            <thead>
                                <tr>
                                    <th>제목</th>
                                    <th>상태</th>
                                    <th>현황</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>리액트 스터디 모집해요!</td>
                                    <td>대기중</td>
                                    <td>2 / 4</td>
                                </tr>
                                <tr>
                                    <td>알고리즘 스터디 해요~</td>
                                    <td>거절됨</td>
                                    <td>3 / 3</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                </Tab>
                <Tab eventKey="project" title="프로젝트">
                    {/* TODO */}
                    <Row style={{ justifyContent: 'center' }}>project</Row>
                </Tab>
            </Tabs >





        </>
    );
};

export default Mypage;