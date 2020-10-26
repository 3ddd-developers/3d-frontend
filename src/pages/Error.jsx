import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { BiError } from "react-icons/bi";


const Error = () => {
    const goBack = () => {
        // console.log(window.history);
        window.history.back();
    }

    const goMain = () => {
        window.location.href = '/';
    }

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
                <Row style={{ justifyContent: 'center', marginTop: '30px' }}>
                    <Button onClick={goBack} className="form-button" style={{ backgroundColor: '#80AAA6', borderColor: '#80AAA6' }}>
                        뒤로가기
  </Button>
                    <Button onClick={goMain} className="form-button" style={{ backgroundColor: '#D7CDC2', borderColor: '#D7CDC2', marginLeft: '10px' }}>
                        메인으로
  </Button>

                </Row>
            </Col>



        </Row>
    );
};

export default Error;