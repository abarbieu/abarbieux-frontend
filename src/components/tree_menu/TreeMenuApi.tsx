// import * as uuid from 'uuid';
import { keyframes, Keyframes } from 'styled-components';

class TreeMenuApi {
  scale: number;
  units: string;
  menu: Array<{ [key: string]: MenuNode }>;
  constructor (props: MyProps) {
    this.scale = props.scale;
    this.units = props.units;
    this.menu = props.menu;
  }

  //! --------------------------------------------------------------------------

  handleSpawn = (currElem: Array<Layer>, depth: number, id: string): number => {
    let node: InfoNodeChildren = currElem[depth][id] as InfoNodeChildren;
    const from: number = node.spawnRange.from;
    let to: number = node.spawnRange.to;
    const children: Array<string> = (this.menu[depth][id] as MenuNodeChildren)
      .children;
    //* Handles root, or 360 spawn, prevents overlap
    if (from + 2 === to) {
      to = to - 2 / children.length;
    }
    const theta = (to - from) / (children.length - 1);

    //* Deactivates everything else
    currElem.splice(depth + 2);

    //* Deactivates Siblings
    node.parent = true;
    currElem[depth] = { [id]: node };

    //* Resets next layer
    currElem[depth + 1] = currElem[depth + 1] ? currElem[depth + 1] : {};

    //* Adds node's children to currElem, returns currElem
    children.forEach((child: string, i: number) => {
      if (!currElem[depth + 1][child] || currElem[depth + 1][child].hiding) {
        //* Generates evenly distributed dirs for kids
        const dir = from + i * theta;

        //* Diff is distance moved
        const diff = this.dirToDist(dir);
        const menuInfo: MenuNode = this.menu[depth + 1][child];
        const baseInfo = {
          title: menuInfo.title,
          background: menuInfo.background,
          parent: false,
          hiding: false,
          willSpawn: true,
          pos: { x: diff.x + node.pos.x, y: diff.y + node.pos.y },
          animation: { keyframes: this.getKeyframes(dir), startPos: node.pos },
        };

        //* Populates new children based on type, inline typeguards
        if ((menuInfo as MenuNodeChildren).children) {
          currElem[depth + 1][child] = {
            ...baseInfo,
            spawnRange: this.getSpawnRange(dir),
          };
        } else if ((menuInfo as MenuNodeRoute).route) {
          currElem[depth + 1][child] = {
            ...baseInfo,
            route: (menuInfo as MenuNodeRoute).route,
          };
        } else if ((menuInfo as MenuNodeLink).link) {
          currElem[depth + 1][child] = {
            ...baseInfo,
            link: (menuInfo as MenuNodeLink).link,
          };
        }
      }
    });
    return depth + 1;
  };

  //! --------------------------------------------------------------------------

  killKids = (currElem: Array<Layer>, depth: number, id: string): number => {
    let node: InfoNodeChildren = currElem[depth][id] as InfoNodeChildren;

    // setTimeout(() => currElem.splice(depth + 1), 0);
    for (let i = depth + 1; i < currElem.length; i++) {
      Object.entries(currElem[i]).forEach(([ id, child ]) => {
        if (!child.hiding) {
          child.hiding = true;
          if (child.animation) {
            child.animation.keyframes = this.getHidingKeyframes(
              node.pos,
              child.pos
            );
          }
        } else if (child.animation) {
          child.animation.keyframes = this.getHiddenKeyframes();
        }
      });
    }
    return depth + 1;
  };

  //! --------------------------------------------------------------------------

