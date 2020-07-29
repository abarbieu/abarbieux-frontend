import * as React from 'react';
import * as uuid from 'uuid';
import styled from 'styled-components';

class TreeMenu extends React.Component<MyProps, MyState> {
  scale: number = 75;
  units: string = 'px';
  constructor (props: MyProps) {
    super(props);

    this.state = {
      active:
        [
          {
            root:
              {
                offset: { x: 0, y: 0 },
                startOffset: { x: 0, y: 0 },
                spawnRange: this.props.spawnRange,
                animation: '',
              },
          },
        ],
    };
  }

  //! --------------------------------------------------------------------------

  render () {
    let renderedItems: Array<JSX.Element> = [];
    for (let i = 0; i < this.state.active.length; i++) {
      renderedItems = [
        ...renderedItems,
        ...this.layerToBtns(this.state.active[i], i),
      ];
    }
    return renderedItems;
  }

  //! --------------------------------------------------------------------------

  layerToBtns = (layer: Layer, depth: number): Array<JSX.Element> => {
    const jsxArr: Array<JSX.Element> = [];
    for (let [ id, node ] of Object.entries(layer)) {
      let MenuButton = this.getButtonStyle(node);

      jsxArr.push(
        <MenuButton
          key={uuid.v4()}
          onClick={this.nodeClicked.bind(this, depth, id)}
        >
          {this.props.menu[depth][id].title}
        </MenuButton>
      );
    }
    return jsxArr;
  };

  //! --------------------------------------------------------------------------

  nodeClicked = (depth: number, id: string) => {
    //* Queries provided menu json
    let menuNode: MenuNode = this.props.menu[depth][id];
    let node: ActiveNode = this.state.active[depth][id];

    if (menuNode.children) {
      this.setState((prevState) => {
        //* Deactivates everything else
        prevState.active.splice(depth);

        //* Deactivated Siblings
        prevState.active[depth] = { [id]: node };

        return prevState;
      });
      this.addChildren(menuNode.children, depth, id);
    } else if (menuNode.link) {
      this.followLink(menuNode.link);
    } else if (menuNode.route) {
      this.followRoute(menuNode.route);
    } else {
      //! Throw error
    }
  };

  //! --------------------------------------------------------------------------

  addChildren = (children: Array<string>, depth: number, id: string) => {
    let node: ActiveNode = this.state.active[depth][id];
    let to: number = node.spawnRange.to;
    let from: number = node.spawnRange.from;
    const theta = (to - from) / (children.length - 1);

    this.setState((prevState) => {
      //* Resets layer just in case
      prevState.active[depth + 1] = {};

      //* Adds node's children to active array
      children.forEach((child, i) => {
        //* Generates evenly distributed dirs for kids
        const dir = from + i * theta;
        console.log(child, dir);
        //* Diff is distance moved
        const diff = this.addAnimation(dir);

        //* Initing each child in next later
        prevState.active[depth + 1][child] = {
          offset: { x: node.offset.x + diff.x, y: node.offset.y + diff.y },
          startOffset: { x: node.offset.x, y: node.offset.y },
          spawnRange: this.getSpawnRange(dir),
          animation: `animation${Math.ceil(dir * 10)}`,
        };
      });
      return prevState;
    });
  };

  //! --------------------------------------------------------------------------

  //* Returns dist translated
  addAnimation = (dir: number): { x: number; y: number } => {
    let styleSheet = document.styleSheets[0] as CSSStyleSheet;
    let animationName: string = `animation${Math.ceil(dir * 10)}`;
    dir = Math.PI * dir;
    let keyframes = `@keyframes ${animationName} {
        0% {
          transform: translate(0px, 0px);
        }
        100% {
          transform: translate(
            ${Math.trunc(Math.cos(dir) * this.scale)}${this.units},
            ${Math.trunc(Math.sin(dir) * -this.scale)}${this.units});
          }
        }`;

    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    return {
      x: Math.trunc(Math.cos(dir) * this.scale),
      y: Math.trunc(Math.sin(dir) * -this.scale),
    };
  };

  //! --------------------------------------------------------------------------

  getButtonStyle = (node: ActiveNode) => {
    let width = this.props.rootPos.x;
    let height = this.props.rootPos.y;
    let x = node.startOffset.x;
    let y = node.startOffset.y;
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

  //! --------------------------------------------------------------------------
  //{ "title": "Fun", "children": [ "fractals", "data-vis" ] }

  getSpawnRange = (a: number) => {
    a *= 8;
    let i: number = Math.floor(((a < 1 ? a + 15 : a) - 1) / 2);
    return {
      from: Math.floor(i / 2) * 0.5,
      to: Math.floor((i + 3) / 2) * 0.5,
    };
  };

  //! --------------------------------------------------------------------------

  followLink = (link: string) => {
    console.log('Following link: %s', link);
  };

  //! --------------------------------------------------------------------------

  followRoute = (route: string) => {
    console.log('Following route: %s', route);
  };
}

//! --------------------------------------------------------------------------

//* Each index in active array denotes a layer of the tree,
//* Each layer (at depth i) is an object mapping ids to positions
type MyState = { active: Array<Layer> };
type MyProps = {
  rootPos: Point;
  spawnRange: Range;
  menu: Array<{ [key: string]: MenuNode }>;
};

//! Type stuff

type MenuNode = {
  title: string;
  children?: Array<string>;
  link?: string;
  route?: string;
};

type Point = { x: number; y: number };
type Range = { from: number; to: number };

type ActiveNode = {
  offset: Point;
  startOffset: Point;
  spawnRange: Range;
  animation: string;
};

type Layer = {
  [key: string]: ActiveNode;
};

export default TreeMenu;
