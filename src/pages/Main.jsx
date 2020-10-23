import React from 'react';
import { Container, Row, Col, Button, DropdownButton, Dropdown, InputGroup, FormControl, Card } from 'react-bootstrap';
import { BiSearch } from "react-icons/bi";

const Main = () => {

    const onClickCreateStudy = () => {
        window.location.href = '/#/studyCreate';
    }

    const onClickCreateProject = () => {
        window.location.href = '/#/projectCreate';
    }


    return (
        <Container style={{ marginTop: '-7%' }}>
            <Row style={{ justifyContent: 'center' }}>
                <h1 className='main-title'>3D, Platform for searching side project or study!</h1>
            </Row>
            <Row style={{ marginTop: '15px' }}>
                <Button className='main-button' onClick={onClickCreateStudy}>스터디 모집</Button>
                <Button className='main-button' style={{ marginLeft: '10px' }} onClick={onClickCreateProject}>프로젝트 모집</Button>
            </Row>
            <Row style={{ marginTop: '25px', justifyContent: 'center' }}>
                <InputGroup className="mb-3" style={{ width: '800px', height: '50px' }}>
                    <InputGroup.Prepend>

                        <Button variant="outline-secondary"> <BiSearch style={{ width: '25px', height: '25px' }} /></Button>
                    </InputGroup.Prepend>
                    <FormControl className='main-search' style={{ height: '50px' }} placeholder='스터디를 검색해 보세요!' />
                </InputGroup>
            </Row>
            <Row style={{ marginTop: '15px' }}>
                <DropdownButton className='main-filter' id="dropdown-region" title="지역">
                    <Dropdown.Item href="#/action-1">서울</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">경기</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">인천</Dropdown.Item>
                    <Dropdown.Item href="#/action-4">제주</Dropdown.Item>
                    <Dropdown.Item href="#/action-5">강원</Dropdown.Item>
                </DropdownButton>
                <DropdownButton className='main-filter' style={{ marginLeft: '10px' }} id="dropdown-category" title="카테고리">
                    <Dropdown.Item href="#/action-1">스터디</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">프로젝트</Dropdown.Item>
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
        </Container>
    );
};

export default Main;