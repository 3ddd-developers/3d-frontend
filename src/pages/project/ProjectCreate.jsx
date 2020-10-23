import React from 'react';
import { Form, FormControl, FormGroup } from "react-bootstrap/Container";

const Input = ({kind}) => {
    return (
        <>
            <Form.Label htmlFor={kind}>{kind}</Form.Label>
            <Form.Control type="text" placeholder={{kind} + "를 입력하세요" } id={kind} />
        </>
    );
}


const Seletion = ({kind, option1, option2, option3}) => {
    return (
        <>
            <label htmlFor={kind}>{kind}</label>
            <select id={kind}>
                <option>{option1}</option>
                <option>{option2}</option>
                <option>{option3}</option>
            </select>
        </>
    );
}

const ProjectCreate = () => {
    return (
        <>
            {/* <Form action="url" method="post">
                <Input kind="제목" />
                <Input kind="장소" />
                <Seletion 
                    kind="진행 방식"
                    option1="오프라인"
                    option2="온라인"
                    option3="둘 다"
                />
                <Seletion 
                    kind="모집 인원"
                    option1="3명 이하"
                    option2="3~8명"
                    option3="8명 이상"
                />
                <Input kind="진행 방식" />
                <Input kind="내용" />
            </Form>
            <button>CANCEL</button>
            <button type="submit">SUBMIT</button> */}
            <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
        </>
    );
};

export default ProjectCreate;