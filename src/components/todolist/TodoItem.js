import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
  render () {
    const { id, title } = this.props.todo;
    return (
      <div
        style={{
          textDecoration : this.props.todo.completed ? 'line-through' : 'none',
        }}
      >
        <input
          type='checkbox'
          onChange={this.props.markComplete.bind(this, id)}
        />{' '}
        {title}
        <button onClick={this.props.deleteTodo.bind(this, id)}>x</button>
      </div>
    );
  }
}

TodoItem.propTypes = {
  todo : PropTypes.object.isRequired,
};

export default TodoItem;
