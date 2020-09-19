import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Note from "./Note";
import PropTypes from "prop-types";

Notes.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
  notes: PropTypes.array.isRequired,
};

export default function Notes(props) {
  const notes = props.notes.sort((note1, note2) => {
    console.log(note1.severity, note2.severity);
    if (note1.severity) {
      if (note2.severity) {
        if (note1.severity === note2.severity) {
          return note2.date - note1.date;
        }
        return note2.severity - note1.severity;
      }
      return -1;
    } else if (note2.severity) {
      return 1;
    } else {
      return note2.date - note1.date;
    }
  });
  return (
    <div>
      <Container className='rounded'>
        <Row className='p-0'>
          {notes.map((note) => {
            return (
              <Col key={note.id} className='m-0 p-0'>
                <Note
                  key={note.id}
                  id={note.id}
                  note={note}
                  onDelete={props.onDelete}
                  onChange={props.onChange}
                  onToggleEdit={props.onToggleEdit}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
export function NotesHeader() {
  return (
    <header className='dark-bg-1 p-3 w-100'>
      <h1 className='accent-color'>Notes</h1>
    </header>
  );
}

AddNote.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export function AddNote(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editing, setEditing] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit({ title, content, severity: 50 });
    setContent("");
    setTitle("");
    setEditing(!editing);
  };
  const handleChangeTitle = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };
  const handleChangeContent = (event) => {
    event.preventDefault();
    setContent(event.target.value);
  };
  return (
    <Accordion activeKey={editing ? "AddNew" : null}>
      <Accordion.Toggle
        as={Button}
        className={"mb-2"}
        variant={editing ? "danger" : "info"}
        onClick={setEditing.bind(this, !editing)}
      >
        {editing ? "Cancel" : "Add New"}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey='AddNew'>
        <Form onSubmit={handleSubmit}>
          <Form.Group className='m-0' controlId='validation01'>
            <Form.Control
              className='align-left form-text form-obj'
              type='text'
              value={title}
              onChange={handleChangeTitle}
              placeholder='Title'
            />
            <Form.Control
              className='align-left form-text form-obj'
              type='text'
              value={content}
              onChange={handleChangeContent}
              as='textarea'
              placeholder='Content'
            />
          </Form.Group>
          <Accordion.Toggle
            as={Button}
            type='submit'
            variant='success'
            eventKey='AddNew'
          >
            Submit
          </Accordion.Toggle>
        </Form>
      </Accordion.Collapse>
    </Accordion>
  );
}
