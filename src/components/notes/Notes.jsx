import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import uuid from 'uuid';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Note from './Note';
import moment from 'moment';

export default function Notes () {
  const [ notes, setNotes ] = useState([
    {
      id      : 0,
      title   : '1st Note',
      date    : moment().format('MMMM Do YYYY, h:mm:ss a'),

      content :
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id      : 1,
      title   : '2nd Note',
      date    : moment().format('MMMM Do YYYY, h:mm:ss a'),

      content :
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      id      : 2,
      title   : '3rd Note',
      date    : moment().format('MMMM Do YYYY, h:mm:ss a'),
      content :
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
  ]);

  let apiUrl = 'https://barbieux.dev/api/';
  if (process.env.NODE_ENV === 'development') {
    apiUrl = 'http://localhost:54321/api/';
  }

  const getNotes = () => {
    return notes;
  };

  const archiveNote = (id) => {
    let prevNotes = [ ...notes ];
    prevNotes[id].fadeOut = true;
    setNotes(prevNotes);
    setTimeout(() => {
      let prevNotes = [ ...notes ];
      prevNotes[id].archived = true;
      prevNotes[id].fadeOut = false;
      setNotes(prevNotes);
    }, 700);
  };
  const unArchiveNote = (id) => {
    let prevNotes = [ ...notes ];
    prevNotes[id].fadeOut = true;
    setNotes(prevNotes);
    setTimeout(() => {
      let prevNotes = [ ...notes ];
      prevNotes[id].archived = false;
      prevNotes[id].fadeOut = false;
      setNotes(prevNotes);
    }, 700);
  };
  const toggleExpandNote = (id, expanded) => {
    let prevNotes = [ ...notes ];
    if (expanded) {
      prevNotes[id].expanded = expanded;
    } else {
      prevNotes[id].expanded = !prevNotes[id].expanded;
    }
    setNotes(prevNotes);
  };

  const addNote = (title, content) => {
    setNotes({ ...notes, [uuid.v4()]: { title, content } });
  };
  return (
    <div className='m-2'>
      <Container fluid='lg'>
        {notes.map((note) => {
          return note.archived ? null : (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              content={note.content}
              archived={note.archived}
              date={note.date}
              onArchive={archiveNote}
              onExpand={toggleExpandNote}
              fadeOut={note.fadeOut}
            />
          );
        })}
        <br />
        <br />
        <Accordion>
          <Card className='dark-bg-1-i'>
            <Accordion.Toggle as={Card.Header} eventKey='archive'>
              <h4 className='light-color'>View Archive</h4>
              <div style={{ height: 10 }}>
                <div className='not-a'>
                  <svg
                    className='svg-link-1'
                    height='90%'
                    id='arrow'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 977.77181 362.43902'
                  >
                    <path
                      className='cls-1'
                      d='M32.17545,406.8901,215.91529,529.93749,400.402,653.48508l45.5615,30.51175c15.27176,10.22723,30.68251,21.15367,48.31884,26.96321,26.85942,8.8477,54.14385,4.44918,79.898-5.60258,17.97484-7.01552,34.7889-17.82964,51.145-27.8874,59.41945-36.53837,112.93906-82.26987,167.41117-125.60117L966.39206,413.73l21.09175-16.778c6.015-4.78481,12.37379-11.53625,13.32456-19.63955a19.47922,19.47922,0,0,0-8.98382-18.31175c-15.65409-9.65824-39.88981-6.42306-54.04133,4.83414L791.54706,480.16234c-47.549,37.82416-94.66077,76.29547-142.919,113.21388-26.00458,19.894-52.68824,38.942-80.83316,55.71007l8.33668-4.94436c-11.75858,6.9594-23.67351,13.95648-36.49768,18.78125l9.79156-3.58411a84.83173,84.83173,0,0,1-13.94236,3.75653l10.2718-1.79184a66.47052,66.47052,0,0,1-9.53386.74083l9.692.11361a59.62221,59.62221,0,0,1-10.67148-1.2527l8.68835,1.87632a77.59464,77.59464,0,0,1-15.57306-5.616l7.261,3.49627c-14.4582-7.169-27.6068-16.99609-40.982-25.95322L451.315,605.69772l-87.38846-58.52254L189.14963,430.1301,90.55752,364.10467c-7.19412-4.81778-17.23887-6.13545-25.64129-5.48619-9.37449.72437-20.93395,4.36608-28.4,10.32033-5.97264,4.76321-12.86945,11.46706-13.32456,19.63954a19.70477,19.70477,0,0,0,8.98382,18.31175Z'
                      transform='translate(-23.15248 -353.28687)'
                    />
                  </svg>
                </div>
              </div>
            </Accordion.Toggle>
            <Accordion.Collapse className='dark-bg-i' eventKey='archive'>
              <Card.Body>
                {notes.map((note) => {
                  return note.archived ? (
                    <Note
                      key={note.id}
                      id={note.id}
                      title={note.title}
                      content={note.content}
                      archived={note.archived}
                      date={note.date}
                      onArchive={unArchiveNote}
                      onExpand={toggleExpandNote}
                      fadeOut={note.fadeOut}
                    />
                  ) : null;
                })}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Container>
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
export function AddNote () {
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');
  let apiUrl = 'https://barbieux.dev/api/';
  if (process.env.NODE_ENV === 'development') {
    apiUrl = 'http://localhost:54321/api/';
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(title, content);
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
    <div className='m-2'>
      <Container fluid='lg'>
        <Accordion>
          <Accordion.Toggle as={Button} variant='dark' eventKey='AddNew'>
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
      </Container>;
    </div>
  );
}
