import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { BiError } from "react-icons/bi";


const Error = () => {
    return (
        <Row style={{ justifyContent: 'center' }}>
            <Col>
                <Row style={{ justifyContent: 'center' }}>
                    <BiError style={{ display: 'block', width: '300px', height: '300px', color: '#B5A89B' }} />
                </Row>
                <Row style={{ justifyContent: 'center' }}>
                    <span style={{ color: '#80AAA6', fontWeight: 'bold', fontSize: '40px' }}>404 Not Found</span>
                </Row>
                <Row style={{ justifyContent: 'center' }}>
                    <span style={{ color: '#80AAA6', fontWeight: 'bold', fontSize: '20px' }}>찾을 수 없는 페이지입니다.</span>
                </Row>
            </Col>



        </Row>
    );
};

export default Error;