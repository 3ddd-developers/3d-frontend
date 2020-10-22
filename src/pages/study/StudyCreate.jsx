import React from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

const StudyCreate = () => {
    return (
        <>
        <Container>
            <Row>
                <Col xs={4}>foo</Col>
                <Col xs={{ span: 4, offset: 4 }}>bar</Col>
            </Row>
            <Row>
                <Col xs={{ span: 3, offset: 3 }}>foo</Col>
                <Col xs={{ span: 3, offset: 3 }}>bar</Col>
            </Row>
            <Row>
                <Col xs={{ span: 6, offset: 3 }}>foo</Col>
            </Row>
        </Container>
        </>
    );
};

export default StudyCreate;