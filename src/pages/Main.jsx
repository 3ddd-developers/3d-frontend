import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, DropdownButton, Dropdown, InputGroup, Form, FormControl, Card, Tabs, Tab, Pagination } from 'react-bootstrap';
import { BiSearch } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import axios from 'axios';
import STUDY_API from '../api/STUDY_API';
import { SPACE_CODE, STATUS_CODE } from './study';

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

    const [offset, setOffset] = useState(0);
    const [active, setActive] = useState(1);
    const [pages, setPages] = useState([]);

    const [region, setRegion] = useState('지역');
    const [state, setState] = useState('상태');

    // pagination
    // TODO
    // 1. GetList 이후 pages 설정하는 로직 필요함
    // 2. page num < 1 일 때 1으로 셋팅하는 로직 필요, page num > page num 일 때 page num 으로 셋팅하는 로직 필요 (예외처리)
    // let pages = [];
    // for (let number = 1; number <= 5; number++) {
    //     pages.push(
    //         <Pagination.Item key={number} active={number === active} onClick={() => setActive(number)}>
    //             {number}
    //         </Pagination.Item>,
    //     );
    // }
    const setPagination = pageNum => {
        let arr = [];

        for (let number = 1; number <= pageNum; number++) {
            arr.push(
                <Pagination.Item key={number} active={number === active} onClick={() => setActive(number)}>
                    {number}
                </Pagination.Item>,
            );

            setPages(arr)
        }
    }


    const onSearch = evt => {
        if (evt.type === 'click' || evt.type === 'keydown' && evt.keyCode === 13) {
            // TODO 검색 서비스 콜 

            setSearchVal(evt.target.value);
            setActive(1);
            return;
            axios.get(`/api/study/post?limit=20&offset=1&title=${searchVal}`)
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
        switch (evt.target.id) {
            case 'region':
                let _region = '';
                Object.keys(SPACE_CODE).forEach(key => {
                    if (SPACE_CODE[key] === evt.target.value) _region = key
                });
                setRegion(_region);
                setActive(1);
                break;
            case 'state':
                let _state = '';
                Object.keys(STATUS_CODE).forEach(key => {
                    if (STATUS_CODE[key] === evt.target.value) _state = key
                });
                setState(_state);
                setActive(1);
                break;
            default:
                break;
        }
    }

    const getStudyList = () => {
        // let url = `/api/study/post?limit=20&offset=${active}`;
        let url = `?limit=20&offset=${active}`;

        if (searchVal !== '') url += `&title=${searchVal}`;
        if (state !== '상태') url += `&statusSeq=${state}`
        if (region !== '지역') url += `&placeSeq=${region}`


        // console.log(url);
        // return;
        // TODO: API 연동 
        STUDY_API.getStudy(url)
            .then(response => {


                // console.log(response.data.response)
                let arr = response.data.response.posts.map(item => {
                    return {
                        key: item.seq,
                        title: item.title,
                        space: SPACE_CODE[item.placeSeq.value],
                        content: item.content
                    }
                });
                // console.log(arr)
                setStudyList(arr);
                setPagination(arr.length)
            })
            .catch(err => {
                console.log(err)
            })
        return;
        axios.get(url)
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

    const onClickCreateStudy = () => {
        // 로그인 되어 있지 않으면 로그인 페이지로 라우팅
        if (!window.sessionStorage.getItem('id')) {
            window.location.href = '/#/login';
            return;
        }
        window.location.href = '/#/studyCreate';
    }

    const onClickCreateProject = () => {
        window.location.href = '/#/projectCreate';
    }

    useEffect(() => {
        getStudyList();
    }, [active, searchVal, region, state]);

    useEffect(() => {
        if (tab === 'study') {
            getStudyList();
            // sample data
            // setStudyList([
            //     {
            //         key: 1,
            //         title: '리액트 스터디 모집해요!',
            //         space: '서울',
            //         content: '토요일 저녁 강남역 부근에서 리액트 스터디하실 분 구해요~'
            //     },
            //     {
            //         key: 2,
            //         title: '자바 스터디 모집해요!',
            //         space: '경기/판교',
            //         content: '평일 저녁 판교역에서 자바 스터디하실 분~!'
            //     },
            //     {
            //         key: 3,
            //         title: '파이썬 스터디 합시다!',
            //         space: '경기/수원',
            //         content: '주말 오전 수원역에서 파이썬 스터디 하실래요?'
            //     },
            //     {
            //         key: 4,
            //         title: '알고리즘 스터디 하자!',
            //         space: '서울/여의도',
            //         content: '평일 저녁 여의도 근처에서 알고리즘 스터디 하자.'
            //     },
            //     {
            //         key: 5,
            //         title: '리액트 스터디 모집해요!',
            //         space: '서울',
            //         content: '토요일 저녁 강남역 부근에서 리액트 스터디하실 분 구해요~'
            //     },
            //     {
            //         key: 6,
            //         title: '자바 스터디 모집해요!',
            //         space: '경기/판교',
            //         content: '평일 저녁 판교역에서 자바 스터디하실 분~!'
            //     },
            //     {
            //         key: 7,
            //         title: '파이썬 스터디 합시다!',
            //         space: '경기/수원',
            //         content: '주말 오전 수원역에서 파이썬 스터디 하실래요?'
            //     },
            //     {
            //         key: 8,
            //         title: '알고리즘 스터디 하자!',
            //         space: '서울/여의도',
            //         content: '평일 저녁 여의도 근처에서 알고리즘 스터디 하자.'
            //     }
            // ]);

            // TODO: study get 서비스 연동
            // offset, limit 추가 
            return;
            axios.get('/api/study/post')
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




        } else {
            // TODO: project get 서비스 연동
        }
    }, [tab]);

    const regions = ['지역', '서울/강남', '서울/건대', '서울/신촌홍대', '서울/여의도', '경기/판교', '경기/수원', '온라인'];
    const states = ['상태', '모집중', '모집완료'];

    return (
        <Container style={{ marginTop: '-7%' }}>
            <Row style={{ justifyContent: 'center' }}>
                <h1 className='main-title'>3D, 개발자를 위한 팀 매칭 서비스</h1>
            </Row>


            <Row style={{ marginTop: '15px' }}>
                <Tabs activeKey={tab} id="tab" onSelect={(t) => setTab(t)}>
                    <Tab eventKey="study" title="스터디">
                        <Row style={{ marginTop: '50px', justifyContent: 'center' }}>
                            <InputGroup className="mb-3" style={{ width: '800px', height: '50px' }}>
                                <InputGroup.Prepend>
                                    <Button onClick={onSearch} variant="outline-secondary"> <BiSearch style={{ width: '25px', height: '25px' }} /></Button>
                                </InputGroup.Prepend>
                                <Form.Group style={{ marginBottom: '0' }} controlId='search'>
                                    <FormControl className='main-search' onKeyDown={onSearch} style={{ height: '50px' }} placeholder='제목으로 스터디 검색' />
                                </Form.Group>

                            </InputGroup>
                        </Row>
                        <Row style={{ justifyContent: 'center', marginTop: '30px' }}>
                            <Button className='main-button' onClick={onClickCreateStudy}>스터디 모집</Button>

                            <Form.Group controlId='region'>
                                <FormControl className='main-select' as="select" onChange={onChange}>
                                    {regions.map((region, idx) => <option key={idx}>{region}</option>)}
                                </FormControl>
                            </Form.Group>
                            <Form.Group controlId='state'>
                                <FormControl className='main-select' as="select" onChange={onChange}>
                                    {states.map((state, idx) => <option key={idx}>{state}</option>)}
                                </FormControl>
                            </Form.Group>


                        </Row>
                        <hr style={{ marginTop: '50px' }} />
                        <Row style={{ marginTop: '50px' }}>
                            {studyList.map(study => StudyCard(study))}
                        </Row>
                        <Row style={{ justifyContent: 'center', marginTop: '100px' }}>
                            <Pagination>
                                <Pagination.First onClick={() => setActive(1)} />
                                <Pagination.Prev onClick={() => setActive(active - 1)} />
                                {pages}
                                <Pagination.Next onClick={() => setActive(active + 1)} />
                                <Pagination.Last onClick={() => setActive(5)} />
                            </Pagination>
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