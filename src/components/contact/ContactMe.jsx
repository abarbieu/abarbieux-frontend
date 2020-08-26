import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function ContactMe(props) {
  return (
    <Modal show={props.show} onHide={props.toggleContact.bind(false)} className="contact-modal" centered>
      <Modal.Header className="pic-modal-header" closeButton>
        <Modal.Title>Drop me an Email</Modal.Title>
      </Modal.Header>
      <div className="p-2">
        <Form>
          <Form.Group>
            <Form.Control type="email" placeholder="Your email address" />
          </Form.Group>

          <Form.Group>
            <Form.Control style={{ textAlign: 'left' }} as="textarea" type="message" placeholder="Message" />
          </Form.Group>
          <Button type="submit" variant="success">
            Send
          </Button>
        </Form>
      </div>
    </Modal>
  );
}
