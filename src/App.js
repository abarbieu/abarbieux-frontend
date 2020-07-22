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
  apiUrl = 'https://abarbieux.com/api/';

  state = {
    todos     : [],
    menuItems : [],
  };

  getAllTodos = () => {
    axios.get(this.apiUrl + 'todos').then((res) => {
      this.setState({
        todos : res.data,
      });
    });
  };

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
  spawnKin = (parent, parentPos) => {
    if (parent) {
      let spawned = parent.children.map((child, index) => {
        return {
          key      : uuid.v4(),
          title    : child,
          spawnDir : Math.PI - index * Math.PI / 4.0,
          fromPos  : parentPos,
          fromMenu : parent[child],
          fresh    : true,
        };
      });

      this.setState(
        {
          menuItems : [ ...this.state.menuItems, ...spawned ],
        },
        () => {
          console.log('added: %O, result: %O', spawned, this.state);
        }
      );
    }
  };
  componentDidMount () {
    axios.get(this.apiUrl).then((res) => {
      console.log(res.data);
    });
    this.getAllTodos();
    this.setState(
      {
        menuItems : [
          {
            key      : uuid.v4(),
            title    : MenuMap.root.title,
            fromPos  : [ 0, 0 ],
            fromMenu : MenuMap.root,
            fresh    : false,
          },
        ],
      },
      () => {
        // console.log('App mounted, initial state: %O', this.state);
      }
    );
  }

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
            <Menu items={this.state.menuItems} spawnKin={this.spawnKin} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
