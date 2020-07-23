import React from 'react';
import axios from 'axios';
import Todos from './components/Todos';
import Header from './components/style/Header';
import AddTodo from './components/AddTodo';
import MenuMap from './components/selector/resources/menu';
import Menu from './components/selector/Menu';
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
        startPos : [ 0, 0 ],
        animated : false,
      },
    },
  };
  //* Todo ============================================================== Todo

  // Gets all todos in db
  getAllTodos = () => {
    axios.get(this.apiUrl + 'todos').then((res) => {
      this.setState({
        todos : res.data,
      });
    });
  };

  // Called when Todo Checkbox clicked
  markComplete = (id) => {
    axios.put(this.apiUrl + `todos/${id}`).then((res) => {
      console.log('toggled data: ' + res.data);
    });
    this.setState({
      todos : this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  // Delete todo item
  deleteTodo = (id) => {
    axios.delete(this.apiUrl + `todos/${id}`).then((res) => {
      console.log('deleted data: ' + res.data);
    });
    this.setState({
      todos : [ ...this.state.todos.filter((todo) => todo.id !== id) ],
    });
  };

  // Add todo item
  addTodo = (title) => {
    let newTodo = {};
    axios
      .post(this.apiUrl + 'todos/', {
        title    : title,
        complete : false,
      })
      .then((res) => {
        newTodo = res.data;
        console.log(newTodo);

        this.setState({ todos: [ ...this.state.todos, newTodo ] });
      });
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
            spawnDir : Math.PI - index * Math.PI / 4.0,
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
    //? axios.get(this.apiUrl).then((res) => {
    //?   console.log(res.data);
    //? });
    //? this.getAllTodos();
    //* Menu
  }

  //* Where the Magic Happens
  render () {
    return (
      <div className='Tiled-back'>
        <div className='container'>
          <Header />
          <AddTodo addTodo={this.addTodo} />
          <Todos
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
