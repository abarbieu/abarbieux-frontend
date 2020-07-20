import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MenuItem.css';
import menu from './resources/menu';

class MenuItem extends Component {
  constructor (props) {
    super(props);
    const { parent, animated, name, title } = props;
    this.state = {
      parent   : parent ? parent : 'root',
      animated : animated ? animated : false,
      name,
      title,
      inited   : true,
    };
  }
  componentDidMount () {
    console.log('state inited: %O', this.state);
    console.log('menu: %O', menu);
  }

  spawnKin = () => {
    this.setState({ animated: !this.state.animated });
  };

  render () {
    if (this.state.animated) {
      return (
        <div>
          <button className='Menu-btn Spawned' onClick={this.spawnKin}>
            {this.props.title}
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <button className='Menu-btn' onClick={this.spawnKin}>
            {this.props.title}
          </button>
        </div>
      );
    }
  }
}

MenuItem.propTypes = {
  title    : PropTypes.string.isRequired,
  name     : PropTypes.string.isRequired,
  parent   : PropTypes.string,
  animated : PropTypes.bool,
  addItem  : PropTypes.func,
};

export default MenuItem;
