import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';


const ProjectDetail = props => {

    const [show, setShow] = useState(false);
    const [status, setStatus] = useState('FE: 1(0)명, BE: 2(1)명');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleApply = () => {

    }

    const goMain = () => {
        window.location.href = '/';
    }

    useEffect(() => {
        console.log(props.match.params.id);
        // TODO Get project API 연동
    }, []);
    return (
        <>
            <Row style={{ justifyContent: 'center' }}>
                <h2 className="form-title">프로젝트 조회</h2>
            </Row>
            <hr className="form-hr" />
            <Form style={{ width: '500px', margin: 'auto' }}>
                <Form.Group controlId="title">
                    <Form.Label className="form-label">제목</Form.Label>
                    <Form.Control plaintext readOnly defaultValue="'우리동네 맛집' 앱 개발 프로젝트입니다." />
                </Form.Group>
                <Form.Group controlId="number">
                    <Form.Label className="form-label">모집인원</Form.Label>
                    <Form.Control plaintext readOnly defaultValue="3" >
                    </Form.Control>
                </Form.Group>
     
                <Form.Group controlId="status">
                    <Form.Label className="form-label">상태</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={status} />
                </Form.Group>
                <Row>
                     <Col>
                        <Form.Group controlId="region">
                            <Form.Label className="form-label">지역</Form.Label>
                            <Form.Control plaintext readOnly defaultValue="서울 서초" >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="on-offline">
                            <Form.Label className="form-label">모임 방식</Form.Label>
                            <Form.Control plaintext readOnly defaultValue="온오프라인 둘 다" >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            
                <Form.Group controlId="skills">
                    <Form.Label className="form-label">기술 스택</Form.Label>
                    <Form.Control plaintext readOnly defaultValue="swift, spring" >
                    </Form.Control>
                </Form.Group>
                    
                <Form.Group controlId="description">
                    <Form.Label className="form-label">설명</Form.Label>
                    <Form.Control plaintext readOnly defaultValue="동네 맛집을 공유하는 어플입니다." />
                </Form.Group>
                <Form.Group controlId="content">
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
                <Modal.Body style={{ fontSize: '13px' }}>[우리동네 맛집' 앱 개발 같이 해요!] 프로젝트 팀장에게 전송할 메시지를 입력해 주세요.
                <Form.Group controlId="content" style={{ marginTop: '10px' }}>
                        <Form.Control as="textarea" aria-describedby="contentHelpBlock" rows={3} />

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

export default ProjectDetail;