import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Modal } from 'react-bootstrap';
import axios from 'axios';


const ProjectDetail = props => {
    const [show, setShow] = useState(false);
    const [applyContent, setApplyContent] = useState('');
    const [error, setError] = useState(false);

    // 제목, 상태, 주제, 지역, 모집인원, 내용
    const [title, setTitle] = useState('도트 좀비게임 만들어요~');
    const [writer, setWriter] = useState('생존자');
    // const [date, setDate] = useState('2020/10/30');
    const [status, setStatus] = useState('모집중');
    const [region, setRegion] = useState('경기도 광명시');
    const [memTotalCapa, setMemTotalCapa] = useState(5);
    const [content, setContent] = useState('도트로 표현되는 작은 좀비게임 만들어보고 싶습니다ㅎㅎ');
    const [onoffline, setOnoffline] = useState('온오프 둘 다');
    const [member, setMember] = useState({"기획": 1, "디자인": 1,"FE": 1, "BE": 2})

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleApply = () => {
        let json = new Map();
        json['postSeq'] = 2;
        json['memId'] = "dkjl";
        json['message'] = "content";
        json['recArea'] = "position";

        console.log(json);

        const config = {
            headers: { 'Content-Type': 'application/json' },
            responseType: 'blob'
        };

        // 서버로 POST
        axios
            .post('https://localhost:8443/api/sideprj/apply', JSON.stringify(json), config)
            .then(function (response) {
                console.log(response);
                window.location.href = `/#/projectDetail/1`
                // window.location.href = `/#/studyDetail/${response.post_seq}`
            })
            .catch(function (error) {
                console.log(error);
            });
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
                <Row>
                     <Col>
                    <Form.Group controlId="title">
                    <Form.Label className="form-label">제목</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={title} />
                </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="writer">
                            <Form.Label className="form-label">작성자</Form.Label>
                            <Form.Control plaintext readOnly defaultValue={writer} >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="status">
                    <Form.Label className="form-label">상태</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={status} />
                </Form.Group>
                <Row>
                <Col sm={4}>
                <Form.Group controlId="memTotalCapa">
                    <Form.Label className="form-label">모집인원</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={memTotalCapa} >
                    </Form.Control>
                </Form.Group>
                </Col>
                <Col sm={2}>
                <Form.Group controlId="기획">
                    <Form.Label className="form-label">기획</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={member.기획} >
                    </Form.Control>
                </Form.Group>
                </Col>
                <Col sm={2}>
                <Form.Group controlId="디자인">
                    <Form.Label className="form-label">디자인</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={member.디자인} >
                    </Form.Control>
                </Form.Group>
                </Col>
                <Col sm={2}>
                <Form.Group controlId="FE">
                    <Form.Label className="form-label">FE</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={member.FE} >
                    </Form.Control>
                </Form.Group>
                </Col>
                <Col sm={2}>
                <Form.Group controlId="BE">
                    <Form.Label className="form-label">BE</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={member.BE} >
                    </Form.Control>
                </Form.Group>
                </Col>
                </Row>
                {/* <Form.Group controlId="date">
                            <Form.Label className="form-label">작성일</Form.Label>
                            <Form.Control plaintext readOnly defaultValue={date} >
                            </Form.Control>
                        </Form.Group> */}
                <Row>
                     <Col>
                        <Form.Group controlId="region">
                            <Form.Label className="form-label">지역</Form.Label>
                            <Form.Control plaintext readOnly defaultValue={region} >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="on-offline">
                            <Form.Label className="form-label">모임 방식</Form.Label>
                            <Form.Control plaintext readOnly defaultValue={onoffline} >
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
            
                {/* <Form.Group controlId="skills">
                    <Form.Label className="form-label">기술 스택</Form.Label>
                    <Form.Control plaintext readOnly defaultValue="swift, spring" >
                    </Form.Control>
                </Form.Group> */}
                    
                <Form.Group controlId="description">
                    <Form.Label className="form-label">설명</Form.Label>
                    <Form.Control plaintext readOnly defaultValue={content} />
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
                    <Modal.Title className='modal-title'>프로젝트 지원</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ fontSize: '13px' }}>[우리동네 맛집' 앱 개발 같이 해요!] 프로젝트 팀장에게 전송할 메시지를 입력해 주세요.
                <Form.Group controlId="content" style={{ marginTop: '10px' }}>
                        <Form.Control as="textarea" aria-describedby="contentHelpBlock" rows={3} />
                </Form.Group>
                <Form.Group controlId="position">
                    <Form.Check type="radio" name="position" label="기획" />
                    <Form.Check type="radio" name="position" label="디자인" />
                    <Form.Check type="radio" name="position" label="FE" />
                    <Form.Check type="radio" name="position" label="BE" />
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