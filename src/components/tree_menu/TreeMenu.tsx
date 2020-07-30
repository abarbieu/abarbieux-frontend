import * as React from 'react';
import styled, { keyframes, Keyframes } from 'styled-components';
import TreeMenuApi, {
  InfoNode,
  Point,
  SpawnRange,
  MenuNode,
  Layer,
} from './TreeMenuApi';
import uuid from 'uuid';

class TreeMenu extends React.Component<MyProps, MyState> {
  scale: number = 75;
  units: string = 'px';
  constructor (props: MyProps) {
    super(props);

    this.state = {};
  }

  //! --------------------------------------------------------------------------

  render () {
    return <p>hi</p>;
  }

  getButtonStyle = (node: InfoNode) => {
    let width = this.props.rootPos.x;
    let height = this.props.rootPos.y;
    let x = node.startPos.x;
    let y = node.startPos.y;
    // console.log(x, y);
    // console.log(width, height);
    let radius = this.scale;
    return styled.button`
      font-size: 10pt;
      outline: none;
      position: fixed;

      color: #fdb241;
      background: #07837da6;
      border-radius: 50%;

      width: ${radius}${this.units};
      height: ${radius}${this.units};
      margin-top: -${radius / 2}${this.units};
      margin-left: -${radius / 2}${this.units};

      left: ${width / 2 + x}px;
      top: ${height / 2 + y}px;

      animation: ${node.animation} 350ms ease-in-out forwards;

      &:hover {
        border-color: #fdb241;
        border-width: 2px;
      }
    `;
  };
}

//! --------------------------------------------------------------------------

//* Types and stuff

//* Each index in active array denotes a layer of the tree,
//* Each layer (at depth i) is an object mapping ids to positions
// type MyState = { active: Array<Layer> };
type MyState = {};
type MyProps = {
  rootPos: Point;
  spawnRange: SpawnRange;
  menu: Array<{ [key: string]: MenuNode }>;
};

export default TreeMenu;
