import React, { Component } from 'react';
import { Point } from '../tree_menu/TreeMenuApi';
import img from './ceramic-hands.png';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
type MyState = {};

type MyProps = {
  pos?: Point;
};

export default class TreeMenuCover extends Component<MyProps, MyState> {
  render () {
    return (
      <Container
        style={{ width: 500, height: 500 }}
        className='justify-content-sm-center'
      >
        <Row>
          <Col className='col-md-4' xs={6} md={4}>
            <Image width={128} height={128} src={img} />
          </Col>
          <Col className='col-md-4' xs={6} md={4}>
            <Image width={128} height={128} src={img} />
          </Col>
          <Col className='col-md-4' xs={6} md={4}>
            <Image width={128} height={128} src={img} />
          </Col>
        </Row>
      </Container>
    );
  }
}
