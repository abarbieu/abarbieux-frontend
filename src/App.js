import React from 'react';
import TodoList from './components/todolist/TodoList';
import Header from './components/todolist/style/Header';
import AddTodo from './components/todolist/AddTodo';
import MenuMap from './components/menu/resources/menu';
import Menu from './components/menu/Menu';
import uuid from 'uuid';
import './App.css';

import './App.css';

class App extends React.Component {
  // Move to env variable?
  apiUrl = 'https://abarbieux.com/api/';

  state = {
    todos   : [],
    menuMap : {
      ...MenuMap,
      root : {
        ...MenuMap.root,
        key      : uuid.v4(),
        menuPath : 'root',
        active   : true,
        startPos : { x: 100, y: 50 },
        animated : false,
      },
    },
  };

  //* Menu ============================================================== Menu

  //* Gets into nested objects via path
  followPath = (root, path) => {
    try {
      return path
        .split('.')
        .reduce(
          (accum, curr) => (accum[curr] = accum[curr] ? accum[curr] : {}),
          root
        );
    } catch (err) {
      return undefined;
    }
  };

  updateMenu = (path, attr, val) => {
    if (this.followPath(this.state.menuMap, path)) {
      this.setState((prevState) => {
        this.followPath(this.state.menuMap, path)[attr] = val;
        return {
          menuMap : prevState.menuMap,
        };
      });
    }
  };

  //* Deactivates all kin downstream of path
  deactivateChildren = (path) => {
    if (this.followPath(this.state.menuMap, path).children) {
      let manifest = this.followPath(this.state.menuMap, path).children
        .manifest;
      manifest.forEach((child) => {
        this.updateMenu(path + '.children.' + child, 'active', false);
        this.deactivateChildren(path + '.children.' + child);
      });
    }
  };

  //* Deactivates all children at path except favoriteKid
  deactivateSiblings = (path) => {
    let chosen = path.slice(path.search(/\.[^.]*$/) + 1);
    path = path.replace(/\.[^.]*$/, '');
    let manifest = this.followPath(this.state.menuMap, path).manifest;
    manifest.forEach((child) => {
      if (child !== chosen) {
        this.updateMenu(path + '.' + child, 'active', false);
      }
    });
  };

  //* Called when a MenuItem is clicked
  //* DONE: remove siblings
  // TODO: remove strangers
  activateKin = (parent, parentPos) => {
    this.deactivateChildren(parent.menuPath);
    if (parent.id !== 'root') {
      this.deactivateSiblings(parent.menuPath);
    }
    if (parent && parent.children) {
      let childList = parent.children.manifest;

      this.followPath(this.state.menuMap, parent.menuPath)[
        'endPos'
      ] = parentPos;

      childList.forEach((child, index) => {
        this.setState((prevState) => {
          this.followPath(prevState.menuMap, parent.menuPath).children[
            child
          ] = {
            ...parent.children[child],
            key      : uuid.v4(),
            menuPath : parent.menuPath + '.children.' + child,
            spawnDir :
              3 * Math.PI / 4 +
              Math.pow(-1, index + 1) * Math.ceil(index / 2) * Math.PI / 4.0,
            startPos : parentPos,
            active   : true,
            animated : true,
          };
          return {
            menuMap : prevState.menuMap,
          };
        });
      });
    }
  };

  //* App ================================================================ App

  //* Run when app is mounted
  // TODO: test api
  componentDidMount () {
    //* TodoList
    // axios.get(this.apiUrl).then((res) => {
    //   console.log(res.data);
    // });
    // this.getAllTodos();
    //* Menu
  }

  //* Where the Magic Happens
  render () {
    return (
      <div className='Tiled-back'>
        <div className='container'>
          <Header />
          <AddTodo addTodo={this.addTodo} />
          <TodoList
            todos={this.state.todos}
            markComplete={this.markComplete}
            deleteTodo={this.deleteTodo}
          />
          <div className='Menu-container'>
            <Menu
              menuMap={this.state.menuMap}
              activateKin={this.activateKin}
              setPos={this.setPos}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
