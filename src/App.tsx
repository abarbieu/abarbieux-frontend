import React from 'react';
import LaunchMenu from './resources/launch-menu.json';
import Header from './components/todolist/style/Header';
import TreeMenu from './components/tree_menu/TreeMenu';
//! import TodoList from './components/todolist/TodoList';
import './App.css';

type MyState = { middle: { x: number; y: number } };
type MyProps = {};

class App extends React.Component<MyProps, MyState> {
  apiUrl: String;

  constructor (props: MyProps) {
    super(props);
    if (process.env.NODE_ENV === 'development') {
      this.apiUrl = 'http://127.0.0.1:54321/api/';
    } else {
      this.apiUrl = 'https://abarbieux.com/api/';
    }
    this.state = {
      middle: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  render () {
    return (
      <div className='Tiled-back'>
        <div className='container'>
          <Header />
          <div className='Menu-container'>
            <TreeMenu
              rootPos={this.state.middle}
              spawnRange={{ from: 0, to: 1.5 }}
              menu={LaunchMenu}
            />
          </div>
        </div>
      </div>
    );
  }
  componentDidMount () {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions () {
    this.setState({ middle: { x: window.innerWidth, y: window.innerHeight } });
  }
}

export default App;
