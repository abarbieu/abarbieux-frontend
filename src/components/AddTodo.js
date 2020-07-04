import React, { Component } from 'react';

export default class AddTodo extends Component {
  state = {
    title : ''
  };

  onType = (e) => this.setState({ [e.target.name]: e.target.value });
  onSubmit = (e) => {
    e.preventDefault();
    this.props.addTodo(this.state.title);
    this.setState({ title: '' });
  };
  render () {
    return (
      <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
        <input
          type="text"
          name="title"
          style={{ flex: '10' }}
          placeholder="Add Todo..."
          value={this.state.title}
          onChange={this.onType}
        />
        <input
          type="submit"
          value="Submit"
          className="btn"
          style={{ flex: '1', padding: '5px' }}
        />
      </form>
    );
  }
}
