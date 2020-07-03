import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class TodoItem extends Component {
	getStyle = () => {
		return {
			background     : '#ccc',
			textAlign      : 'left',
			padding        : '10px',
			border         : '1px #c2c2c2 dotted',
			color          : 'rgb(125,102,142)',
			textDecoration : this.props.todo.completed ? 'line-through' : 'none'
		};
	};

	render () {
		const { id, title } = this.props.todo;
		return (
			<div style={this.getStyle()}>
				<p>
					<input
						type="checkbox"
						onChange={this.props.markComplete.bind(this, id)}
					/>{' '}
					{title}
					<button
						style={btnStyle}
						onClick={this.props.deleteTodo.bind(this, id)}
					>
						x
					</button>
				</p>
			</div>
		);
	}
}

TodoItem.propTypes = {
	todo : PropTypes.object.isRequired
};

const btnStyle = {
	background   : '#ff0000',
	borderRadius : '50%',
	padding      : '5px 10px',
	color        : '#fff',
	float        : 'right',
	cursor       : 'pointer'
};

export default TodoItem;
