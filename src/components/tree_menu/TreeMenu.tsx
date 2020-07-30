import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, { css, FlattenSimpleInterpolation } from 'styled-components';
// keyframes,
// Keyframes,
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
  menuApi: TreeMenuApi;
  constructor (props: MyProps) {
    super(props);

    this.state = {
      elements:
        [
          {
            root:
              {
                pos: { x: 0, y: 0 },
                title: props.menu[0].root.title,
                spawnRange: props.spawnRange,
              },
          },
        ],
    };
    this.menuApi = new TreeMenuApi({
      menu: props.menu,
      scale: 75,
      units: 'px',
    });
  }

  //! --------------------------------------------------------------------------

  //! --------------------------------------------------------------------------

  render (): Array<JSX.Element> {
    let jsxArr: Array<JSX.Element> = [];
    for (let i = 0; i < this.state.elements.length; i++) {
      Object.entries(this.state.elements[i]).forEach(([ id, node ]) => {
        jsxArr.push(this.nodeToJSX(node, i, id));
      });
    }
    return jsxArr;
  }

  //! --------------------------------------------------------------------------

  nodeToJSX = (node: InfoNode, depth: number, id: string): JSX.Element => {
    let MenuButton = this.getDynamicStyle(node);
    if (node.animation) {
      this.state.elements[depth][id].animation = undefined;
    }
    if (node.route) {
      return (
        <Link to={node.route} key={uuid.v4()}>
          <MenuButton>{node.title}</MenuButton>
        </Link>
      );
    } else if (node.spawnRange) {
      return (
        <MenuButton
          key={uuid.v4()}
          onClick={this.nodeClicked.bind(this, depth, id)}
        >
          {node.title}
        </MenuButton>
      );
    } else if (node.link) {
      return (
        <MenuButton
          key={uuid.v4()}
          onClick={() => (window.location.href = node.link)}
        >
          {node.title}
        </MenuButton>
      );
    }
    return <MenuButton key={uuid.v4()}>{node.title}</MenuButton>;
  };

  //! --------------------------------------------------------------------------

  nodeClicked = (depth: number, id: string): void => {
    this.setState((prevState: MyState) => {
      prevState.elements = this.menuApi.handleSpawn(
        prevState.elements,
        depth,
        id
      );
      return prevState;
    });
  };

  //! --------------------------------------------------------------------------

  baseStyle = () => {
    return styled.button`
      font-size: 10pt;
      outline: none;
      position: fixed;

      width: ${this.scale}${this.units};
      height: ${this.scale}${this.units};
      margin-top: -${this.scale / 2}${this.units};
      margin-left: -${this.scale / 2}${this.units};

      color: #fdb241;
      background: #07837da6;
      border-radius: 50%;
      &:hover {
        border-color: #fdb241;
        border-width: 2px;
      }
    `;
  };
  getDynamicStyle = (node: InfoNode) => {
    let posx = node.pos.x;
    let posy = node.pos.y;
    let extra: FlattenSimpleInterpolation = css``;
    if (node.animation) {
      posx = node.animation.startPos.x;
      posy = node.animation.startPos.y;
      extra = css`
        animation: ${node.animation.keyframes} 350ms ease-in-out forwards;
      `;
    }
    return styled(this.baseStyle())`
      left: ${this.props.rootPos.x / 2 + posx}px;
      top: ${this.props.rootPos.y / 2 + posy}px;

      ${extra}
    `;
  };
}
//! --------------------------------------------------------------------------

//* Types and stuff

//* Each index in active array denotes a layer of the tree,
//* Each layer (at depth i) is an object mapping ids to positions
type MyState = {
  elements: Array<Layer>;
};
type MyProps = {
  rootPos: Point;
  spawnRange: SpawnRange;
  menu: Array<{ [key: string]: MenuNode }>;
};

export default TreeMenu;
