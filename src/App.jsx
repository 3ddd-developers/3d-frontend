import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Main, Login, Mypage } from './pages';
import { StudyApply, StudyCreate, StudyDetail } from './pages/study';
import { ProjectApply, ProjectCreate, ProjectDetail } from './pages/project';
import { BsFillPeopleFill } from "react-icons/bs";
import { Container, Button } from 'react-bootstrap';
import { FaUserCircle } from "react-icons/fa";
import qs from 'qs';
import axios from 'axios';
import './style.scss';

const UserInfo = props => {
    const goMypage = () => {
        window.location.href = '/#/mypage';
    }

    return (
        <div className='header-user' >
            <FaUserCircle style={{ marginRight: '5px', width: '30px', height: '30px' }} />
            <span onClick={goMypage} style={{ fontWeight: '500', fontSize: '18px', cursor: 'pointer' }}>{props.userName}</span>
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
                        // TODO
                        // 에러 처리
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
                            window.localStorage.setItem('at', at);
                            window.localStorage.setItem('userName', response.data.login);
                            setUser(response.data.login);
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

    return (
        <>
            <header style={{ display: 'flex', alignItems: 'center' }}>
                <BsFillPeopleFill className='logo' onClick={onClickLogo} />
                <h1 style={{ display: 'inline-block' }}>3D</h1>
                {window.localStorage.getItem('userName') ? <UserInfo userName={user} /> : <Button className='header-button' onClick={onClickLogin}>로그인</Button>}
            </header>
            <Container style={{ paddingTop: '7%', paddingBottom: '10%' }}>
                {/* <Link to='/' className='nav-link'>메인</Link>
                <Link to='/mypage' className='nav-link'>마이페이지</Link>
                <Link to='/login' className='nav-link'>로그인</Link>
                <Link to='/authorized' className='nav-link'>Test</Link>
                <Link to='/studyApply' className='nav-link'>스터디 신청</Link>
                <Link to='/studyCreate' className='nav-link'>스터디 생성</Link>
                <Link to='/studyDetail' className='nav-link'>스터디 조회</Link>
                <Link to='/projectApply' className='nav-link'>프로젝트 신청</Link>
                <Link to='/projectCreate' className='nav-link'>프로젝트 생성</Link>
                <Link to='/projectDetail' className='nav-link'>프로젝트 조회</Link> */}
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/mypage" component={Mypage} />
                    <Route path="/studyApply" component={StudyApply} />
                    <Route path="/studyCreate" component={StudyCreate} />
                    <Route path="/studyDetail" component={StudyDetail} />
                    <Route path="/projectApply" component={ProjectApply} />
                    <Route path="/projectCreate" component={ProjectCreate} />
                    <Route path="/projectDetail" component={ProjectDetail} />
                    <Route exact path="/" component={Main} />
                </Switch>
            </Container>
            <footer>Footer</footer>
        </>
    );
};

export default App;