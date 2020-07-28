import * as React from 'react';
import * as uuid from 'uuid';
import './MenuNode.css';

export default class Menu extends React.Component<MyProps, MyState> {
  constructor (props: MyProps) {
    super(props);

    this.state = {
      active:
        [
          {
            root:
              {
                pos: this.props.rootPos,
                spawnRange: this.props.spawnRange,
                style:
                  { left: this.props.rootPos.x, top: this.props.rootPos.y },
              },
          },
        ],
    };
  }

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

  layerToBtns = (layer: Layer, depth: number): Array<JSX.Element> => {
    const jsxArr: Array<JSX.Element> = [];
    for (let [ id, node ] of Object.entries(layer)) {
      jsxArr.push(
        <div key={uuid.v4()}>
          <button
            className='Menu-btn'
            style={node.style}
            onClick={this.nodeClicked.bind(this, depth, id)}
          >
            {this.props.menu[depth][id].title}
          </button>
        </div>
      );
    }
    return jsxArr;
  };

  nodeClicked = (depth: number, id: string) => {
    this.setState((prevState) => {
      //* Gets node info from menu object
      let menuNode: MenuNode = this.props.menu[depth][id];

      let node: ActiveNode = prevState.active[depth][id];

      let from: number = node.spawnRange.from;
      let to: number = node.spawnRange.to;

      //* Deactivates any siblings
      prevState.active[depth] = { [id]: node };
      if (menuNode.children) {
        const numKids = menuNode.children.length;
        //* Resets layer just in case
        prevState.active[depth + 1] = {};

        //* Adds node's children to active array
        menuNode.children.forEach((child, i) => {
          //* Generates evenly distributed dirs for kids
          const dir = from + i / numKids * ((to < from ? to + 2 : to) - from);

          const diff = this.addAnimation(dir, 50);

          //* Initing each child in next later
          prevState.active[depth + 1][child] = {
            pos: { x: node.pos.x + diff.x, y: node.pos.y + diff.y },
            spawnRange: this.getSpawnRange(dir),
            style:
              {
                animationName: `animation${Math.ceil(dir * 10)}`,
                left: node.pos.x + diff.x,
                top: node.pos.y + diff.y,
              },
          };
        });
      } else if (menuNode.link) {
        this.followLink(menuNode.link);
      } else if (menuNode.route) {
        this.followRoute(menuNode.route);
      } else {
        //! Throw error
      }
      return prevState;
    });
  };

  //* Returns difference translated
  addAnimation = (dir: number, dist: number): { x: number; y: number } => {
    let styleSheet = document.styleSheets[0];
    let animationName: string = `animation${Math.ceil(dir * 10)}`;
    dir = Math.PI * dir;
    let keyframes = `@keyframes ${animationName} {
        0% {
          transform: translate(0px, 0px);
        }
        100% {
          transform: translate(
            ${Math.trunc(Math.cos(dir) * dist)}px,
            ${Math.trunc(Math.sin(dir) * -dist)}px);
          }
        }`;

    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
    return {
      x: Math.trunc(Math.cos(dir) * dist),
      y: Math.trunc(Math.sin(dir) * -dist),
    };
  };

  getSpawnRange = (a: number) => {
    let i: number = Math.floor(((a < 1 ? a + 15 : a) - 1) / 2);
    return {
      from: (Math.floor(i / 2) * 0.5) % 2,
      to: (Math.floor((i + 3) / 2) * 0.5) % 2,
    };
  };

  followLink = (link: string) => {
    console.log('Following link: %s', link);
  };

  followRoute = (route: string) => {
    console.log('Following route: %s', route);
  };
}

type MenuNode = {
  title: string;
  children?: Array<string>;
  link?: string;
  route?: string;
};

type Point = { x: number; y: number };
type Range = { from: number; to: number };

type ActiveNode = {
  pos: Point;
  spawnRange: Range;
  style: object;
};

type Layer = {
  [key: string]: ActiveNode;
};

//* Each index in active array denotes a layer of the tree,
//* Each layer (at depth i) is an object mapping ids to positions
type MyState = { active: Array<Layer> };
type MyProps = {
  rootPos: Point;
  spawnRange: Range;
  menu: Array<{ [key: string]: MenuNode }>;
};
