import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { CgAsterisk } from "react-icons/cg";
import axios from 'axios';
import classNames from 'classnames';


const ProjectCreate = () => {
    const [title, setTitle] = useState('');
    // const [skills, setSkills] = useState('');
    const [region, setRegion] = useState('');
    const [memTotalCapa, setTotalNumber] = useState('');
    const [number, setNumber] = useState({ 기획: 0, 디자인: 0, FE: 0, BE: 0 });
    const [content, setContent] = useState('');
    const [onoffline, setOnOffline] = useState('');

    //모집 인원(셀렉 박스로 수정)-> 기획, FE, BE, 디자인
    const onOfflines = ['오프라인', '온라인', '온오프 둘 다'];

    const [error, setError] = useState({ title: false, content: false, memTotalCapa: false });
    console.log(number);
    console.log(memTotalCapa);
    const handleSubmit = () => {

        // TODO
        // Create API 연동 
        if (title.length > 100) {
            // TODO: 에러 메시지 노출
            setError({ ...error, title: true });
            return;
        }

        if (content.length > 500) {
            // TODO: 에러 메시지 노출
            setError({ ...error, content: true });
            return;
        }

        // number validation 
        if (memTotalCapa.match(/[^0-9]/g)) {
            setError({ ...error, memTotalCapa: true });
            return;
        }

        return;

        // TODO: user_id (github) 연동 조사
        let json = {
            user_id: 123,
            title: title,
            content: content,
            member_number: number,
            place_seq: region,
            subject_seq: subject
        };

        console.log(json);
        return;
        axios.post('/api/study/post', json)
            .then(function (response) {
                console.log(response);
                // TODO: 생성 성공 시 해당 스터디 디테일 페이지로 라우팅
                window.location.href = `/#/studyDetail/${response.post_seq}`
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const onClickCancel = () => {
        window.location.href = '/';
    }

    const onChange = evt => {
        switch (evt.target.id) {
            case 'title':
                setTitle(evt.target.value);
                break;
            case 'memTotalCapa':
                setTotalNumber(evt.target.value);
                break;
            case 'skills':
                setSkills(evt.target.value);
                break;
            case 'on-offline':
                setOnOffline(evt.target.value);
                break;
            case 'region':
                setRegion(evt.target.value);
                break;
            case 'content':
                setContent(evt.target.value);
                break;
            default:
                break;
        }
    }

    // 포지션 state
    const onChangeNum = evt => {
        switch (evt.target.id) {
            case '기획':
                setNumber({
                    ...number,
                    [evt.target.id] : evt.target.value
                });
                break;
            case '디자인':
                setNumber({
                    ...number,
                    [evt.target.id] : evt.target.value
                });
                break;
            case 'FE':
                setNumber({
                    ...number,
                    [evt.target.id] : evt.target.value
                });
                break;
            case 'BE':
                setNumber({
                    ...number,
                    [evt.target.id] : evt.target.value
                });
                break;
        }
    }

    const onFocus = evt => {
        setError({ ...error, [evt.target.id]: false });
    }

    return (
        <>
            <Row style={{ justifyContent: 'center' }}>
                <h2 className="form-title">사이드 프로젝트 팀 생성</h2>
            </Row>
            <Row style={{ justifyContent: 'center' }}><p className="form-description">팀 생성을 위한 정보를 입력해 주세요.</p></Row>
            <hr className="form-hr" />

            <Form style={{ width: '500px', margin: 'auto' }} action="https://localhost:8443/api/sideprj/post" method="post" onSubmit={handleSubmit} >
                <Form.Group controlId="title">
                    <Form.Label className="form-label">제목<CgAsterisk className="form-required" /></Form.Label>
                    <Form.Control className={classNames({ 'form-error': error.title })} required aria-describedby="titleHelpBlock" placeholder="ex) 음악 플레이리스트 공유앱 만들기" onChange={onChange} onFocus={onFocus} />
                    <Form.Text className={classNames({ 'form-text-error': error.title })} id="titleHelpBlock" muted>
                        최대 100자까지 입력할 수 있습니다.
                    </Form.Text>
                </Form.Group>
                <Row>
                <Col sm={8}>
                    <Form.Group controlId="region">
                        <Form.Label className="form-label">지역<CgAsterisk className="form-required" /></Form.Label>
                        <Form.Control required placeholder="ex) 서울 서초" onChange={onChange} />
                    </Form.Group>
                    </Col>
                    <Col sm={4}>
                        <Form.Group controlId="on-offline">
                            <Form.Label className="form-label">모임 방식<CgAsterisk className="form-required" /></Form.Label>
                            <Form.Control required as="select" onChange={onChange}>
                                {onOfflines.map((onoffline, idx) => <option key={idx}>{onoffline}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
                {/* <Form.Group controlId="skills">
                    <Form.Label className="form-label">기술 스택<CgAsterisk className="form-required" /></Form.Label>
                    <Form.Control required placeholder="ex) react.js, java, c#,..." onChange={onChange} />
                </Form.Group> */}
                
                    <Form.Group>
                    <Row>
                    <Col sm={4}>
                        <Form.Label className="form-label">총 모집인원<CgAsterisk className="form-required" /></Form.Label>
                        <Form.Control id="memTotalCapa" className={classNames({ 'form-error': error.number })} required onFocus={onFocus} onChange={onChange} aira-describedby="numberHelpBlock" />
                    </Col>
                    <Col sm={2}>
                        <Form.Label className="form-label">기획</Form.Label>
                        <Form.Control id="기획" className={classNames({ 'form-error': error.number })} onFocus={onFocus} onChange={onChangeNum} aira-describedby="numberHelpBlock" />
                    </Col> 
                    <Col sm={2}>  
                        <Form.Label className="form-label">디자인</Form.Label>
                        <Form.Control id="디자인" className={classNames({ 'form-error': error.number })} onFocus={onFocus} onChange={onChangeNum} aira-describedby="numberHelpBlock" />
                    </Col>
                    <Col sm={2}>
                        <Form.Label className="form-label">FE</Form.Label>
                        <Form.Control id="FE" className={classNames({ 'form-error': error.number })} onFocus={onFocus} onChange={onChangeNum} aira-describedby="numberHelpBlock" />
                    </Col> 
                    <Col sm={2}> 
                        <Form.Label className="form-label">BE</Form.Label>
                        <Form.Control id="BE" className={classNames({ 'form-error': error.number })} onFocus={onFocus} onChange={onChangeNum} aira-describedby="numberHelpBlock" />
                    </Col>
                    </Row>
                    </Form.Group>
                
                    <Form.Text className={classNames({ 'form-text-error': error.number })} id="numberHelpBlock" muted>
                        빈 칸에는 숫자만 입력할 수 있습니다.
                    </Form.Text>
                <Form.Group controlId="content">
                    <Form.Label className="form-label">내용<CgAsterisk className="form-required" /></Form.Label>
                    <Form.Control required className={classNames({ 'form-error': error.content})} as="textarea" aria-describedby="contentHelpBlock" rows={3} onChange={onChange} onFocus={onFocus} />
                    <Form.Text className={classNames({ 'form-text-error': error.content })} id="contentHelpBlock" muted>
                        최대 500자까지 입력할 수 있습니다.
                    </Form.Text>
                </Form.Group>
                <Row style={{ justifyContent: 'center', marginTop: '60px' }}>
                    <Button type="submit" className="form-button" style={{ backgroundColor: '#80AAA6', borderColor: '#80AAA6' }}>
                        생성
                    </Button>
                    <Button variant="secondary" onClick={onClickCancel} style={{ backgroundColor: '#D7CDC2', borderColor: '#D7CDC2', marginLeft: '10px' }} className="form-button">
                        취소
                    </Button>
                </Row>
            </Form>
        </>
    );
};

export default ProjectCreate;