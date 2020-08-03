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
  animatedLayer = 1;

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
                willSpawn: true,
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

  render (): Array<JSX.Element> {
    let jsxArr: Array<JSX.Element> = [];
    for (let i = 0; i < this.state.elements.length; i++) {
      Object.entries(this.state.elements[i]).forEach(([ id, node ]) => {
        jsxArr.push(this.nodeToJSX(node, i, id));
      });
    }
    this.animatedLayer++;
    return jsxArr;
  }

  //! --------------------------------------------------------------------------

  nodeToJSX = (node: InfoNode, depth: number, id: string): JSX.Element => {
    let MenuButton = this.getDynamicStyle(node, depth);
    // if (node.animation) {
    //   this.state.elements[depth][id].animation = undefined;
    // }
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
      if (prevState.elements[depth][id].willSpawn) {
        prevState.elements[depth][id].willSpawn = false;
        this.animatedLayer = this.menuApi.handleSpawn(
          prevState.elements,
          depth,
          id
        );
      } else {
        prevState.elements[depth][id].willSpawn = true;
        this.animatedLayer = this.menuApi.killKids(
          prevState.elements,
          depth,
          id
        );
      }
      return prevState;
    });
    // setTimeout(() => {
    //   this.setState((prevState) => {
    //     Object.entries(
    //       prevState.elements[depth + 1]
    //     ).forEach(([ id, child ]) => {
    //       child.animation = undefined;
    //     });
    //   });
    // }, 400);
  };

  //! -------------------------------------------------------------------------

  baseStyle = () => {
    return styled.button`
      font-size: 9pt;
      font-weight: 600;
      color: #ffffff;
      text-shadow: 2px 2px #000000;

      outline: none;
      position: fixed;

      width: ${this.scale}${this.units};
      height: ${this.scale}${this.units};
      margin-top: -${this.scale / 2}${this.units};
      margin-left: -${this.scale / 2}${this.units};

      background-size: contain;

      border-radius: 50%;
      &:hover {
        z-index: 500;
        font-size: 14pt;
        margin-top: -${this.scale}${this.units};
        margin-left: -${this.scale}${this.units};
        width: ${this.scale * 2}${this.units};
        height: ${this.scale * 2}${this.units};
        border-color: #fdb241;
        border-width: 2px;
      }
    `;
  };

  getDynamicStyle = (node: InfoNode, depth: number) => {
    let posx = node.pos.x;
    let posy = node.pos.y;
    let extra: FlattenSimpleInterpolation = css``;
    if (node.hiding && node.animation) {
      extra = css`
        animation: ${node.animation.keyframes} 350ms ease-in-out forwards;
      `;
    } else if (node.animation && this.animatedLayer === depth && !node.parent) {
      posx = node.animation.startPos.x;
      posy = node.animation.startPos.y;
      extra = css`
        animation: ${node.animation.keyframes} 350ms ease-in-out forwards;
      `;
    }
    // background: ${node.background || '#404040'};
    return styled(this.baseStyle())`
    left: ${this.props.rootPos.x + posx}px;
    top: ${this.props.rootPos.y + posy}px;
    
    background-image: linear-gradient(
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.25)
    ), url(/${node.background || 'icons/default.png'});
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
