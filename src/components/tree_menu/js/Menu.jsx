"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const uuid = require("uuid");
require("./MenuNode.css");
class Menu extends React.Component {
    constructor(props) {
        super(props);
        //! --------------------------------------------------------------------------
        this.layerToBtns = (layer, depth) => {
            const jsxArr = [];
            for (let [id, node] of Object.entries(layer)) {
                jsxArr.push(<button key={uuid.v4()} className='Menu-btn' style={node.style} onClick={this.nodeClicked.bind(this, depth, id)}>
          
          {this.props.menu[depth][id].title}
        </button>);
            }
            return jsxArr;
        };
        //! --------------------------------------------------------------------------
        this.nodeClicked = (depth, id) => {
            //* Queries provided menu json
            let menuNode = this.props.menu[depth][id];
            let node = this.state.active[depth][id];
            if (menuNode.children) {
                this.setState((prevState) => {
                    //* Deactivates everything else
                    prevState.active.splice(depth);
                    //* Deactivated Siblings
                    prevState.active[depth] = { [id]: node };
                    return prevState;
                });
                this.addChildren(menuNode.children, node, depth);
            }
            else if (menuNode.link) {
                this.followLink(menuNode.link);
            }
            else if (menuNode.route) {
                this.followRoute(menuNode.route);
            }
            else {
                //! Throw error
            }
        };
        //! --------------------------------------------------------------------------
        this.addChildren = (children, node, depth) => {
            let to = node.spawnRange.to;
            let from = node.spawnRange.from;
            this.setState((prevState) => {
                //* Resets layer just in case
                prevState.active[depth + 1] = {};
                //* Adds node's children to active array
                children.forEach((child, i) => {
                    //* Generates evenly distributed dirs for kids
                    const dir = from + i / children.length * ((to < from ? to + 2 : to) - from);
                    //* Diff is distance moved
                    const diff = this.addAnimation(dir, 100);
                    //* Initing each child in next later
                    prevState.active[depth + 1][child] = {
                        pos: { x: node.pos.x + diff.x, y: node.pos.y + diff.y },
                        spawnRange: this.getSpawnRange(dir),
                        style: {
                            animationName: `animation${Math.ceil(dir * 10)}`,
                            left: node.pos.x,
                            top: node.pos.y,
                        },
                    };
                });
                return prevState;
            });
        };
        //! --------------------------------------------------------------------------
        //* Returns dist translated
        this.addAnimation = (dir, dist) => {
            let styleSheet = document.styleSheets[0];
            let animationName = `animation${Math.ceil(dir * 10)}`;
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
        //! --------------------------------------------------------------------------
        this.getSpawnRange = (a) => {
            a *= 8;
            let i = Math.floor(((a < 1 ? a + 15 : a) - 1) / 2);
            return {
                from: (Math.floor(i / 2) * 0.5) % 2,
                to: (Math.floor((i + 3) / 2) * 0.5) % 2,
            };
        };
        //! --------------------------------------------------------------------------
        this.followLink = (link) => {
            console.log('Following link: %s', link);
        };
        //! --------------------------------------------------------------------------
        this.followRoute = (route) => {
            console.log('Following route: %s', route);
        };
        this.state = {
            active: [
                {
                    root: {
                        pos: this.props.rootPos,
                        spawnRange: this.props.spawnRange,
                        style: { left: this.props.rootPos.x, top: this.props.rootPos.y },
                    },
                },
            ],
        };
    }
    //! --------------------------------------------------------------------------
    render() {
        let renderedItems = [];
        for (let i = 0; i < this.state.active.length; i++) {
            renderedItems = [
                ...renderedItems,
                ...this.layerToBtns(this.state.active[i], i),
            ];
        }
        return renderedItems;
    }
}
exports.default = Menu;
//# sourceMappingURL=Menu.jsx.map