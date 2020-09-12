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
  const [ mailAlerts, setMailAlerts ] = useState([]);
  const [ attLoaded, setAttLoaded ] = useState(true);

  //! <0 means sending, 0 means not sent, 1 means sent
  const [ sendState, setSendState ] = useState(0);

  let apiUrl = 'https://barbieux.dev/api/mail';
  if (process.env.NODE_ENV === 'development') {
    apiUrl = 'http://localhost:54321/api/mail';
  }

  const checkSendState = (onFire) => {
    if (sendState >= 0) {
      setSendState(0);
      onFire();
    } else {
      setMailAlerts([
        ...mailAlerts,
        { msg: 'Cannot edit yet, sending...', show: true },
      ]);
    }
  };

  const addMailAlert = (alert) => {
    setMailAlerts([ ...mailAlerts, alert ]);
  };

  const handleChangeEmail = (event) => {
    event.preventDefault();
    checkSendState(setEmail.bind(this, event.target.value));
  };
  const handleChangeContent = (event) => {
    event.preventDefault();
    checkSendState(setContent.bind(this, event.target.value));
  };
  const handleChangeSubject = (event) => {
    event.preventDefault();
    checkSendState(setSubject.bind(this, event.target.value));
  };
  const handleChangeName = (event) => {
    event.preventDefault();
    checkSendState(setName.bind(this, event.target.value));
  };

  const handleFiles = (event) => {
    event.preventDefault();
    checkSendState(
      ((event) => {
        const files = event.target.files;
        let addedFiles = [];
        for (let i = 0; i < files.length; i++) {
          setAttLoaded(false);
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
              setAttLoaded(true);
            }
          });
          reader.readAsDataURL(file);
        }
      }).bind(this, event)
    );
  };

  const handleSend = (event) => {
    checkSendState(
      ((event) => {
        setSendState(-1);
        const form = event.currentTarget;
        setValidated(true);
        event.preventDefault();
        if (form.checkValidity() === false) {
          setSendState(0);
          event.stopPropagation();
        } else {
          setSendState(-1);
          if (!attLoaded) {
            setSendState(0);
            console.error('Attachments not loaded yet, not sending');
            addMailAlert({
              msg  : 'Attachments not loaded yet, not sending',
              show : true,
            });
          }
          axios
            .post(apiUrl, {
              replyto     : email,
              name,
              subject,
              content,
              attachments,
            })
            .catch((err) => {
              console.log(err);
              setSendState(0);
              addMailAlert({ msg: err.message, show: true });
              throw err;
            })
            .then((res) => {
              setSendState(1);
              addMailAlert({
                msg     : `Mail Sent! Thanks ${name}`,
                show    : true,
                variant : 'success',
              });
              setTimeout(() => {
                props.toggleContact(false);
              }, 1000);
            });
        }
      }).bind(this, event)
    );
  };

  const dismissMailAlert = (index) => {
    if (index < mailAlerts.length) {
      const old = mailAlerts[index];
      if (old) {
        const tmpAlerts = [ ...mailAlerts ];
        tmpAlerts[index].show = false;
        setMailAlerts(tmpAlerts);
        setTimeout(() => {
          tmpAlerts.splice(index, 1);
          setMailAlerts(tmpAlerts);
        }, 500);
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
                disabled={sendState < 0 ? true : false}
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
          <Button
            type='submit'
            variant='dark'
            disabled={sendState !== 0 ? true : false}
          >
            {'Sen' + (sendState < 0 ? 'ding...' : sendState > 0 ? 't!' : 'd')}
          </Button>
        </Form>
      </div>
      {mailAlerts.map((alert, idx) => (
        <Alert
          show={alert.show}
          key={idx}
          onClose={dismissMailAlert.bind(this, idx)}
          variant={alert.variant ? alert.variant : 'danger'}
          dismissible
        >
          {alert.msg}
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
