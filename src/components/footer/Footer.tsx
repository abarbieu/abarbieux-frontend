import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Logos from "./Logos";

export default function Footer() {
  return (
    <div
      className='dark-bg'
      style={{ position: "fixed", bottom: 0, width: "100vw" }}
    >
      <Container fluid='lg'>
        <Row xs={3} sm={3} md={3}>
          <Col>
            <Dropdown
              as={ButtonGroup}
              key='up'
              id={"dropdown-button-drop-up"}
              drop='up'
            >
              <Dropdown.Toggle id='dropdown-basic' variant='secondary'>
                <div className='link not-a'>{Logos.ig}</div>
              </Dropdown.Toggle>
              <Dropdown.Menu className='dropdown'>
                <Dropdown.Item
                  className='dropdown-item'
                  href='https://www.instagram.com/aidan_barbieux/'
                >
                  {Logos.ig}
                  <span>{"   "}Ceramics</span>
                </Dropdown.Item>
                <Dropdown.Item
                  className='dropdown-item'
                  href='https://www.instagram.com/bbq_photos/'
                >
                  {Logos.ig}
                  <span>{"   "}Photography</span>
                </Dropdown.Item>
                <Dropdown.Item
                  className='dropdown-item'
                  href='https://www.instagram.com/aidan.bbq/'
                >
                  {Logos.ig}
                  <span>{"   "}Personal</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Button
              as='a'
              href='https://github.com/abarbieu/'
              title='GitHub'
              className='link'
              variant='btn-transparent'
            >
              {Logos.git}
            </Button>
          </Col>
          <Col>
            <Button variant='btn-transparent'>
              <a
                className='link'
                title='Linkedin'
                href='https://www.linkedin.com/in/aidanbarbieux/'
              >
                {Logos.in}
              </a>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
