import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MenuItem.css';

class MenuItem extends Component {
  state = { animated: this.props.animated ? this.props.animated : false };

  spawnKin = () => {
    // this.props.addItem.bind(this, this, 'new item');
    this.setState({ animated: !this.state.animated });
  };
  render () {
    console.log(this.state);
    if (this.state.animated) {
      return (
        <div>
          <button className="Menu-btn Spawned" onClick={this.spawnKin}>
            {this.props.title}
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button className="Menu-btn" onClick={this.spawnKin}>
            {this.props.title}
          </button>
        </div>
      );
    }
  }
}

MenuItem.propTypes = {
  title    : PropTypes.string.isRequired,
  animated : PropTypes.bool,
  addItem  : PropTypes.func
};

export default MenuItem;
