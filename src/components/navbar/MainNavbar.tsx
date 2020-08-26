import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

function MainNavbar(props: { toggleContact: Function }) {
  const [ show, setShow ] = useState(false);
  return (
    <Navbar className="dark-bg" collapseOnSelect fixed="top" expand="md" variant="dark">
      <Container fluid="lg">
        <Navbar.Brand style={{ color: '#60aaf0' }} className="shr-btn-l" href="/">
          <img alt="" src="/icons/sherbert.svg" width="32" height="32" /> {'Aidan Barbieux'}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link className="nav-link shr-btn" eventKey="home" href="/home/">
              <img alt="Home" src="/icons/home.svg" width="32" height="32" />
            </Nav.Link>
            <Nav.Link
              as={Link}
              eventKey="explore"
              className="nav-link shr-btn"
              to={{
                pathname: '/explore/',
                search: '?path=root',
                state: { openPath: [ 'root' ] }
              }}
            >
              <img alt="Explore" src="/icons/explore.svg" width="32" height="32" />
            </Nav.Link>
            <Nav.Link
              as={Link}
              eventKey="ceramics"
              className="nav-link shr-btn"
              to={{
                pathname: '/art/ceramics'
                // search: '?path=art',
                // state: { openPath: [ 'root', 'art' ] }
              }}
            >
              <img alt="Ceramics" src="/icons/art.svg" width="32" height="32" />
            </Nav.Link>
            <Nav.Link
              as={Link}
              eventKey="photos"
              className="nav-link shr-btn"
              to={{
                pathname: '/art/photos'
                // search: '?path=art',
                // state: { openPath: [ 'root', 'art' ] }
              }}
            >
              <img alt="Photos" src="/icons/photos.svg" width="32" height="32" />
            </Nav.Link>
            <Nav.Link
              as={Link}
              eventKey="projects"
              className="nav-link shr-btn"
              to={{
                pathname: '/explore/',
                search: '?path=projects',
                state: { openPath: [ 'root', 'projects' ] }
              }}
            >
              <img alt="Projects" src="/icons/code.svg" width="32" height="32" />
            </Nav.Link>
          </Nav>
          <Nav className="mr-3">
            <NavDropdown
              className="my-auto"
              title={
                <div className=" ml-4 d-inline">
                  <img className="shr-btn" alt="Email" src="/icons/email.svg" width="32" height="32" />
                </div>
              }
              id="collasible-nav-dropdown"
            >
              <Container className="w-100 mx-auto p-0">
                <Navbar.Text style={{ fontSize: 12, color: 'black' }} className=" d-inline m-1 font-weight-bold">
                  <OverlayTrigger
                    placement="left"
                    trigger="click"
                    onToggle={() => {
                      setShow(!show);
                      setTimeout(() => {
                        setShow(false);
                      }, 800);
                    }}
                    show={show}
                    overlay={<Tooltip id="copied">Copied!</Tooltip>}
                  >
                    <span className="d-inline-block">
                      <button
                        style={{ backgroundColor: 'transparent' }}
                        className="d-inline border-0 mr-1 shr-btn"
                        onClick={() => {
                          navigator.clipboard.writeText('aidan@barbieux.dev');
                        }}
                      >
                        <OverlayTrigger
                          placement="top"
                          delay={{ show: 550, hide: 400 }}
                          overlay={<Tooltip id="copy-email">Copy Email?</Tooltip>}
                        >
                          <img width="15" height="15" id="copyIcon" src="/icons/copy.svg" alt="" />
                        </OverlayTrigger>
                      </button>
                    </span>
                  </OverlayTrigger>
                  aidan@barbieux.dev
                </Navbar.Text>
              </Container>
            </NavDropdown>
            <Nav.Link eventKey="contact" className="nav-link shr-btn" onSelect={props.toggleContact.bind(true)}>
              <img alt="Contact" src="/icons/contact.svg" width="32" height="32" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;
