import React, { Component } from 'react';
import Notes, { AddNote, NotesHeader } from './Notes';
import Container from 'react-bootstrap/Container';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Alert from 'react-bootstrap/esm/Alert';

import moment from 'moment';

export default class NotesPage extends Component {
  constructor (props) {
    super(props);
    this.state = {
      alerts : [],
      notes  : [],
    };
    this.apiUrl = 'https://barbieux.dev/api/';
    if (process.env.NODE_ENV === 'development') {
      this.apiUrl = 'http://localhost:54321/api/';
    }
  }
  componentDidMount () {
    this.getNotes();
  }
  render () {
    return (
      <div>
        <NotesHeader />
        <div className='m-2'>
          <Container fluid='lg'>
            <AddNote onSubmit={this.addNote} />
            <Notes
              notes={this.getActive()}
              onDelete={this.deleteNote}
              onChange={this.updateNote}
              onToggleExpand={this.toggleExpandNote}
              onToggleEdit={this.toggleEditNote}
            />
            {Object.keys(this.getArchive()).length > 0 ? (
              <div>
                <br />
                <br />
                <Accordion>
                  <Card className='dark-bg-1-i'>
                    <Accordion.Toggle as={Card.Header} eventKey='archive'>
                      <h4 className='light-color'>Archive</h4>
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
                    <Accordion.Collapse
                      className='dark-bg-i'
                      eventKey='archive'
                    >
                      <Card.Body>
                        <Notes
                          notes={this.getArchive()}
                          onDelete={this.deleteNote}
                          onChange={this.updateNote}
                          onToggleExpand={this.toggleExpandNote}
                          onToggleEdit={this.toggleEditNote}
                        />
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                </Accordion>
              </div>
            ) : null}
            {this.state.alerts.map((alert, idx) => (
              <Alert
                show={alert.show}
                key={idx}
                onClose={this.dismissAlert.bind(this, idx)}
                variant={alert.msg.variant ? alert.msg.variant : 'danger'}
                dismissible
              >
                <Alert.Heading>{alert.msg.name}</Alert.Heading>
                {alert.msg.message}
              </Alert>
            ))}
          </Container>
        </div>
      </div>
    );
  }

  addError = (err, msg) => {
    console.error(err);
    this.setState((prevState) => {
      prevState.alerts = [
        ...prevState.alerts,
        {
          msg  : { name: err.name, message: err.message + ' : ' + msg },
          show : true,
        },
      ];
      return prevState;
    });
  };

  addAlert = (msg) => {
    this.setState((prevState) => {
      prevState.alerts = [ ...prevState.alerts, { msg, show: true } ];
      return prevState;
    });
  };

  dismissAlert = (idx) => {
    if (idx < this.state.alerts.length) {
      this.setState(
        (prevState) => {
          prevState.alerts[idx].show = false;
          return prevState;
        },
        () => {
          this.setState((prevState) => {
            setTimeout(() => {
              prevState.alerts.splice(idx, 1);
              return prevState;
            }, 5000);
          });
        }
      );
    }
  };

  toggleExpandNote = (id) => {
    setTimeout(() => {
      this.setState((prevState) => {
        prevState.notes.forEach((note) => {
          if (note.id === id) {
            note.expanded = !note.expanded ? true : false;
          }
        });
        return prevState;
      });
    }, 350);
  };
  toggleEditNote = (id) => {
    setTimeout(() => {
      this.setState((prevState) => {
        prevState.notes.forEach((note) => {
          if (note.id === id) {
            note.editing = !note.editing ? true : false;
          }
        });
        return prevState;
      });
    }, 250);
  };
  getArchive = () => {
    return this.state.notes.filter((note) => note.archived);
  };

  getActive = () => {
    return this.state.notes.filter((note) => !note.archived);
  };

  getNotes = () => {
    axios
      .get(this.apiUrl + 'notes')
      .then((res) => {
        if (res.err) {
          throw res.err;
        }
        this.setState({ notes: res.data });
      })
      .catch((err) => {
        this.addError(err, 'While Getting Notes From API');
      });
  };

  updateNote = (id, newData) => {
    axios
      .put(this.apiUrl + `notes/${id}`, newData)
      .then((res) => {
        if (res.err) {
          throw res.err;
        }
        this.setState((prevState) => {
          this.state.notes.forEach((note, idx) => {
            if (note.id === id) {
              prevState.notes[idx] = res.data;
            }
          });
          return prevState;
        });
      })
      .catch((err) => {
        this.addError(
          err,
          `While Updating Note In API With ID: ${id} And Content: ${newData}`
        );
      });
  };

  addNote = (title, content) => {
    axios
      .post(this.apiUrl + 'notes/', {
        title,
        content,
        date    : moment().unix(),
      })
      .then((res) => {
        if (res.err) {
          throw res.err;
        }
        this.setState((prevState) => {
          prevState.notes[res.data.id] = res.data;
          return prevState;
        });
      })
      .catch((err) => {
        this.addError(err, `While Adding Note In API With Title: ${title}`);
      });
  };

  deleteNote = (id) => {
    axios
      .delete(this.apiUrl + `notes/${id}`)
      .then((res) => {
        if (res.err) {
          throw res.err;
        }
        this.setState((prevState) => {
          let newNotes = [];
          prevState.notes.forEach((note) => {
            if (note.id !== id) {
              newNotes.push(note);
            }
          });
          prevState.notes = newNotes;
          return prevState;
        });
      })
      .catch((err) => {
        this.addError(err, `While Deleting Note In API With ID: ${id}`);
      });
  };
}
