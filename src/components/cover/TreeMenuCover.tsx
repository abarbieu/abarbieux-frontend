import React, { Component } from 'react';
import { Point } from '../tree_menu/TreeMenuApi';
import { Link, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import styled, { css, keyframes } from 'styled-components';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type LocationState = {
  openPath?: Array<string>;
};
type MyState = {
  // clicked: boolean;
};
type MyProps = RouteComponentProps<{}, {}, LocationState> & {
  pos: Point;
  fading: boolean;
};

class TreeMenuCover extends Component<MyProps, MyState> {
  getAnimation = () => {
    const frames = keyframes`
    0% {
      visibility: visible;
      transform: scale(1);
      opacity: 1;
    }
    
    100% {
      transform: scale(0);
      visibility: hidden;
      opacity: 0;
    }
    `;
    return css`
      animation: ${frames} 1000ms ease-in forwards;
    `;
  };
  render () {
    if (!this.props.fading || this.props.location.state) {
      const Boat = styled.div`
        z-index: 100;
        position: absolute;
        width: 300px;
        height: 300px;
        left: ${this.props.pos.x - 150}px;
        top: ${this.props.pos.y - 150}px;
        background-color: #227b99;
        ${this.props.fading ? this.getAnimation() : ''};
      `;
      const ImgBlock = styled.img`
        width: 100px;
        height: 100px;
      `;

      return (
        <Boat className='m-0 p-0 rounded'>
          <Container className='justify-content-center m-0 p-0 rounded'>
            <Row className='m-0 p-0'>
              <Link
                to={{
                  pathname: '/explore',
                  state: { openPath: [ 'root', 'projects' ] },
                }}
              >
                <Col className='m-0 p-0'>
                  <ImgBlock
                    src='/icons/gpxdemo-o.gif'
                    className='rounded-left'
                  />
                </Col>
              </Link>
              <Link
                to={{
                  pathname: '/explore',
                  state: { openPath: [ 'root', 'art' ] },
                }}
              >
                <Col className='m-0 p-0'>
                  <ImgBlock src='/icons/sherbert.svg' />
                </Col>
              </Link>
              <Link
                to={{
                  pathname: '/explore',
                  state: { openPath: [ 'root', 'projects', 'fun' ] },
                }}
              >
                <Col className='m-0 p-0'>
                  <ImgBlock src='/icons/mzoom.gif' className='rounded-right' />
                </Col>
              </Link>
            </Row>
            <Link
              to={{
                pathname: '/explore',
                state: { openPath: [ 'root' ] },
              }}
            >
              <button
                style={{
                  position: 'absolute',
                  textAlign: 'center',
                  // padding: '20px 0',
                  lineHeight: 100,
                  height: 100,
                  width: 300,
                  bottom: 100,
                  left: 0,
                  backgroundColor: '#116a88',
                }}
                className='rounded'
              >
                <h1
                  style={{
                    lineHeight: 2.5,
                  }}
                >
                  Explore
                </h1>
              </button>
            </Link>
            <div
              style={{
                position: 'absolute',
                height: 100,
                bottom: 0,
              }}
              className='m-0 p-0 rounded'
            >
              <Row className='m-0 p-0'>
                <Link
                  to={{
                    pathname: '/explore',
                    state: { openPath: [ 'root', 'art' ] },
                  }}
                >
                  <Col className='m-0 p-0'>
                    <ImgBlock
                      src='/icons/raw-bowl.jpg'
                      className='rounded-left'
                    />
                  </Col>
                </Link>
                <Link
                  to={{
                    pathname: '/explore',
                    state: { openPath: [ 'root', 'projects' ] },
                  }}
                >
                  <Col className='m-0 p-0'>
                    <ImgBlock src='/icons/jzoom.gif' />
                  </Col>
                </Link>
                <Link
                  to={{
                    pathname: '/explore',
                    state: { openPath: [ 'root', 'art' ] },
                  }}
                >
                  <Col className='m-0 p-0'>
                    <ImgBlock
                      src='/icons/macro-drops.jpg'
                      className='rounded-right'
                    />
                  </Col>
                </Link>
              </Row>
            </div>
          </Container>
        </Boat>
      );
    }

    return <div style={{ display: 'none' }} />;
  }
}

export default withRouter(TreeMenuCover);
