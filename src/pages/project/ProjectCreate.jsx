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
    const [onoffline, setOnoffline] = useState('오프라인');

    //모집 인원(셀렉 박스로 수정)-> 기획, FE, BE, 디자인
    const onoffs = ['오프라인', '온라인', '온오프 둘 다'];

    const [error, setError] = useState({ title: false, content: false, memTotalCapa: false });
    // console.log(number);
    // console.log(memTotalCapa);
    // console.log(onoffline);
    // console.log(content)

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

        // TODO: user_id (github) 연동 조사
        let json = new Map();
        json['leader'] = 123;
        json['meeting'] = onoffline;
        json['location'] = region;
        json['contents'] = content;
        json['memTotalCapa'] = memTotalCapa;
        json['title'] = title;
        const recruitingArea = new Map();
        recruitingArea['FE'] = number.FE;
        recruitingArea['BE'] = number.BE;
        recruitingArea['기획'] = number.기획;
        recruitingArea['디자인'] = number.디자인;
        json['recruitingArea'] = recruitingArea;
        

        console.log(json);

        const config = {
            headers: { 'Content-Type': 'application/json' },
            responseType: 'blob'
        };


        // 서버로 POST
        axios
            .post('https://localhost:8443/api/sideprj/post', JSON.stringify(json), config)
            .then(function (response) {
                console.log(response);
                window.location.href = `/#/projectDetail/1`
                // window.location.href = `/#/studyDetail/${response.post_seq}`
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
            case 'onoffline':
                setOnoffline(evt.target.value);
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

            <Form style={{ width: '500px', margin: 'auto' }} onSubmit={handleSubmit} >
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
                        <Form.Group controlId="onoffline">
                            <Form.Label className="form-label">모임 방식<CgAsterisk className="form-required" /></Form.Label>
                            <Form.Control required as="select" onChange={onChange}>
                                {onoffs.map((onoff, idx) => <option key={idx}>{onoff}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>
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