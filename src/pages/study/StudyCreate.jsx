import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { CgAsterisk } from "react-icons/cg";


const StudyCreate = () => {

    const handleSubmit = () => {
        // TODO
        // Create API 연동 
    }

    const onClickCancel = () => {
        window.location.href = '/';
    }

    return (
        <>
            <Row style={{ justifyContent: 'center' }}>
                <h2 className="form-title">스터디 생성</h2>
            </Row>
            <Row style={{ justifyContent: 'center' }}><p className="form-description">스터디를 생성하기 위한 정보를 입력해 주세요.</p></Row>

            <hr className="form-hr" />
            <Form style={{ width: '500px', margin: 'auto' }} onSubmit={handleSubmit} >

                <Form.Group controlId="title">
                    <Form.Label className="form-label">제목<CgAsterisk className="form-required" /></Form.Label>
                    <Form.Control required placeholder="ex) 판교역 리액트 스터디 구해요!" />
                </Form.Group>
                <Form.Group controlId="title">
                    <Form.Label className="form-label">주제<CgAsterisk className="form-required" /></Form.Label>
                    <Form.Control required placeholder="ex) 리액트" />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group controlId="region">
                            <Form.Label className="form-label">지역<CgAsterisk className="form-required" /></Form.Label>
                            <Form.Control required as="select">
                                <option>서울</option>
                                <option>경기</option>
                                <option>인천</option>
                                <option>제주</option>
                                <option>강원</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="region">
                            <Form.Label className="form-label">모집인원<CgAsterisk className="form-required" /></Form.Label>
                            <Form.Control required as="select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="description">
                    <Form.Label className="form-label">내용</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Row style={{ justifyContent: 'center', marginTop: '60px' }}>
                    <Button type="submit" className="form-button" style={{ backgroundColor: '#80AAA6', borderColor: '#80AAA6' }}>
                        생성
  </Button>
                    <Button onClick={onClickCancel} className="form-button" style={{ backgroundColor: '#D7CDC2', borderColor: '#D7CDC2', marginLeft: '10px' }}>
                        취소
  </Button>

                </Row>

            </Form>
        </>
    );
};

export default StudyCreate;