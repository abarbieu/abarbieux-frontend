import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Note from './Note';
import PropTypes from 'prop-types';
import uuid from 'uuid';

Notes.propTypes = {
  onDelete       : PropTypes.func.isRequired,
  onChange       : PropTypes.func.isRequired,
  onToggleExpand : PropTypes.func.isRequired,
  onToggleEdit   : PropTypes.func.isRequired,
  notes          : PropTypes.array.isRequired,
};

export default function Notes (props) {
  return (
    <div>
      {props.notes.map((note) => {
        return (
          <Note
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            archived={note.archived}
            date={note.date}
            expanded={note.expanded}
            editing={note.editing}
            onDelete={props.onDelete}
            onChange={props.onChange}
            onToggleExpand={props.onToggleExpand}
            onToggleEdit={props.onToggleEdit}
          />
        );
      })}
    </div>
  );
}
export function NotesHeader () {
  return (
    <header className='dark-bg-1 p-3 w-100'>
      <h1 className='accent-color'>Notes</h1>
    </header>
  );
}

AddNote.propTypes = {
  onSubmit : PropTypes.func.isRequired,
};

export function AddNote (props) {
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit(title, content);
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
    <Accordion>
      <Accordion.Toggle
        as={Button}
        className='brand-bg-i mb-2'
        eventKey='AddNew'
      >
        Add New
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
