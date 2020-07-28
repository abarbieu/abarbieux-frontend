import React from 'react';
import TodoList from './components/todolist/TodoList';
import Header from './components/todolist/style/Header';
import LaunchMenu from './launch-menu';
import TreeMenu from './components/tree_menu/js/Menu';
import './App.css';

class App extends React.Component {
  constructor (props) {
    super(props);
    if (process.env.NODE_ENV === 'development') {
      this.apiUrl = 'http://127.0.0.1:54321/api/';
    } else {
      this.apiUrl = 'https://abarbieux.com/api/';
    }
  }

  //* Where the Magic Happens
  render () {
    return (
      <div className='Tiled-back'>
        <div className='container'>
          <Header />

          <TodoList apiUrl={this.apiUrl} />
          <div className='Menu-container'>
            <TreeMenu
              rootPos={{ x: 400, y: 400 }}
              spawnRange={{ from: 0, to: 2 }}
              menu={LaunchMenu}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
