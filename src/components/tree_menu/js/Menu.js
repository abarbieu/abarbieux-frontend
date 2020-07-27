"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
class Menu extends react_1.Component {
    // static propTypes = {
    //   rootPos: PropTypes.object.isRequired,
    //   rootDir: PropTypes.number.isRequired,
    //   menu: PropTypes.object.isRequired,
    // };
    constructor(props) {
        super(props);
        // render () {
        // return <div />;
        // }
        this.nodeClicked = (depth, id) => {
            this.setState((prevState) => {
                //* Deactivates any siblings
                prevState.active[depth] = [id];
                //* Gets node info from menu object
                let node = this.props.menu[depth][id];
                if (node.children) {
                    //* Adds node's children to active array
                    prevState.active[depth + 1] = node.children;
                }
                else if (node.link) {
                    this.followLink(node.link);
                }
                else if (node.route) {
                    this.followRoute(node.route);
                }
                else {
                    //! Throw error
                }
                return prevState;
            });
        };
        this.followLink = (link) => {
            console.log('Following link: %s', link);
        };
        this.followRoute = (route) => {
            console.log('Following route: %s', route);
        };
        this.state = {
            active: [['root']],
        };
    }
}
exports.default = Menu;
//# sourceMappingURL=Menu.js.map