  getKeyframes = (dir: number): Keyframes => {
    const { x, y } = this.dirToDist(dir);
    return keyframes`
    0% {
      transform: rotate(0deg) translate(0px, 0px);
      visibility: hidden;
      opacity: 0;
    }
    70% {
      transform: translate(
        ${x * -3}${this.units},
        ${y * -3}${this.units}
      );
    }
    80% {
      transform: translate(
        ${x * -2.5}${this.units},
        ${y * -2.5}${this.units}
      );
    }
    100% {
      transform: translate(
        ${x * -3}${this.units},
        ${y * -3}${this.units}
      );
      visibility: visible;
      opacity: 1;
    }`;
  };
  // 80% {
  //   transform:  rotate(45deg) translate(
  //     ${x * -3 * 0.8}${this.units},
  //     ${y * -3 * 0.8}${this.units}
  //   );
  // }
  // 90% {
  //   transform:  rotate(-45deg);
  //   transform: translate(
  //     ${x * -3 * 0.9}${this.units},
  //     ${y * -3 * 0.9}${this.units}
  //   );
  // }

  //! --------------------------------------------------------------------------

  getHidingKeyframes = (from: Point, to: Point): Keyframes => {
    return keyframes`
    0% {
      transform: translate(0px, 0px);
      visibility: visible;
      opacity: 1;
    }
    100% {
      transform: translate(
        ${from.x - to.x}${this.units},
        ${from.y - to.y}${this.units});
        visibility: hidden;
        opacity: 0;
      }
    }`;
  };

  //! --------------------------------------------------------------------------

  getHiddenKeyframes = (): Keyframes => {
    return keyframes`
    0% {
      visibility: hidden;
    }
    100% {
      visibility: hidden;
      }
    }`;
  };

  //! --------------------------------------------------------------------------

  //* Returns dist translated
  dirToDist = (dir: number): { x: number; y: number } => {
    dir = Math.PI * dir;
    return {
      x: Math.trunc(Math.cos(dir) * this.scale),
      y: Math.trunc(Math.sin(dir) * -this.scale),
    };
  };

  //! --------------------------------------------------------------------------

  getSpawnRange = (a: number) => {
    // a *= 8;
    // let i: number = Math.floor(((a < 1 ? a + 15 : a) - 1) / 2);
    return {
      from: 1.5 + a,
      to: 2.5 + a,
      // from: Math.floor(i / 2) * 0.5,
      // to: Math.floor((i + 3) / 2) * 0.5,
    };
  };
}

//! ----------------------------------------------------------------------------------------------------------------------------------------------------
//? ----------------------------------------------------------------------------------------------------------------------------------------------------
//! ----------------------------------------------------------------------------------------------------------------------------------------------------
//? ----------------------------------------------------------------------------------------------------------------------------------------------------

//* Types and stuff

interface MyProps {
  menu: Array<{ [key: string]: MenuNode }>;
  scale: number;
  units: string;
}
export interface Point {
  x: number;
  y: number;
}
export interface SpawnRange {
  from: number;
  to: number;
}
export interface Layer {
  [key: string]: InfoNode;
}
//? --------------------------------------------------------------------------

interface MenuNodeBasics {
  title: string;
  background?: string;
}
interface MenuNodeChildren extends MenuNodeBasics {
  children: Array<string>;
  link?: never;
  route?: never;
}
interface MenuNodeLink extends MenuNodeBasics {
  link: string;
  spawnRange?: never;
  route?: never;
}
interface MenuNodeRoute extends MenuNodeBasics {
  route: string;
  spawnRange?: never;
  link?: never;
}
export type MenuNode = MenuNodeChildren | MenuNodeLink | MenuNodeRoute;

//? --------------------------------------------------------------------------

interface InfoNodeBasics {
  pos: Point;
  title: string;
  parent?: boolean;
  background?: string;
  willSpawn?: boolean;
  hiding?: boolean;
  animation?: {
    startPos: Point;
    keyframes: Keyframes;
  };
}
interface InfoNodeChildren extends InfoNodeBasics {
  spawnRange: SpawnRange;
  link?: never;
  route?: never;
}
interface InfoNodeLink extends InfoNodeBasics {
  link: string;
  spawnRange?: never;
  route?: never;
}
interface InfoNodeRoute extends InfoNodeBasics {
  route: string;
  spawnRange?: never;
  link?: never;
}
export type InfoNode = InfoNodeChildren | InfoNodeLink | InfoNodeRoute;

//? --------------------------------------------------------------------------

//! --------------------------------------------------------------------------

export default TreeMenuApi;
