import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Alert from 'react-bootstrap/esm/Alert';

export default function ContactMe (props) {
  const [ email, setEmail ] = useState('');
  const [ content, setContent ] = useState('');
  const [ name, setName ] = useState('');
  const [ subject, setSubject ] = useState('');
  const [ validated, setValidated ] = useState(false);
  const [ attachments, setAttachments ] = useState([]);
  const [ mailErrors, setMailErrors ] = useState([]);
  const [ loaded, setLoaded ] = useState(true);
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
    const files = event.target.files;
    let addedFiles = [];
    for (let i = 0; i < files.length; i++) {
      setLoaded(false);
      const file = files[i];
      let f = {};
      f.filename = file.name;
      f.contentType = file.type;
      const reader = new FileReader();
      reader.addEventListener('load', (e) => {
        f.raw = e.target.result;
        addedFiles.push(f);
        setAttachments(addedFiles);
        if (i === files.length - 1) {
          setLoaded(true);
        }
      });
      reader.readAsDataURL(file);
    }
  };

  const handleSend = (event) => {
    const form = event.currentTarget;
    setValidated(true);
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (!loaded) {
        console.error('Attachments not loaded yet, not sending');
        setMailErrors([
          ...mailErrors,
          { msg: 'Attachments not loaded yet, not sending', show: true },
        ]);
      }
      axios
        .post(apiUrl, { replyto: email, name, subject, content, attachments })
        .catch((err) => {
          console.log(err);
          setMailErrors([ ...mailErrors, { msg: err.message, show: true } ]);
          throw err;
        })
        .then((res) => {
          props.toggleContact(false);
        });
    }
  };

  const dismissErr = (index) => {
    if (index < mailErrors.length) {
      const old = mailErrors[index];
      if (old) {
        const tmpErrs = [ ...mailErrors ];
        tmpErrs[index] = { msg: old.msg || 'Unknown Error', show: false };
        setMailErrors(tmpErrs);
      }
    }
  };

  return (
    <Modal
      onHide={props.toggleContact.bind(false)}
      show={props.show}
      className='contact-modal'
      centered
    >
      <Modal.Header
        className='pic-modal-header'
        closeButton
        onHide={props.toggleContact.bind(false)}
      >
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
              <Form.Control.Feedback>
                I'll Respond to {email}!
              </Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                Please provide a response email
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} sm='6'>
              <Form.Control
                required
                className='align-left form-text form-obj'
                type='text'
                value={name}
                onChange={handleChangeName}
                placeholder='Your Name'
              />
              <Form.Control.Feedback>Thanks {name}!</Form.Control.Feedback>
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
                value={subject}
                onChange={handleChangeSubject}
                placeholder='Subject'
              />
            </Form.Group>
            <Form.Group as={Col} sm='6'>
              <Form.File
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
              value={content}
              as='textarea'
              placeholder='Message'
            />
          </Form.Group>
          <Button type='submit' variant='dark'>
            Send
          </Button>
        </Form>
      </div>
      {mailErrors.map((err, idx) => (
        <Alert
          show={err.show}
          key={idx}
          onClose={dismissErr.bind(this, idx)}
          variant='danger'
          dismissible
        >
          {err.msg}
        </Alert>
      ))}
    </Modal>
  );
}

//
// {serverError ? (
//   <Alert variant='danger'>Mailer API not responding..</Alert>
// ) : null}{' '}
// }
