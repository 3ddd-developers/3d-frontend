import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, DropdownButton, Dropdown, InputGroup, FormControl, Card, Tabs, Tab } from 'react-bootstrap';
import { BiSearch } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import axios from 'axios';

const StudyCard = ({ key, title, space, content }) => {
    const handleClick = () => {
        window.location.href = `/#/studyDetail/${key}`;
    };
    return (
        <Col key={key}>
            <Card
                onClick={handleClick}
                className='main-card'
            >
                <Card.Body>
                    <Card.Title className='title'>{title}</Card.Title>
                    <Card.Subtitle className='mb-2 muted sub-title'>{space}</Card.Subtitle>
                    <Card.Text className='description'>{content}</Card.Text>
                    <Card.Link className='link'>
                        자세히 보기
                            <IoIosArrowForward
                            style={{ marginBottom: "0.1rem" }}
                        />
                    </Card.Link>
                </Card.Body>
            </Card>
        </Col>
    );
};

const Main = () => {
    const [tab, setTab] = useState('study');
    const [studyList, setStudyList] = useState([]);
    const [searchVal, setSearchVal] = useState('');

    const onSearch = evt => {
        if (evt.type === 'click' || evt.type === 'keydown' && evt.keyCode === 13) {
            // TODO 검색 서비스 콜
            // offset, limit 추가해야 함 
            return;
            axios.get(`/api/study/post?title=${searchVal}`)
                .then(function (response) {
                    // console.log(response);
                    let arr = response.data.res.map(item => {
                        return {
                            key: item.post_seq,
                            title: item.title,
                            space: item.place_seq,
                            content: item.content
                        }
                    });

                    setStudyList(arr);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }

    const onChange = evt => {
        setSearchVal(evt.target.value);
    }

    const onClickCreateStudy = () => {
        window.location.href = '/#/studyCreate';
    }

    const onClickCreateProject = () => {
        window.location.href = '/#/projectCreate';
    }

    useEffect(() => {
        if (tab === 'study') {
            // TODO: study get 서비스 연동
            // key 값에 post_seq 넣어줘야 함
            setStudyList([
                {
                    key: 1,
                    title: '리액트 스터디 모집해요!',
                    space: '서울',
                    content: '토요일 저녁 강남역 부근에서 리액트 스터디하실 분 구해요~'
                },
                {
                    key: 2,
                    title: '자바 스터디 모집해요!',
                    space: '경기/판교',
                    content: '평일 저녁 판교역에서 자바 스터디하실 분~!'
                },
                {
                    key: 3,
                    title: '파이썬 스터디 합시다!',
                    space: '경기/수원',
                    content: '주말 오전 수원역에서 파이썬 스터디 하실래요?'
                },
                {
                    key: 4,
                    title: '알고리즘 스터디 하자!',
                    space: '서울/여의도',
                    content: '평일 저녁 여의도 근처에서 알고리즘 스터디 하자.'
                }
            ]);
        } else {
            // TODO: project get 서비스 연동
        }
    }, [tab]);

    const regions = ['서울/강남', '서울/건대', '서울/신촌홍대', '서울/여의도', '경기/판교', '경기/수원', '온라인'];
    const states = ['모집중', '모집완료'];

    return (
        <Container style={{ marginTop: '-7%' }}>
            <Row style={{ justifyContent: 'center' }}>
                <h1 className='main-title'>3D, 개발자를 위한 팀 매칭 서비스</h1>
            </Row>


            <Row style={{ marginTop: '15px' }}>
                <Tabs activeKey={tab} id="tab" onSelect={(t) => setTab(t)}>
                    <Tab eventKey="study" title="스터디">
                        <Row style={{ marginTop: '25px', justifyContent: 'center' }}>
                            <InputGroup className="mb-3" style={{ width: '800px', height: '50px' }}>
                                <InputGroup.Prepend>
                                    <Button onClick={onSearch} variant="outline-secondary"> <BiSearch style={{ width: '25px', height: '25px' }} /></Button>
                                </InputGroup.Prepend>
                                <FormControl className='main-search' onChange={onChange} onKeyDown={onSearch} style={{ height: '50px' }} placeholder='제목으로 스터디 검색' />
                            </InputGroup>
                        </Row>
                        <Row style={{ justifyContent: 'center' }}>
                            <Button className='main-button' onClick={onClickCreateStudy}>스터디 모집</Button>
                            <DropdownButton className='main-filter' id="dropdown-region" title="지역">
                                {regions.map((region, idx) => <Dropdown.Item key={idx}>{region}</Dropdown.Item>)}
                            </DropdownButton>
                            <DropdownButton className='main-filter' id="dropdown-status" title="상태">
                                {states.map((state, idx) => <Dropdown.Item key={idx}>{state}</Dropdown.Item>)}
                            </DropdownButton>
                        </Row>
                        <hr />
                        <Row style={{ marginTop: '30px' }}>
                            {studyList.map(study => StudyCard(study))}
                        </Row>
                    </Tab>
                    <Tab eventKey="project" title="프로젝트">
                        <Row>
                            <Button className='main-button' style={{ marginLeft: '10px' }} onClick={onClickCreateProject}>프로젝트 모집</Button>
                            <DropdownButton className='main-filter' id="dropdown-region" title="지역">
                                <Dropdown.Item href="#/action-1">서울</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">경기</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">인천</Dropdown.Item>
                                <Dropdown.Item href="#/action-4">제주</Dropdown.Item>
                                <Dropdown.Item href="#/action-5">강원</Dropdown.Item>
                            </DropdownButton>
                            <DropdownButton className='main-filter' style={{ marginLeft: '10px' }} id="dropdown-status" title="상태">
                                <Dropdown.Item href="#/action-1">모집중</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">모집완료</Dropdown.Item>
                            </DropdownButton>
                        </Row>

                        <Row style={{ marginTop: '30px' }}>
                            <Col>
                                <Card className="main-card" style={{ width: '15rem', height: '13rem' }}>
                                    <Card.Body>
                                        <Card.Title className='title'>리액트 스터디 모집해요!</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted sub-title">서울</Card.Subtitle>
                                        <Card.Text className='description'>
                                            토요일 저녁 강남역 부근에서 리액트 스터디하실 분 구해요~
    </Card.Text>
                                        <Card.Link href="#/projectDetail">자세히 보기 &gt;</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="main-card" style={{ width: '15rem', height: '13rem' }}>
                                    <Card.Body>
                                        <Card.Title className='title'>C++ 스터디 해요~</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted sub-title">제주</Card.Subtitle>
                                        <Card.Text className='description'>
                                            평일 저녁 퇴근 후 같이 스터디해요!
    </Card.Text>
                                        <Card.Link href="#/projectDetail">자세히 보기 &gt;</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="main-card" style={{ width: '15rem', height: '13rem' }}>
                                    <Card.Body>
                                        <Card.Title className='title'>iOS 프로젝트 모집</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted sub-title">경기</Card.Subtitle>
                                        <Card.Text className='description'>
                                            모바일 앱 프로젝트 하실분 구합니다~
    </Card.Text>
                                        <Card.Link href="#/projectDetail">자세히 보기 &gt;</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="main-card" style={{ width: '15rem', height: '13rem' }}>
                                    <Card.Body>
                                        <Card.Title className='title'>웹 앱 개발해요!</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted sub-title">서울</Card.Subtitle>
                                        <Card.Text className='description'>
                                            BE, FE, 디자이너분 구합니다!
    </Card.Text>
                                        <Card.Link href="#/projectDetail">자세히 보기 &gt;</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>

                        </Row>
                    </Tab>
                </Tabs>
            </Row>


        </Container>
    );
};

export default Main;