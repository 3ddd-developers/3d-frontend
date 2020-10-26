import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main, Login, Mypage, SignUp, Error, CommingSoon } from './pages';
import { StudyApply, StudyCreate, StudyDetail } from './pages/study';
import { ProjectApply, ProjectCreate, ProjectDetail } from './pages/project';
import { BsFillPeopleFill } from "react-icons/bs";
import { Container, Button, Dropdown } from 'react-bootstrap';
import { FaUserCircle } from "react-icons/fa";
import qs from 'qs';
import axios from 'axios';
import './style.scss';

const UserInfo = props => {
    const logout = () => {
        window.localStorage.clear();
        window.location.href = '/';
    }

    return (
        <div className='header-user' >
            <Dropdown>
                <Dropdown.Toggle className='account-button' style={{ color: '#80AAA6', backgroundColor: '#ffffff', borderColor: '#ffffff' }}>
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
        if (user === '' && window.localStorage.getItem('userName')) setUser(window.localStorage.getItem('userName'));

        if (!window.location.href.includes('code')) return;

        const { code } = qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
        });

        if (code) {
            let client_id = 'b2d5bcafe57172c77c97', client_secret = '75bf0b3a856e6a9756fdffb5579e4bc4a1ca637f';

            axios.get(`/github/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`)
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
                                window.localStorage.setItem('at', at);
                                window.localStorage.setItem('userId', response.data.id);
                                window.localStorage.setItem('userName', response.data.login);
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

    const onClickQuestion = () => {
        window.location.href = '/#/question';
    }

    return (
        <>
            <header style={{ display: 'flex', alignItems: 'center' }}>
                <BsFillPeopleFill className='logo' onClick={onClickLogo} />
                <h1 style={{ display: 'inline-block', fontWeight: 'bold', marginBottom: '6px', cursor: 'pointer' }} onClick={onClickLogo}>3D</h1>
                <span className="menu" style={{ marginLeft: '50px' }} onClick={onClickLogo}>홈</span>
                <span className="menu" onClick={onClickIntro}>소개</span>
                <span className="menu" onClick={onClickNotice}>공지사항</span>
                <span className="menu" onClick={onClickQuestion}>문의하기</span>
                {window.localStorage.getItem('userName') ? <UserInfo userName={user} /> : <Button className='header-button' onClick={onClickLogin}>로그인</Button>}
            </header>
            <Container style={{ paddingTop: '7%', paddingBottom: '10%' }}>
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
                    <Route path="/question" component={CommingSoon} />
                    <Route exact path="/" component={Main} />
                    <Route component={Error} />
                </Switch>
            </Container>
            <footer>Footer</footer>
        </>
    );
};

export default App;