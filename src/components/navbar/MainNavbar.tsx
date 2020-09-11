import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function MainNavbar (props: { toggleContact: Function }) {
  const [ expanded, setExpanded ] = useState(false);
  const [ copied, setCopied ] = useState(false);
  const [ copyHover, setCopyHover ] = useState(false);
  return (
    <Navbar
      expanded={expanded}
      onToggle={setExpanded}
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
          {'Aidan Barbieux'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className={expanded ? 'mr-10' : 'mr-auto'}>
            <Nav.Link
              className='nav-link shr-btn'
              eventKey='home'
              href='/home/'
            >
              {/* <img alt="Home" src="/icons/home.svg" width="32" height="32" /> */}
              Home
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
            <NavDropdown title='Contact' id='collasible-nav-dropdown'>
              <Nav.Link
                eventKey='contact'
                className='shr-btn'
                onSelect={props.toggleContact.bind(true)}
              >
                {/* <img alt="Contact" src="/icons/contact.svg" width="32" height="32" /> */}
                <p className='dark-color'>Send a Note</p>
              </Nav.Link>

              <Nav.Link as={'div'}>
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
                  <span className='d-inline'>
                    <button
                      style={{ backgroundColor: 'transparent' }}
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
                        overlay={<Tooltip id='copy-email'>Copy Email?</Tooltip>}
                      >
                        <div className='border-0'>
                          <img
                            width='15'
                            height='15'
                            id='copyIcon'
                            src='/icons/copy.svg'
                            alt=''
                          />
                          <p
                            style={{ fontSize: 11 }}
                            className='ml-1 d-inline dark-color'
                          >
                            aidan@barbieux.dev
                          </p>
                        </div>
                      </OverlayTrigger>
                    </button>
                  </span>
                </OverlayTrigger>
              </Nav.Link>
            </NavDropdown>
          </Nav>
          <Nav className={expanded ? 'mr-0' : 'mr-0'}>
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
