import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function ContactMe(props) {
  const [ email, setEmail ] = useState('');
  const [ content, setContent ] = useState('');
  const [ name, setName ] = useState('');
  const [ subject, setSubject ] = useState('');

  let apiUrl = 'https://barbieux.dev/api/sendMail';
  if (process.env.NODE_ENV === 'development') {
    apiUrl = 'http://localhost:54321/api/sendMail';
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
  const handleSend = (event) => {
    event.preventDefault();
    axios.post(apiUrl, { replyTo: email, name, subject, content }).then((res) => {
      console.log(res);
      props.toggleContact.bind(false);
    });
  };

  return (
    <Modal show={props.show} onHide={props.toggleContact.bind(false)} className="contact-modal" centered>
      <Modal.Header className="pic-modal-header" closeButton>
        <Modal.Title>Send Me an Email</Modal.Title>
      </Modal.Header>
      <div className="p-2">
        <Form onSubmit={handleSend}>
          <Form.Group>
            <Form.Control
              className="align-left"
              type="email"
              value={email}
              onChange={handleChangeEmail}
              placeholder="Your email address"
            />
            <Form.Control className="align-left" type="text" onChange={handleChangeName} placeholder="Your Name" />
          </Form.Group>
          <Form.Group>
            <Form.Control className="align-left" type="text" onChange={handleChangeSubject} placeholder="Subject" />
            <Form.Control
              className="align-left"
              type="text"
              onChange={handleChangeContent}
              as="textarea"
              placeholder="Message"
            />
          </Form.Group>
          <Button type="submit" variant="success">
            Send
          </Button>
        </Form>
      </div>
    </Modal>
  );
}
