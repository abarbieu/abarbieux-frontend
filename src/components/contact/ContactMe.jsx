import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function ContactMe (props) {
  const [ email, setEmail ] = useState('');
  const [ content, setContent ] = useState('');
  const [ name, setName ] = useState('');
  const [ subject, setSubject ] = useState('');
  const [ validated, setValidated ] = useState(false);
  const [ attachments, setAttachments ] = useState({});

  let apiUrl = 'https://barbieux.dev/api/mail';
  if (process.env.NODE_ENV === 'development') {
    apiUrl = 'http://localhost:54321/api/mail';
  }
  const handleChangeEmail = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };
  const handleChangeContent = (event) => {
    event.preventDefault();
    setContent(event.target.value);
  };
  const handleChangeSubject = (event) => {
    event.preventDefault();
    setSubject(event.target.value);
  };
  const handleChangeName = (event) => {
    event.preventDefault();
    setName(event.target.value);
  };
  const handleFiles = (event) => {
    event.preventDefault();
    console.log(event.target.files.length);
    let files = [];
    for (let i = 0; i < event.target.files.length; i++) {
      const file = event.target.files[i];
      let f = {};
      f.filename = file.name;
      f.contentType = file.type;
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        f.content = e.target.result;
        console.log(f);
      });
      reader.readAsDataURL(file);
    }
    setAttachments(files);
  };
  const handleSend = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    event.preventDefault();
    axios
      .post(apiUrl, { replyto: email, name, subject, content, attachments })
      .then((res) => {
        console.log(res);
        props.toggleContact.bind(false);
      });
  };

  return (
    <Modal
      show={props.show}
      onHide={props.toggleContact.bind(false)}
      className='contact-modal'
      centered
    >
      <Modal.Header className='pic-modal-header' closeButton>
        <Modal.Title className='white-color'>Send Me an Email</Modal.Title>
      </Modal.Header>
      <div className='p-2'>
        <Form noValidate validated={validated} onSubmit={handleSend}>
          <Form.Row>
            <Form.Group as={Col} sm='6' controlId='validation01'>
              <Form.Control
                className='align-left form-text form-obj'
                required
                type='email'
                value={email}
                onChange={handleChangeEmail}
                placeholder='Your email address'
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                Please provide a response email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} sm='6'>
              <Form.Control
                required
                className='align-left form-text form-obj'
                type='text'
                onChange={handleChangeName}
                placeholder='Your Name'
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                Please provide your name
              </Form.Control.Feedback>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} sm='6'>
              <Form.Control
                className='align-left form-text form-obj'
                type='text'
                onChange={handleChangeSubject}
                placeholder='Subject'
              />
            </Form.Group>
            <Form.Group as={Col} sm='6'>
              <Form.File
                id='exampleFormControlFile1'
                multiple
                onChange={handleFiles}
                className='form-obj form-file'
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Control
              className='align-left form-text form-obj'
              type='text'
              onChange={handleChangeContent}
              as='textarea'
              placeholder='Message'
            />
          </Form.Group>
          <Button type='submit' variant='dark'>
            Send
          </Button>
        </Form>
      </div>
    </Modal>
  );
}
