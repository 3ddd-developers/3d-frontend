import React, { useState, useEffect } from 'react';
import { Row, Tabs, Tab } from 'react-bootstrap';

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
                    <Row style={{ justifyContent: 'center' }}>study</Row>
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