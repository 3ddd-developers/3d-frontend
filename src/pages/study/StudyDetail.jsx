import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';
import classNames from 'classnames';
import STUDY_API from '../../api/STUDY_API';
import { STATUS_CODE, SPACE_CODE } from './const.js';

const formatDate = format => {
    let year = format.getFullYear();

    let month = format.getMonth() + 1;
    if (month < 10) month = '0' + month;

    let date = format.getDate();
    if (date < 10) date = '0' + date;

    let hour = format.getHours();
    if (hour < 10) hour = '0' + hour;

    let min = format.getMinutes();
    if (min < 10) min = '0' + min;

    let sec = format.getSeconds();
    if (sec < 10) sec = '0' + sec;

    return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
}

const StudyDetail = props => {

    const [show, setShow] = useState(false);
    const [applyContent, setApplyContent] = useState('');
    const [error, setError] = useState(false);

    // 제목, 상태, 주제, 지역, 모집인원, 내용
    const [title, setTitle] = useState('');
    const [writer, setWriter] = useState('');
    const [writerId, setWriterId] = useState('');
    const [created, setCreated] = useState('');
    const [status, setStatus] = useState('');
    const [subject, setSubject] = useState('');
    const [region, setRegion] = useState('');
    const [number, setNumber] = useState(0);
    const [content, setContent] = useState('');

    const [helpMsg, setHelpMsg] = useState('최대 500자 까지 입력할 수 있습니다.');

    const handleClose = () => setShow(false);
    const handleShow = () => {
        // 로그인 되어 있지 않으면 로그인 페이지로 라우팅
        if (!window.sessionStorage.getItem('id')) window.location.href = '/#/login'

        setShow(true);
    }

    const handleApply = () => {
        if (applyContent.length === 0) {
            setError(true);
            setHelpMsg('내용을 입력해 주세요.');
            return;
        }

        if (applyContent.length > 500) {
            setError(true);
            return;
        }

        if (error) return;

        // TODO API 연동

        let json = {
            userId: window.sessionStorage.getItem('id'),
            content: applyContent
        };

        STUDY_API.postApply(props.match.params.id, json)
            .then(response => {
                // console.log(response);
                handleClose();
                window.location.href = '/#/mypage';
            })
            .catch(err => {
                console.log(err)
            });

    }

    const onFocus = () => setError(false);

    const onChange = evt => {
        if (applyContent.length !== 0 && helpMsg === '내용을 입력해 주세요.') setHelpMsg('최대 500자 까지 입력할 수 있습니다.')
        setApplyContent(evt.target.value);
    }

    const goMain = () => {
        window.location.href = '/';
    }

    useEffect(() => {
        // console.log(props.match.params.id);
        STUDY_API.getStudy(props.match.params.id)
            .then(response => {
                // console.log(response)
                setTitle(response.data.response.post.title);
                setWriter(response.data.response.post.writer.name);
                setWriterId(response.data.response.post.writer.userId.value);
                setCreated(formatDate(new Date(response.data.response.post.createdAt)));
                setStatus(STATUS_CODE[response.data.response.post.statusSeq.value]);
                setSubject(response.data.response.post.subjectSeq);
                setRegion(SPACE_CODE[response.data.response.post.placeSeq.value]);
                setNumber(response.data.response.post.memberNumber);
                setContent(response.data.response.post.content);
            })
            .catch(err => {
                console.log(err)
            })
        return;

        axios.get(`/api/study/post/${props.match.params.id}`)
            .then(function (response) {
                // console.log(response);
                // TODO Get study API 연동
                setTitle(response.title);
                setWriter(response.writer.name);
                setCreated(response.created_at);
                setStatus(response.status_seq);
                setSubject(response.subject_seq);
                setRegion(response.place_seq);
                setNumber(response.member_number);
                setContent(response.content);
            })
            .catch(function (error) {
                console.log(error);
            });


    }, []);

    return (
        <>
            <Row style={{ justifyContent: 'center' }}>
                <h2 className="form-title">스터디 조회</h2>
            </Row>
            <hr className="form-hr" />
            <Form className='study-detail' style={{ width: '500px', margin: 'auto' }}>
                <Form.Group controlId="title">
                    <Form.Label className="form-label">제목</Form.Label>
                    <span>{title}</span>
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group controlId="writer">
                            <Form.Label className="form-label">작성자</Form.Label>
                            <span>{writer}</span>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="created">
                            <Form.Label className="form-label">작성일</Form.Label>
                            <span>{created}</span>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="status">
                    <Form.Label className="form-label">상태</Form.Label>
                    <span>{status}</span>
                </Form.Group>
                <Form.Group controlId="subject">
                    <Form.Label className="form-label">주제</Form.Label>
                    <span>{subject}</span>
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group controlId="region">
                            <Form.Label className="form-label">지역</Form.Label>
                            <span>{region}</span>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="number">
                            <Form.Label className="form-label">모집인원</Form.Label>
                            <span>{number}</span>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="content">
                    <Form.Label className="form-label">내용</Form.Label>
                    <span>{content}</span>
                </Form.Group>
                <Row style={{ justifyContent: 'center', marginTop: '60px' }}>
                    {window.sessionStorage.getItem('id') ? window.sessionStorage.getItem('id') != writerId && status === '모집중' && <Button onClick={handleShow} className="form-button" style={{ backgroundColor: '#80AAA6', borderColor: '#80AAA6' }}>
                        지원하기
  </Button> : status === '모집중' && <Button onClick={handleShow} className="form-button" style={{ backgroundColor: '#80AAA6', borderColor: '#80AAA6' }}>
                            지원하기
  </Button>}
                    <Button onClick={goMain} className="form-button" style={{ backgroundColor: '#D7CDC2', borderColor: '#D7CDC2', marginLeft: '10px' }}>
                        메인으로
  </Button>

                </Row>

            </Form>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='modal-title'>스터디 지원</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: '13px' }}>[{title}] 스터디 관리자에게 전송할 메시지를 입력해 주세요.

                        <Form.Group controlId="content" style={{ marginTop: '10px' }}>
                        <Form.Control required className={classNames({ 'form-error': error })} as="textarea" aria-describedby="contentHelpBlock" onChange={onChange} onFocus={onFocus} rows={3} />
                        <Form.Text className={classNames({ 'form-text-error': error })} id="contentHelpBlock" muted>
                            {helpMsg}
                        </Form.Text>
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button className="form-button" style={{ width: '100px', backgroundColor: '#D7CDC2', borderColor: '#D7CDC2', marginLeft: '10px' }} onClick={handleClose}>
                        취소
          </Button>
                    <Button className="form-button" style={{ width: '100px', backgroundColor: '#80AAA6', borderColor: '#80AAA6' }} onClick={handleApply}>
                        지원하기
          </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default StudyDetail;