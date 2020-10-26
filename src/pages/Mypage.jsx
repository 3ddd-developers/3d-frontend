import React, { useState, useEffect } from 'react';
import { Row, Tabs, Tab, Table } from 'react-bootstrap';

const Mypage = () => {
    const [description, setDescription] = useState('나의 스터디 모집 및 지원 현황을 확인할 수 있습니다.');
    const [tab, setTab] = useState('study');

    const onSelect = t => {
        setTab(t);
        t === 'study' ? setDescription('나의 스터디 모집 및 지원 현황을 확인할 수 있습니다.') : setDescription('나의 프로젝트 모집 및 지원 현황을 확인할 수 있습니다.');
    }

    useEffect(() => {
        if (!window.localStorage.getItem('userId')) {
            window.location.href = '/#/login';
            return;
        }
    }, []);

    return (
        <>
            <Row style={{ justifyContent: 'center' }}>
                <h2 className="form-title">마이 페이지</h2>
            </Row>
            <Row style={{ justifyContent: 'center', marginTop: '15px' }}><p className="form-description">{description}</p></Row>

            <Tabs style={{ width: '500px', marginLeft: 'auto', marginRight: 'auto', marginTop: '30px' }} activeKey={tab} id="tab" onSelect={onSelect}>
                <Tab eventKey="study" title="스터디">
                    <Row style={{ justifyContent: 'center', marginTop: '30px' }}>
                        <span style={{ marginBottom: '20px', width: '100%', textAlign: 'center' }}>모집 현황</span>
                        <Table style={{ textAlign: 'center', width: '900px' }} striped bordered hover>
                            <thead>
                                <tr>
                                    <th>제목</th>
                                    <th>상태</th>
                                    <th>현황</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>리액트 스터디 모집해요!</td>
                                    <td>모집중</td>
                                    <td>2 / 4</td>
                                </tr>
                                <tr>
                                    <td>알고리즘 스터디 해요~</td>
                                    <td>모집완료</td>
                                    <td>3 / 3</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                    <Row style={{ justifyContent: 'center', marginTop: '30px' }}>
                        <span style={{ marginBottom: '20px', width: '100%', textAlign: 'center' }}>지원 현황</span>
                        <Table style={{ textAlign: 'center', width: '900px' }} striped bordered hover>
                            <thead>
                                <tr>
                                    <th>제목</th>
                                    <th>상태</th>
                                    <th>현황</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>리액트 스터디 모집해요!</td>
                                    <td>대기중</td>
                                    <td>2 / 4</td>
                                </tr>
                                <tr>
                                    <td>알고리즘 스터디 해요~</td>
                                    <td>거절됨</td>
                                    <td>3 / 3</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Row>
                </Tab>
                <Tab eventKey="project" title="프로젝트">
                    {/* TODO */}
                    <Row style={{ justifyContent: 'center' }}>project</Row>
                </Tab>
            </Tabs>





        </>
    );
};

export default Mypage;