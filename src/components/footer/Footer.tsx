import React from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logos from './Logos';

export default function Footer () {
  return (
    <div style={{ width: '100vw' }}>
      <Container className='pt-2' fluid='lg'>
        <Row xs={2} sm={3} md={3}>
          <Col>
            <DropdownButton
              as={ButtonGroup}
              key='up'
              id={'dropdown-button-drop-up'}
              drop='up'
              variant='btn-transparent'
              title={
                <div className='link'>
                  {Logos.ig}
                  <span>Instagram</span>
                </div>
              }
            >
              <Dropdown.Item href='https://www.instagram.com/aidan_barbieux/'>
                {Logos.ig}
                <span>Ceramics</span>
              </Dropdown.Item>
              <Dropdown.Item href='https://www.instagram.com/bbq_photos/'>
                {Logos.ig}
                <span>Photography</span>
              </Dropdown.Item>
              <Dropdown.Item href='https://www.instagram.com/aidan.bbq/'>
                {Logos.ig}
                <span>Personal</span>
              </Dropdown.Item>
            </DropdownButton>
          </Col>
          <Col>
            <Button variant='btn-transparent'>
              <a
                className='link'
                title='GitHub'
                href='https://github.com/abarbieu/'
              >
                {Logos.git}
                <span>GitHub</span>
              </a>
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
                <span>LinkedIn</span>
              </a>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
