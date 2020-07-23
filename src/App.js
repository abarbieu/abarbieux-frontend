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

  // Used to update MenuItem positions in state
  // setPos = (key) => {
  //   for (let i = this.state.menuMap.length; i >= 0; i--) {
  //     if (this.state.menuMap.key.equals(key)) {
  //       this.setState(menuMap);
  //     }
  //   }
  // };

  followPath = (root, path) => {
    try {
      return path.split('.').reduce((accum, curr) => accum[curr], root);
    } catch (err) {
      return undefined;
    }
  };

  // Used to filter MenuItem siblings
  comparePos = (a, b) => {
    return a[0] === b[0] && a[1] === b[1];
  };

  // Called when a MenuItem is clicked
  activateKin = (parent, parentPos) => {
    if (parent && parent.children) {
      this.followPath(MenuMap, parent.path)['endpos'] = parentPos;

      parent.children.forEach((child, index) => {
        this.setState((prevState) => {
          this.followPath(prevState.menuMap, parent.menuPath)[child] = {
            ...parent[child],
            key      : uuid.v4(),
            menuPath : parent.menuPath + '.' + child,
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

  // Run when app is mounted
  componentDidMount () {
    //* TodoList
    // axios.get(this.apiUrl).then((res) => {
    //   console.log(res.data);
    // });
    // this.getAllTodos();

    //* Menu
    console.log('mounting', this.state);

    // this.setState(
    //   (prevState) => {
    //     prevState.menuMap.root = {
    //       ...prevState.menuMap.root,
    //       path     : 'root',
    //       active   : true,
    //       key      : uuid.v4(),
    //       startPos : [ 0, 0 ],
    //       animated : false,
    //     };
    //     return {
    //       menuMap : prevState.menuMap,
    //     };
    //   },
    //   () => {
    //     console.log('mounted', this.state.menuMap);
    //   }
    // );
  }

  // Where the Magic Happens
  render () {
    console.log('state at render: ', this.state);
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
