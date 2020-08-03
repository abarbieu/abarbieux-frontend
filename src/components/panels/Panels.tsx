import React from 'react';
import styled, { css } from 'styled-components';
import { Point } from '../tree_menu/TreeMenuApi';

type MyState = {
  [key: string]: { hidden?: boolean; size?: Point; classes?: string };
};
type MyProps = {
  screenSize: Point;
};
export default class Panels extends React.Component<MyProps, MyState> {
  // constructor (props) {
  //   super(props);
  //   this.state.left.classes = 'round-right panel';
  //   this.state.left.classes = 'round-top panel';
  // }
  // getLeftStyle = () => {
  //   let ret;
  //   this.setState((state: MyState) => {
  //     state.left = {};
  //     state.left.size = {
  //       x: Math.min(this.props.screenSize.x, 300),
  //       y: Math.min(this.props.screenSize.y, 500),
  //     };
  //     state.left.class = {};
  //     ret = styled.div`
  //       height: ${state.left.size.y};
  //       width: ${state.left.size.x};
  //     `;
  //     return state;
  //   });
  //   return ret;
  // };
}
