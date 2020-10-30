import React, { useState, useEffect } from 'react';
import { Row, Col, Tabs, Tab, Table, Form, Button, Badge, Modal } from 'react-bootstrap';
import STUDY_API from '../api/STUDY_API';
import USER_API from '../api/USER_API';
import { STATUS_CODE } from '../pages/study';

const Mypage = () => {
    const [description, setDescription] = useState('계정 정보를 확인 및 수정할 수 있습니다.');
    const [tab, setTab] = useState('account');
    const [disable, setDisable] = useState({ nickname: true, email: true });
    const [studyList, setStudyList] = useState([]); // 모집 스터디
    const [applyList, setApplyList] = useState([]); // 지원 스터디
    const [selected, setSelected] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState(email);

    // Modal
    const [show, setShow] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleClose = () => {
        showCancelModal ? setShowCancelModal(false) : setShowDeleteModal(false)
    }

    const handleShowCancelModal = evt => {
        // 로그인 되어 있지 않으면 로그인 페이지로 라우팅
        setSelected(evt.target.getAttribute('value'));
        setShowCancelModal(true);
    }

    const handleShowDeleteModal = evt => {
        // 로그인 되어 있지 않으면 로그인 페이지로 라우팅
        setSelected(evt.target.getAttribute('value'));
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

    const onClickManage = evt => {
        // console.log(evt.target.getAttribute('value'));
        window.location.href = `/#/manage/${evt.target.getAttribute('value')}`;
    }

    const handleCancel = () => {
        // TODO: 스터디 지원 취소
        let json = {
            applySeq: selected,
            applyStatus: 'SS40'
        }
        // console.log(json)
        STUDY_API.cancelApply(selected, json)
            .then(response => {
                handleClose();
                // window.location.href = '/#/mypage';
                setTab('account');
            })
            .catch(err => {

            });
    }

    const handleDelete = () => {
        STUDY_API.getStudy(selected)
            .then(response => {
                let json = {
                    title: response.data.response.post.title,
                    content: response.data.response.post.content,
                    memberNumber: response.data.response.post.memberNumber,
                    statusSeq: response.data.response.post.statusSeq.value,
                    placeSeq: response.data.response.post.placeSeq.value,
                    subjectSeq: response.data.response.post.subjectSeq
                }

                STUDY_API.deleteStudy(selected, json)
                    .then(response => {
                        // console.log(response.data.success);
                        handleClose();
                        USER_API.getMyStudy(window.sessionStorage.getItem('id'))
                            .then(response => {
                                // console.log(response);
                                let arr = [];
                                response.data.response.posts.forEach(item => {
                                    arr.push({
                                        key: item.seq,
                                        title: item.title,
                                        state: STATUS_CODE[item.statusSeq.value]
                                    })
                                });
                                setStudyList(arr);
                            })
                            .catch(err => {
                                console.log(err);
                            })
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }

    useEffect(() => {
        if (!window.sessionStorage.getItem('id')) {
            window.location.href = '/#/login';
            return;
        }

        USER_API.getMyInfo(window.sessionStorage.getItem('id'))
            .then(response => {
                // console.log(response)
                setName(response.data.response.name);
                setEmail(response.data.response.email.address);
            })
            .catch(err => {
                console.log(err)
            })

        USER_API.getMyStudy(window.sessionStorage.getItem('id'))
            .then(response => {
                // console.log(response);
                let arr = [];
                response.data.response.posts.forEach(item => {
                    arr.push({
                        key: item.seq,
                        title: item.title,
                        state: STATUS_CODE[item.statusSeq.value]
                    })
                });
                setStudyList(arr);
            })
            .catch(err => {
                console.log(err);
            })

        USER_API.getMyApply(window.sessionStorage.getItem('id'))
            .then(response => {
                // console.log(response);
                let arr = [];
                response.data.response.forEach(item => {
                    arr.push({
                        key: item.seq,
                        title: item.applyPost.title,
                        state: STATUS_CODE[item.applyStatus.value]
                    })
                });
                setApplyList(arr);
            })
            .catch(err => {
                console.log(err);
            })
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
                                        <Form.Control disabled={disable.nickname} defaultValue={name} />
                                    </Col>
                                    <Col sm='2'>
                                        {/* <Button name="nickname" className='account-button' onClick={onEditNickname}> */}
                                        <Button name="nickname" disabled className='disable-button' style={{ backgroundColor: 'gray', borderColor: 'gray' }}>
                                            {disable.nickname ? '수정' : '저장'}
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group controlId="email">
                                <Form.Label className="form-label">이메일</Form.Label>
                                <Row>
                                    <Col sm='10'>
                                        <Form.Control disabled={disable.email} type='email' defaultValue={email} />
                                    </Col>
                                    <Col sm='2'>
                                        {/* <Button name="email" className='account-button' onClick={onEditEmail}> */}
                                        <Button name="email" disabled className='disable-button' style={{ backgroundColor: 'gray', borderColor: 'gray' }}>
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
                                    <th>지원 현황</th>
                                </tr>
                            </thead>
                            <tbody>
                                {studyList.map(study => <tr key={study.key}><td id={study.key} onClick={onClickStudy} style={{ cursor: 'pointer' }}>{study.title}</td><td>{study.state}{study.state === '모집중' && <Badge variant="danger" style={{ cursor: 'pointer', marginLeft: '3px' }} onClick={handleShowDeleteModal} value={study.key}>삭제하기</Badge>}</td><td><Badge variant="info" pill style={{ cursor: 'pointer' }} onClick={onClickManage} value={study.key}>관리하기</Badge></td></tr>)}
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
                                    {/* <th>현황</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {applyList.map(apply => <tr key={apply.key}><td id={apply.key} onClick={onClickStudy} style={{ cursor: 'pointer' }}>{apply.title}</td><td>{apply.state}{apply.state === '대기중' && <Badge variant="warning" style={{ cursor: 'pointer', marginLeft: '3px' }} onClick={handleShowCancelModal} value={apply.key}>취소하기</Badge>}</td>
                                    {/* <td>{study.status}</td> */}
                                </tr>)}
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