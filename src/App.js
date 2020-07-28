import React from 'react';
import Header from './components/todolist/style/Header';
import LaunchMenu from './launch-menu';
import * as TreeMenu from './components/tree_menu/js/Menu';
// import useWindowDimensions from './components/WindowSize';
import './App.css';

class App extends React.Component {
  constructor (props) {
    super(props);
    if (process.env.NODE_ENV === 'development') {
      this.apiUrl = 'http://127.0.0.1:54321/api/';
    } else {
      this.apiUrl = 'https://abarbieux.com/api/';
    }
    this.state = {
      middle : { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  //* Where the Magic Happens
  render () {
    console.log(this.state);
    return (
      <div className='Tiled-back'>
        <div className='container'>
          <Header />

          {/* <TodoList apiUrl={this.apiUrl} /> */}

          <div className='Menu-container'>
            <TreeMenu
              rootPos={this.state.middle}
              spawnRange={{ from: 0, to: 2 }}
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
    this.setState({ midde: { x: window.innerWidth, y: window.innerHeight } });
  }
}

export default App;
