import React, { Component } from 'react';
import { Point } from '../tree_menu/TreeMenuApi';
import styled from 'styled-components';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
type MyState = {};

type MyProps = {
  pos: Point;
};

export default class TreeMenuCover extends Component<MyProps, MyState> {
  render () {
    let ImgBlock = styled.img`
      width: 100px;
      height: 100px;
    `;
    return (
      <div
        style={{
          zIndex: 100,
          position: 'absolute',
          width: 300,
          height: 300,
          left: this.props.pos.x - 150,
          top: this.props.pos.y - 150,
        }}
        className='m-0 p-0 rounded'
      >
        <Container className='justify-content-center m-0 p-0 rounded'>
          <Row className='m-0 p-0'>
            <Col className='m-0 p-0'>
              <ImgBlock src='/icons/default.png' className='rounded-left' />
            </Col>
            <Col className='m-0 p-0'>
              <ImgBlock src='/icons/default.png' />
            </Col>
            <Col className='m-0 p-0'>
              <ImgBlock src='/icons/default.png' className='rounded-right' />
            </Col>
          </Row>
          <div
            style={{
              position: 'absolute',
              height: 100,
              bottom: 100,
            }}
            className='m-0 p-0 rounded'
          >
            <h1 className='text-center'>
              <p>ENTER</p>
            </h1>
          </div>
          <div
            style={{
              position: 'absolute',
              height: 100,
              bottom: 0,
            }}
            className='m-0 p-0 rounded'
          >
            <Row className='m-0 p-0'>
              <Col className='m-0 p-0'>
                <ImgBlock src='/icons/default.png' className='rounded-left' />
              </Col>
              <Col className='m-0 p-0'>
                <ImgBlock src='/icons/default.png' />
              </Col>
              <Col className='m-0 p-0'>
                <ImgBlock src='/icons/default.png' className='rounded-right' />
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    );
  }
}
