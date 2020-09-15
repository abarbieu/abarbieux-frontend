import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import moment from 'moment';

export default function Note (props) {
  return (
    <div className={props.className}>
      <Accordion
        defaultActiveKey={props.expanded ? props.id + props.title : undefined}
      >
        <Card
          className={'dark-bg-i fade-in' + (props.fadeOut ? ' fade-out' : '')}
        >
          <Accordion.Toggle as={Card.Header} eventKey={props.id + props.title}>
            <h4 className='accent-color'>{props.title || 'No Title'}</h4>
            <div className='light-color txt-sm truncated'>{props.content}</div>
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
            className='dark-bg-1-i'
            eventKey={props.id + props.title}
          >
            <Card.Body className='align-left'>
              <div>
                <p className='light-color sans-serif txt-md'>
                  {props.content || 'No Content'}
                </p>
              </div>
              <div style={{ float: 'right' }} className='m-2'>
                <span className='txt-sm light-color-1 m-2'>
                  Last Edited:{' '}
                  {' ' +
                    moment.unix(props.date).format('MMMM Do YYYY, h:mm:ss a') +
                    ' '}
                </span>
                <Button
                  className='m-1'
                  variant={props.archived ? 'success' : 'warning'}
                  size='sm'
                  onClick={props.onArchive.bind(this, props.id)}
                >
                  {props.archived ? 'Unarchive' : 'Archive'}
                </Button>
                {props.archived ? (
                  <Button
                    className='m-1'
                    variant='danger'
                    size='sm'
                    onClick={props.onDelete.bind(this, props.id)}
                  >
                    Delete
                  </Button>
                ) : null}
              </div>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}
