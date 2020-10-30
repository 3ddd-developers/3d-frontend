import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { CgAsterisk } from "react-icons/cg";
import classNames from 'classnames';
import { SPACE_CODE } from './const';
import STUDY_API from '../../api/STUDY_API';


const StudyCreate = () => {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [region, setRegion] = useState('SP10');
    const [number, setNumber] = useState(1);
    const [content, setContent] = useState('');

    const [error, setError] = useState({ title: false, content: false, number: false });
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = evt => {
        evt.preventDefault();
        evt.stopPropagation();
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
        if (number.match(/[^0-9]/g)) {
            setError({ ...error, number: true });
            return;
        }

        // TODO: user_id (github) 연동 조사
        let json = {
            userId: window.sessionStorage.getItem('id'),
            title: title,
            content: content,
            memberNumber: number,
            placeSeq: region,
            subjectSeq: subject
        };

        // console.log(json);
        // return;


        STUDY_API.createStudy(json)
            .then(response => {
                console.log(response);
                // TODO: 생성 성공 시 해당 스터디 디테일 페이지로 라우팅
                window.location.href = `/#/studyDetail/${response.data.response.seq}`
            })
            .catch(err => {
                console.log(err);
                setErrorMsg(err);
            })
        // axios.post('/api/study/post', json)
        //     .then(function (response) {
        //         console.log(response);
        //         // TODO: 생성 성공 시 해당 스터디 디테일 페이지로 라우팅
        //         window.location.href = `/#/studyDetail/${response.post_seq}`
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });
    }

    const onClickCancel = () => {
        window.location.href = '/';
    }

    const onChange = evt => {
        switch (evt.target.id) {
            case 'title':
                setTitle(evt.target.value);
                break;
            case 'subject':
                setSubject(evt.target.value);
                break;
            case 'region':
                let target = '';
                Object.keys(SPACE_CODE).forEach(key => {
                    if (SPACE_CODE[key] === evt.target.value) target = key
                });
                setRegion(target);
                break;
            case 'number':
                setNumber(evt.target.value);
                break;
            case 'content':
                setContent(evt.target.value);
                break;
            default:
                break;
        }
    }

    const onFocus = evt => {
        setError({ ...error, [evt.target.id]: false });
    }

    // const regions = ['서울/강남', '서울/건대', '서울/신촌홍대', '서울/여의도', '경기/판교', '경기/수원', '온라인'];
    const regions = Object.values(SPACE_CODE);

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
                    <Form.Control className={classNames({ 'form-error': error.title })} required aria-describedby="titleHelpBlock" placeholder="ex) 판교역 리액트 스터디 구해요!" onChange={onChange} onFocus={onFocus} />
                    <Form.Text className={classNames({ 'form-text-error': error.title })} id="titleHelpBlock" muted>
                        최대 100자 까지 입력할 수 있습니다.
  </Form.Text>
                </Form.Group>
                <Form.Group controlId="subject">
                    <Form.Label className="form-label">주제<CgAsterisk className="form-required" /></Form.Label>
                    <Form.Control required placeholder="ex) 리액트" onChange={onChange} />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group controlId="region">
                            <Form.Label className="form-label">지역<CgAsterisk className="form-required" /></Form.Label>
                            <Form.Control required as="select" onChange={onChange}>
                                {regions.map((region, idx) => <option key={idx}>{region}</option>)}
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="number">
                            <Form.Label className="form-label">모집인원<CgAsterisk className="form-required" /></Form.Label>
                            <Form.Control required className={classNames({ 'form-error': error.number })} onFocus={onFocus} onChange={onChange} aria-describedby="numberHelpBlock" />
                            <Form.Text className={classNames({ 'form-text-error': error.number })} id="numberHelpBlock" muted>
                                숫자만 입력할 수 있습니다.
  </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="content">
                    <Form.Label className="form-label">내용<CgAsterisk className="form-required" /></Form.Label>
                    <Form.Control required className={classNames({ 'form-error': error.content })} as="textarea" aria-describedby="contentHelpBlock" rows={3} onChange={onChange} onFocus={onFocus} />
                    <Form.Text className={classNames({ 'form-text-error': error.content })} id="contentHelpBlock" muted>
                        최대 500자 까지 입력할 수 있습니다.
  </Form.Text>
                </Form.Group>
                {errorMsg !== '' && <Form.Group>
                    <Form.Text className='form-text-error'>{errorMsg}</Form.Text>
                </Form.Group>}
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