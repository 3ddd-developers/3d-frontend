import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main, Login, Mypage, SignUp, Error, CommingSoon, Manage } from './pages';
import { StudyApply, StudyCreate, StudyDetail } from './pages/study';
import { ProjectApply, ProjectCreate, ProjectDetail } from './pages/project';
import { BsFillPeopleFill } from "react-icons/bs";
import { Container, Button, Dropdown, Row } from 'react-bootstrap';
import { FaUserCircle } from "react-icons/fa";
import qs from 'qs';
import axios from 'axios';
import config from '../config';
import './style.scss';

const UserInfo = props => {
    const logout = () => {
        window.sessionStorage.clear();
        window.location.href = '/';
    }

    return (
        <div className='header-user' >
            <Dropdown>
                <Dropdown.Toggle className='gnb-button' style={{ color: '#80AAA6', backgroundColor: '#ffffff', borderColor: '#ffffff' }}>
                    <FaUserCircle style={{ marginRight: '5px', width: '30px', height: '30px' }} />
                    {props.userName}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="/#/mypage">마이페이지</Dropdown.Item>
                    <Dropdown.Item onClick={logout}>로그아웃</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

const App = () => {
    const [user, setUser] = useState('');

    useEffect(() => {
        if (user === '' && window.sessionStorage.getItem('userName')) setUser(window.sessionStorage.getItem('userName'));

        if (!window.location.href.includes('code')) return;

        const { code } = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
        });

        if (code) {
            // let client_id = 'b2d5bcafe57172c77c97', client_secret = '75bf0b3a856e6a9756fdffb5579e4bc4a1ca637f';

            axios.get(`/github/login/oauth/access_token?client_id=${config.github.client_id}&client_secret=${config.github.client_secret}&code=${code}`)
                .then(function (response) {
                    // console.log(response);
                    if (response.data.includes('error')) {
                        // TODO: 에러 처리
                        return;
                    }
                    let at = response.data.slice(response.data.indexOf('=') + 1, response.data.indexOf('&'));

                    axios.get('/api/github/user', {
                        headers: {
                            Authorization: `token ${at}`,
                        },
                    })
                        .then(function (response) {
                            // console.log(response);

                            // 해당 id가 userDB 에 있는 값인지 확인하고 있으면 로그인, 없으면 회원가입 
                            // TODO: user get api 연동 
                            if (true) {
                                // userDB 에 있는 id
                                window.sessionStorage.setItem('at', at);
                                window.sessionStorage.setItem('userId', response.data.id);
                                window.sessionStorage.setItem('userName', response.data.login);
                                setUser(response.data.login);
                            } else {
                                // userDB 에 없는 id
                                window.location.href = `/#/signUp?id=${response.data.id}&name=${response.data.login}&email=${response.data.email}`;
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });


                })
                .catch(function (error) {
                    console.log(error);
                });
        }

    }, []);

    const onClickLogo = () => {
        window.location.href = '/';
    }

    const onClickLogin = () => {
        window.location.href = '/#/login';
    }

    const onClickIntro = () => {
        window.location.href = '/#/intro';
    }

    const onClickNotice = () => {
        window.location.href = '/#/notice';
    }

    const onClickCommunity = () => {
        window.location.href = '/#/community';
    }

    const onClickQuestion = () => {
        window.location.href = '/#/question';
    }

    const onClickPrivacy = () => {
        window.location.href = '/#/privacy';
    }

    const onClickTerm = () => {
        window.location.href = '/#/term';
    }

    return (
        <>
            <header style={{ display: 'flex', alignItems: 'center' }}>
                <BsFillPeopleFill className='logo' onClick={onClickLogo} />
                <h1 style={{ display: 'inline-block', fontWeight: 'bold', marginBottom: '6px', cursor: 'pointer' }} onClick={onClickLogo}>3D</h1>
                <span className="menu" style={{ marginLeft: '50px' }} onClick={onClickLogo}>홈</span>
                <span className="menu" onClick={onClickIntro}>소개</span>
                <span className="menu" onClick={onClickNotice}>공지사항</span>
                <span className="menu" onClick={onClickCommunity}>커뮤니티</span>
                <span className="menu" onClick={onClickQuestion}>문의하기</span>
                {window.sessionStorage.getItem('userName') ? <UserInfo userName={user} /> : <Button className='header-button' onClick={onClickLogin}>로그인</Button>}
            </header>
            <Container style={{ paddingTop: '7%', paddingBottom: '7%' }}>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/signUp" component={SignUp} />
                    <Route path="/mypage" component={Mypage} />
                    <Route path="/studyApply" component={StudyApply} />
                    <Route path="/studyCreate" component={StudyCreate} />
                    <Route path="/studyDetail/:id" component={StudyDetail} />
                    <Route path="/projectApply" component={ProjectApply} />
                    <Route path="/projectCreate" component={ProjectCreate} />
                    <Route path="/projectDetail" component={ProjectDetail} />
                    <Route path="/intro" component={CommingSoon} />
                    <Route path="/notice" component={CommingSoon} />
                    <Route path="/community" component={CommingSoon} />
                    <Route path="/question" component={CommingSoon} />
                    <Route path="/term" component={CommingSoon} />
                    <Route path="/privacy" component={CommingSoon} />
                    <Route path="/manage/:id" component={Manage} />
                    <Route exact path="/" component={Main} />
                    <Route component={Error} />
                </Switch>
            </Container>
            <footer style={{ padding: '30px' }}>
                <Row style={{ color: 'white', fontWeight: 'bold', justifyContent: 'center' }}>
                    <BsFillPeopleFill style={{ width: '24px', height: '24px', marginRight: '5px' }} />
                    <span>3D, 개발자를 위한 팀 매칭 서비스</span>
                </Row>
                <Row style={{ marginTop: '10px', color: 'white', fontSize: '13px', justifyContent: 'center' }}>
                    <span onClick={onClickIntro}>소개</span> |
                    <span onClick={onClickNotice}>공지사항</span> |
                    <span onClick={onClickQuestion}>문의하기</span> |
                    <span onClick={onClickPrivacy}>개인정보처리방침</span> |
                    <span onClick={onClickTerm}>이용약관</span> |
                    <a href="mailto:mirijo02233092@gmail.com">Contact</a>
                </Row>
            </footer>
        </>
    );
};

export default App;