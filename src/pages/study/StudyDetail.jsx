import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';
import classNames from 'classnames';


const StudyDetail = props => {

    const [show, setShow] = useState(false);
    const [applyContent, setApplyContent] = useState('');
    const [error, setError] = useState(false);

    // 제목, 상태, 주제, 지역, 모집인원, 내용
    const [title, setTitle] = useState('리액트 스터디 구해요!');
    const [status, setStatus] = useState('모집중');
    const [subject, setSubject] = useState('리액트');
    const [region, setRegion] = useState('경기/판교');
    const [number, setNumber] = useState(5);
    const [content, setContent] = useState('평일에 리액트 스터디 하실분 구해요!');

    const handleClose = () => setShow(false);
    const handleShow = () => {
        // 로그인 되어 있지 않으면 로그인 페이지로 라우팅
        if (!window.localStorage.getItem('userId')) window.location.href = '/#/login'

        setShow(true);
    }

    const handleApply = () => {
        if (applyContent.length > 500) {
            setError(true);
            return;
        }

        if (error) return;

        // TODO API 연동
        return;
        let json = {
            post_seq: props.match.params.id,
            apply_userId: window.localStorage.getItem('userId'),
            content: applyContent
        };

        axios.post(`/api/study/apply/${props.match.params.id}`, json)
            .then(function (response) {
                // console.log(response);
                window.location.href = '/#/mypage';
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onFocus = () => setError(false);

    const onChange = evt => {
        setApplyContent(evt.target.value);
    }

    const goMain = () => {
        window.location.href = '/';
    }

    useEffect(() => {
        // console.log(props.match.params.id);
        return;

        axios.get(`/api/study/post/${props.match.params.id}`)
            .then(function (response) {
                // console.log(response);
                // TODO Get study API 연동
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
            <Form style={{ width: '500px', margin: 'auto' }}>

                <Form.Group controlId="title">
                    <Form.Label className="form-label">제목</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={title} />

                </Form.Group>
                <Form.Group controlId="status">
                    <Form.Label className="form-label">상태</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={status} />

                </Form.Group>
                <Form.Group controlId="subject">
                    <Form.Label className="form-label">주제</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={subject} />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group controlId="region">
                            <Form.Label className="form-label">지역</Form.Label>
                            <Form.Control plaintext readOnly defaultValue={region} >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="number">
                            <Form.Label className="form-label">모집인원</Form.Label>
                            <Form.Control plaintext readOnly defaultValue={number} >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="content">
                    <Form.Label className="form-label">내용</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={content} />

                </Form.Group>
                <Row style={{ justifyContent: 'center', marginTop: '60px' }}>
                    {status === '모집중' && <Button onClick={handleShow} className="form-button" style={{ backgroundColor: '#80AAA6', borderColor: '#80AAA6' }}>
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
                        <Form.Control className={classNames({ 'form-error': error })} as="textarea" aria-describedby="contentHelpBlock" onChange={onChange} onFocus={onFocus} rows={3} />
                        <Form.Text className={classNames({ 'form-text-error': error })} id="contentHelpBlock" muted>
                            최대 500자 까지 입력할 수 있습니다.
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