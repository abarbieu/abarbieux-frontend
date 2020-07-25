import React from 'react';
import TodoList from './components/todolist/TodoList';
import Header from './components/todolist/style/Header';
import MenuMap from './components/menu/resources/menu';
import Menu from './components/menu/Menu';
import './App.css';

import './App.css';

class App extends React.Component {
  //! Move to env variable?
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
            <Menu RootPos={{ x: 0, y: 0 }} MenuMap={MenuMap} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
