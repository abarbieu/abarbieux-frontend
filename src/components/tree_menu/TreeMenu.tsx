import * as React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
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

//* Types and stuff

//* Each index in active array denotes a layer of the tree,

//* Each layer (at depth i) is an object mapping ids to positions
type MyState = {
  elements: Array<Layer>;
};
type LocationState = {
  openPath?: Array<string>;
  highlighted?: string;
};
type MyProps = RouteComponentProps<{}, {}, LocationState> & {
  rootPos: Point;
  spawnRange: SpawnRange;
  menu: Array<{ [key: string]: MenuNode }>;
};

class TreeMenu extends React.Component<MyProps, MyState> {
  scale: number = 75;
  units: string = 'px';
  menuApi: TreeMenuApi;
  animatedLayer = 1;
  timeouts: Array<number> = [];
  locState: LocationState = {};
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

  componentDidMount () {
    this.handleLoc();
  }

  handleLoc = () => {
    if (this.props.location.state !== this.locState) {
      if (this.props.location.state) {
        this.locState = this.props.location.state;
        console.log(this.locState);
        if (this.locState.openPath) {
          this.openPath(this.locState.openPath);
        }
      }
    }
  };
  openPath = (openPath: Array<string>) => {
    this.timeouts.push(
      setTimeout(() => {
        for (let i = 0; i < openPath.length; i++) {
          let part = openPath[i];
          this.timeouts.push(
            setTimeout(() => {
              if (
                this.state.elements.length > i &&
                this.state.elements[i][part]
              ) {
                this.nodeClicked(i, part);
              }
            }, i * 700)
          );
        }
      }, 500)
    );
  };

  componentDidUpdate () {
    this.handleLoc();
  }

  //! --------------------------------------------------------------------------

  componentWillUnmount () {
    this.timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
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
        setTimeout(() => {
          this.nodeClicked(depth, id);
        }, 350);
      }
      return prevState;
    });
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

      &:active {
        transition: all ease-out 500ms;
        transition-delay: 200ms;
        border-color: #fdb241;
        border-width: 2px;
        z-index: 20;
        font-size: 0pt;
        margin-top: -${this.scale * 2}${this.units};
        margin-left: -${this.scale * 2}${this.units};
        width: ${this.scale * 4}${this.units};
        height: ${this.scale * 4}${this.units};
      }
    `;
  };

  getDynamicStyle = (node: InfoNode, depth: number) => {
    let posx = node.pos.x;
    let posy = node.pos.y;
    let extra: FlattenSimpleInterpolation = css``;
    if (node.hiding && node.animation) {
      extra = css`
        animation: ${node.animation.keyframes} 350ms ease-in forwards;
      `;
    } else if (node.animation && this.animatedLayer === depth) {
      posx = -3 * node.animation.startPos.x + 4 * posx;
      posy = -3 * node.animation.startPos.y + 4 * posy;
      extra = css`
        animation: ${node.animation.keyframes} 500ms ease-in forwards;
      `;
    }
    // background: ${node.background || '#404040'};
    return styled(this.baseStyle())`
    left: ${this.props.rootPos.x + posx}px;
    top: ${this.props.rootPos.y + posy}px;
    
    background-image: linear-gradient(
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.25)
    ), url(/${node.placeholder || 'icons/default.png'});
    ${extra}
    `;
  };
}

//! --------------------------------------------------------------------------

export default withRouter(TreeMenu);
