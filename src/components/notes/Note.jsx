import React, { useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import PropTypes from "prop-types";
import moment from "moment";

Note.propTypes = {
  id: PropTypes.number,
  note: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onToggleEdit: PropTypes.func.isRequired,
};
export default function Note(props) {
  const note = props.note;
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [severity, setSeverity] = useState(note.severity || 50);
  const [oTitle, setOTitle] = useState(note.title);
  const [oContent, setOContent] = useState(note.content);
  const headerBG = note.archived ? "dark-bg-1-i" : "dark-bg-i";
  const bodyBG = note.archived ? "dark-bg-i" : "dark-bg-1-i";
  const handleSubmit = (event) => {
    event.preventDefault();
    setOTitle(title);
    setOContent(content);
    props.onChange(note.id, { title, content });
  };

  const handleChangeTitle = (event) => {
    event.preventDefault();
    setTitle(event.target.value);
  };

  const handleChangeContent = (event) => {
    event.preventDefault();
    setContent(event.target.value);
  };

  const handleCancel = () => {
    props.onToggleEdit(note.id);
    setContent(oContent);
    setTitle(oTitle);
  };
  const handleSeverity = (event) => {
    event.preventDefault();
    let sev = event.target.value;
    setSeverity(sev);
    // if (sev >= 37.5 && sev < 62.5) {
    //   sev = -1;
    // }
    props.onChange(note.id, {
      date: moment().unix(),
      severity: sev,
    });
  };
  const getSeverityColor = () => {
    if (severity < 12.5) {
      return "var(--good)";
    } else if (severity < 37.5) {
      return "var(--neutral)";
    } else if (severity < 62.5) {
      return "var(--clear)";
    } else if (severity < 87.5) {
      return "var(--warning)";
    } else {
      return "var(--bad)";
    }
  };
  return (
    <div className={props.className}>
      <Accordion
        style={{ border: "solid 3px " + getSeverityColor() }}
        className='p-0 m-1 rounded-10'
      >
        <Card style={{ minWidth: "12rem" }} className={headerBG + " p-1"}>
          <Accordion.Toggle as={Card.Header} eventKey={props.id}>
            <h4 className='accent-color nowrap'>{title || "No Title"}</h4>
            <div className='light-color txt-sm truncated'>
              {content.indexOf("\n") > 0
                ? content.slice(0, content.indexOf("\n"))
                : content}
            </div>

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
          <Accordion.Collapse eventKey={props.id}>
            <Card.Body className='align-left p-0'>
              <Card className={"m-0 " + bodyBG}>
                <Card.Header>
                  <Container className='p-0 m-0'>
                    <Row>
                      <Col xs={9} className='p-0'>
                        <span className='txt-sm accent-color-1 f-left'>
                          {moment.unix(note.date).format("ddd h:mma, M/D/YY")}
                        </span>
                      </Col>
                      <Col xs={3} className='p-0'>
                        <div className='f-right'>
                          {!note.archived && !note.editing ? (
                            <div>
                              <Button
                                variant='info'
                                size='sm'
                                onClick={props.onToggleEdit.bind(
                                  this,
                                  props.id
                                )}
                              >
                                Edit
                              </Button>
                            </div>
                          ) : note.editing ? (
                            <div>
                              <Button
                                variant='danger'
                                size='sm'
                                onClick={handleCancel}
                              >
                                Cancel
                              </Button>
                            </div>
                          ) : null}
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </Card.Header>
                <Card.Body>
                  <div>
                    {note.editing ? (
                      <Form onSubmit={handleSubmit}>
                        <Form.Group>
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
                        <div className='m-0'>
                          <Button type='submit' variant='success' size='sm'>
                            Submit
                          </Button>
                        </div>
                      </Form>
                    ) : (
                      <Card.Text className='p-0'>
                        <span className='newlines not-p light-color sans-serif txt-md'>
                          {note.content || "No Content"}
                        </span>
                      </Card.Text>
                    )}
                  </div>
                </Card.Body>
                <div>
                  <Button
                    className='m-1 f-right'
                    variant={note.archived ? "success" : "warning"}
                    size='sm'
                    onClick={props.onChange.bind(this, props.id, {
                      archived: !props.archived,
                    })}
                  >
                    {note.archived ? "Unarchive" : "Archive"}
                  </Button>
                  {note.archived ? (
                    <Button
                      className='m-1 f-right'
                      variant='danger'
                      size='sm'
                      onClick={props.onDelete.bind(this, props.id)}
                    >
                      Delete
                    </Button>
                  ) : null}
                  <Form className='ml-4 mt-2 f-left'>
                    <Form.Group as={Row}>
                      <Form.Control
                        onMouseUp={handleSeverity}
                        custom
                        type='range'
                        size='sm'
                      />
                    </Form.Group>
                  </Form>
                </div>
              </Card>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}
