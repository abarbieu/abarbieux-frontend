import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Dropdown from 'react-bootstrap/Dropdown';
import Container from 'react-bootstrap/Container';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function MainNavbar (props: { toggleContact: Function }) {
  const [ copied, setCopied ] = useState(false);
  const [ copyHover, setCopyHover ] = useState(false);
  return (
    <Navbar
      className='dark-bg'
      collapseOnSelect
      fixed='top'
      expand='md'
      variant='dark'
    >
      <Container fluid='lg'>
        <Navbar.Brand
          style={{ color: '#60aaf0' }}
          className='shr-btn-l'
          href='/'
        >
          <img alt='' src='/icons/sherbert.svg' width='32' height='32' />{' '}
          <span className='accent-color-hover brand-color-1'>
            {'Aidan Barbieux'}
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link
              className='nav-link shr-btn'
              eventKey='home'
              href='/home/'
            >
              {/* <img alt="Home" src="/icons/home.svg" width="32" height="32" /> */}
              Explore
            </Nav.Link>
            <Nav.Link
              className='nav-link shr-btn'
              eventKey='Notes'
              href='/notes/'
            >
              {/* <img alt="Home" src="/icons/home.svg" width="32" height="32" /> */}
              Notes
            </Nav.Link>
            <Nav.Link
              as={Link}
              eventKey='about'
              className='nav-link shr-btn'
              to={{
                pathname: '/about',
              }}
            >
              {/* <img alt="Explore" src="/icons/explore.svg" width="32" height="32" /> */}
              About
            </Nav.Link>
            <Dropdown as='div' id='collasible-nav-dropdown'>
              <Dropdown.Toggle
                id='navbar-dropdown-toggle'
                style={{ backgroundColor: '#0000', borderColor: '#0000' }}
                className='link'
              >
                <div className='link not-a'>Contact</div>
              </Dropdown.Toggle>
              <Container className='p-0 justify-content-center'>
                <Row
                  className='justify-content-center dark-bg-1'
                  style={{ width: '100%' }}
                >
                  <Dropdown.Menu
                    id='navbar-dropdown'
                    className='dark-bg-1-i justify-content-center'
                  >
                    <Dropdown.Item className='dropdown-item'>
                      <Nav.Link
                        as='div'
                        eventKey='contact'
                        className='shr-btn'
                        onSelect={props.toggleContact.bind(true)}
                      >
                        {/* <img alt="Contact" src="/icons/contact.svg" width="32" height="32" /> */}
                        <div className='not-a'>Send a Note</div>
                      </Nav.Link>
                    </Dropdown.Item>
                    <div className='dropdown-item' style={{ marginLeft: -12 }}>
                      <OverlayTrigger
                        placement='top'
                        trigger='click'
                        onToggle={() => {
                          setCopied(!copied);
                          setTimeout(() => {
                            setCopied(false);
                          }, 800);
                        }}
                        show={copied}
                        overlay={<Tooltip id='copied'>Copied!</Tooltip>}
                      >
                        <button
                          style={{
                            backgroundColor: 'transparent',
                          }}
                          className='d-inline border-0 no-focus-outline'
                          onClick={() => {
                            navigator.clipboard.writeText('aidan@barbieux.dev');
                          }}
                        >
                          <OverlayTrigger
                            show={!copied && copyHover}
                            placement='top'
                            delay={{ show: 550, hide: 400 }}
                            onToggle={(toggledTo) => {
                              setCopyHover(toggledTo);
                            }}
                            overlay={
                              <Tooltip id='copy-email'>Copy Email?</Tooltip>
                            }
                          >
                            <div className='border-0 '>
                              <img
                                style={{
                                  fill: 'var(--light-shade)',
                                  stroke: 'var(--light-shade)',
                                }}
                                width='15'
                                height='15'
                                id='copyIcon'
                                src='/icons/stacks.svg'
                                alt=''
                              />
                              <div
                                style={{ fontSize: 13 }}
                                className='ml-1 d-inline light-color-1'
                              >
                                aidan@barbieux.dev
                              </div>
                            </div>
                          </OverlayTrigger>
                        </button>
                      </OverlayTrigger>
                    </div>
                  </Dropdown.Menu>
                </Row>
              </Container>
            </Dropdown>
          </Nav>
          <Nav>
            <Nav.Link
              as={Link}
              eventKey='ceramics'
              className='nav-link shr-btn'
              to={{
                pathname: '/art/ceramics',
                // search: '?path=art',
                // state: { openPath: [ 'root', 'art' ] }
              }}
            >
              {/* <img alt="Ceramics" src="/icons/art.svg" width="32" height="32" /> */}
              Ceramics
            </Nav.Link>
            <Nav.Link
              as={Link}
              eventKey='photos'
              className='nav-link shr-btn'
              to={{
                pathname: '/art/photos',
                // search: '?path=art',
                // state: { openPath: [ 'root', 'art' ] }
              }}
            >
              {/* <img alt="Photos" src="/icons/photos.svg" width="32" height="32" /> */}
              Photos
            </Nav.Link>
            <Nav.Link
              as={Link}
              eventKey='projects'
              className='nav-link shr-btn'
              to={{
                pathname: '/explore/',
                search: '?path=projects',
                state: { openPath: [ 'root', 'projects' ] },
              }}
            >
              {/* <img alt="Projects" src="/icons/code.svg" width="32" height="32" /> */}
              Projects
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
