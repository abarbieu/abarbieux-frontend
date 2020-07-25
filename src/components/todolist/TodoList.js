import React from 'react';
import { TodoItem } from './TodoItem';
import axios from 'axios';
import PropTypes from 'prop-types';

class TodoList extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      todos : [],
    };
  }

  //* Gets all todos in db
  getAllTodos = () => {
    axios.get(this.apiUrl + 'todos').then((res) => {
      this.setState({
        todos : res.data,
      });
    });
  };

  //* Called when Todo Checkbox clicked
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

  //* Delete todo item
  deleteTodo = (id) => {
    axios.delete(this.apiUrl + `todos/${id}`).then((res) => {
      console.log('deleted data: ' + res.data);
    });
    this.setState({
      todos : [ ...this.state.todos.filter((todo) => todo.id !== id) ],
    });
  };

  //* Add todo item
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

  render () {
    return this.state.todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        markComplete={this.props.markComplete}
        deleteTodo={this.props.deleteTodo}
      />
    ));
  }
}

TodoList.propTypes = {
  todos : PropTypes.array.isRequired,
};

export default TodoList;
