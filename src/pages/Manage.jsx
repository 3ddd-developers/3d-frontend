import React, { useState, useEffect } from 'react';
import { Row, Table, Badge } from 'react-bootstrap';
import STUDY_API from '../api/STUDY_API';
import USER_API from '../api/USER_API';

const accept = [], wait = [];

const Manage = props => {
    const [acceptingList, setAcceptingList] = useState([]);
    const [waitingList, setWaitingList] = useState([]);

    const [total, setTotal] = useState(0);


    useEffect(() => {
        // console.log(props.match.params.id);


        STUDY_API.getStudy(props.match.params.id)
            .then(response => {

                response.data.response.applies.forEach(apply => {
                    // console.log(apply.applyStatus.value);
                    if (apply.applyStatus.value === 'SS10') {
                        // 대기중
                        wait.push({ id: apply.applyUser.value })

                    } else if (apply.applyStatus.value === 'SS20') {
                        // 승인
                        accept.push({ id: apply.applyUser.value })

                    }
                });
                setTotal(response.data.response.applyCount.memberNumber);
            })
            .catch(err => {
                console.log(err);
            })

        // wait
        let arr = [];
        wait.forEach(item => {
            USER_API.getMyInfo(item.id)
                .then(response => {
                    // console.log(response.data.response.name);
                    // item.name = response.data.response.name;
                    arr.push({
                        id: item.id,
                        name: response.data.response.name
                    });
                })
                .catch(err => {
                    console.log(err);
                })
        });
        console.log(arr)
        setWaitingList(arr);

        accept.forEach(item => {
            USER_API.getMyInfo(item.id)
                .then(response => {
                    // console.log(response);
                    item.name = response.data.response.name;
                    item.email = response.data.response.email.address;
                })
                .catch(err => {
                    console.log(err);
                })
        })
        // accept  


        setAcceptingList(accept);


    }, []);

    console.log(waitingList)

    return (
        <>
            <Row style={{ justifyContent: 'center' }}>
                <h2 className="form-title">지원 관리 페이지</h2>
            </Row>
            <Row style={{ justifyContent: 'center', marginTop: '15px' }}>
                <p className="form-description">스터디 지원을 승인 혹은 거절할 수 있습니다.</p>
            </Row>
            <Row style={{ justifyContent: 'center' }}>
                <p className="form-description">총 모집인원: {total} 명 </p>
            </Row>
            <Row style={{ justifyContent: 'center', marginTop: '30px' }}>
                <span style={{ marginBottom: '20px', width: '100%', textAlign: 'center' }}>대기중</span>
                <Table style={{ textAlign: 'center', width: '900px' }} striped bordered hover>
                    <thead>
                        <tr>
                            <th>닉네임</th>
                            <th>승인 / 거절</th>
                        </tr>
                    </thead>
                    <tbody>
                        {waitingList.map(user => <tr key={user.id}><td>{user.name}</td><td><Badge variant="info" pill style={{ cursor: 'pointer' }} value={user.id}>관리하기</Badge></td></tr>)}
                    </tbody>
                </Table>
            </Row>
            <Row style={{ justifyContent: 'center', marginTop: '30px' }}>
                <span style={{ marginBottom: '20px', width: '100%', textAlign: 'center' }}>승인 완료</span>
                <Table style={{ textAlign: 'center', width: '900px' }} striped bordered hover>
                    <thead>
                        <tr>
                            <th>닉네임</th>
                            <th>이메일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {acceptingList.map(user => <tr key={user.id}><td>{user.name}</td><td>{user.email}</td></tr>)}
                    </tbody>
                </Table>
            </Row>
        </>
    );
};

export default Manage;