import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { AiTwotoneAlert } from "react-icons/ai";


const CommingSoon = () => {
    const goBack = () => {
        window.history.back();
    }

    const goMain = () => {
        window.location.href = '/';
    }

    return (
        <Row style={{ justifyContent: 'center' }}>
            <Col>
                <Row style={{ justifyContent: 'center' }}>
                    <AiTwotoneAlert style={{ display: 'block', width: '300px', height: '300px', color: '#B5A89B' }} />
                </Row>
                <Row style={{ justifyContent: 'center' }}>
                    <span style={{ color: '#80AAA6', fontWeight: 'bold', fontSize: '40px' }}>Comming Soon.</span>
                </Row>
                <Row style={{ justifyContent: 'center' }}>
                    <span style={{ color: '#80AAA6', fontWeight: 'bold', fontSize: '20px' }}>준비중인 페이지 입니다.</span>
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

export default CommingSoon;