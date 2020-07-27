import { Component } from 'react';

type MyProps = { rootPos: object; rootDir: number; menu: object };
type MyState = { active: Array<Array<String>> };

export default class Menu extends Component<MyProps, MyState> {
  // static propTypes = {
  //   rootPos: PropTypes.object.isRequired,
  //   rootDir: PropTypes.number.isRequired,
  //   menu: PropTypes.object.isRequired,
  // };

  constructor (props: MyProps) {
    super(props);
    this.state = {
      active: [ [ 'root' ] ],
    };
  }

  // render () {
  // return <div />;
  // }

  nodeClicked = (depth: number, id: string) => {
    this.setState((prevState) => {
      //* Deactivates any siblings
      prevState.active[depth] = [ id ];

      //* Gets node info from menu object
      let node = this.props.menu[depth][id];

      if (node.children) {
        //* Adds node's children to active array
        prevState.active[depth + 1] = node.children;
      } else if (node.link) {
        this.followLink(node.link);
      } else if (node.route) {
        this.followRoute(node.route);
      } else {
        //! Throw error
      }
      return prevState;
    });
  };

  followLink = (link: string) => {
    console.log('Following link: %s', link);
  };
  followRoute = (route: string) => {
    console.log('Following route: %s', route);
  };
}
