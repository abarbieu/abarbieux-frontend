import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function ContactMe(props) {
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [sent, setSent] = useState(false);

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
  const handleSend = (event) => {
    event.preventDefault();
    axios
      .post(apiUrl, { replyto: email, name, subject, content })
      .then((res) => {
        console.log(res);
        setSent(true);
        props.toggleContact.bind(false);
      });
  };

  return (
    <Modal
      show={props.show && !sent}
      onHide={props.toggleContact.bind(false)}
      className="contact-modal"
      centered
    >
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
            <Form.Control
              className="align-left"
              type="text"
              onChange={handleChangeName}
              placeholder="Your Name"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="align-left"
              type="text"
              onChange={handleChangeSubject}
              placeholder="Subject"
            />
            <Form.Control
              className="align-left"
              type="text"
              onChange={handleChangeContent}
              as="textarea"
              placeholder="Message"
            />
          </Form.Group>
          <Button
            type="submit"
            variant="success"
            onClick={() => {
              setSent(true);
              props.toggleContact(false);
            }}
          >
            Send
          </Button>
        </Form>
      </div>
    </Modal>
  );
}
