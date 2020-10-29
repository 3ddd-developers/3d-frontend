import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Tab, Table, Form, Button, Badge, Modal } from 'react-bootstrap';

const Mypage = () => {
    const [description, setDescription] = useState('계정 정보를 확인 및 수정할 수 있습니다.');
    const [tab, setTab] = useState('account');
    const [disable, setDisable] = useState({ nickname: true, email: true });

    // Modal
    const [show, setShow] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleClose = () => {
        showCancelModal ? setShowCancelModal(false) : setShowDeleteModal(false)
    }

    const handleShowCancelModal = () => {
        // 로그인 되어 있지 않으면 로그인 페이지로 라우팅
        setShowCancelModal(true);
    }

    const handleShowDeleteModal = () => {
        // 로그인 되어 있지 않으면 로그인 페이지로 라우팅
        setShowDeleteModal(true);
    }

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

    const onClickStudy = evt => {
        // console.log(evt.target.id);
        // TODO: API 연동 
        // 모집 현황 및 지원 현황 모두 스터디 디테일 페이지로 라우팅 해주면 됨 
        window.location.href = `/#/studyDetail/${evt.target.id}`;
    }

    const handleCancel = () => {
        // TODO: 스터디 지원 취소
    }

    const handleDelete = () => {
        // TODO: 스터디 삭제
    }

    useEffect(() => {
        if (!window.localStorage.getItem('userId')) {
            window.location.href = '/#/login';
            return;
        }
    }, []);

    // sample
    const studyList = [
        {
            key: 1,
            title: '리액트 스터디 모집해요!',
            state: '모집중',
            status: '2 / 4'
        }, {
            key: 2,
            title: '알고리즘 공부 하실분',
            state: '모집중',
            status: '1 / 3'
        }, {
            key: 3,
            title: '**자바 스터디 모집**',
            state: '모집완료',
            status: '3 / 3'
        },
    ]

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
                                {studyList.map(study => <tr style={{ cursor: 'pointer' }} key={study.key}><td id={study.key} onClick={onClickStudy}>{study.title}</td><td>{study.state}{study.state === '모집중' && <Badge variant="danger" style={{ cursor: 'pointer', marginLeft: '3px' }} onClick={handleShowDeleteModal}>삭제하기</Badge>}</td><td>{study.status}</td></tr>)}
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
                                {studyList.map(study => <tr key={study.key}><td id={study.key} onClick={onClickStudy} style={{ cursor: 'pointer' }}>{study.title}</td><td>{study.state}{study.state === '모집중' && <Badge variant="danger" style={{ cursor: 'pointer', marginLeft: '3px' }} onClick={handleShowCancelModal}>취소하기</Badge>}</td><td>{study.status}</td></tr>)}
                            </tbody>
                        </Table>
                    </Row>
                    <Modal show={showCancelModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className='modal-title'>스터디 지원 취소</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: '13px' }}>스터디 지원을 취소하시겠습니까?
                </Modal.Body>
                        <Modal.Footer>

                            <Button className="form-button" style={{ width: '100px', backgroundColor: '#80AAA6', borderColor: '#80AAA6' }} onClick={handleCancel}>
                                네
          </Button>
                            <Button className="form-button" style={{ width: '100px', backgroundColor: '#D7CDC2', borderColor: '#D7CDC2', marginLeft: '10px' }} onClick={handleClose}>
                                아니오
          </Button>
                        </Modal.Footer>
                    </Modal>

                    <Modal show={showDeleteModal} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title className='modal-title'>스터디 삭제</Modal.Title>
                        </Modal.Header>
                        <Modal.Body style={{ fontSize: '13px' }}>모집중인 스터디를 삭제하시겠습니까?
                </Modal.Body>
                        <Modal.Footer>

                            <Button className="form-button" style={{ width: '100px', backgroundColor: '#80AAA6', borderColor: '#80AAA6' }} onClick={handleDelete}>
                                네
          </Button>
                            <Button className="form-button" style={{ width: '100px', backgroundColor: '#D7CDC2', borderColor: '#D7CDC2', marginLeft: '10px' }} onClick={handleClose}>
                                아니오
          </Button>
                        </Modal.Footer>
                    </Modal>
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