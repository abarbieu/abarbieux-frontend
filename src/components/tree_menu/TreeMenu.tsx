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
                spawnRange: { from: 0, to: 1.5 },
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

  componentDidMount () {
    console.log('Mounted');
    console.log(this.menuApi.handleSpawn(this.state.elements, 0, 'root'));
    console.log(this.state);
  }

  //! --------------------------------------------------------------------------

  render () {
    return <p>hi</p>;
  }
}

//! --------------------------------------------------------------------------

//* Types and stuff

//* Each index in active array denotes a layer of the tree,
//* Each layer (at depth i) is an object mapping ids to positions
// type MyState = { active: Array<Layer> };
type MyState = {
  elements: Array<{ [key: string]: InfoNode }>;
};
type MyProps = {
  rootPos: Point;
  spawnRange: SpawnRange;
  menu: Array<{ [key: string]: MenuNode }>;
};

export default TreeMenu;
