import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

class Menu extends Component {
  componentDidMount () {
    console.log(this.props);
  }
  render () {
    console.log(this.props);
    return this.props.items.map((item) => {
      return (
        <MenuItem
          fresh={item.fresh}
          fromMenu={item.fromMenu}
          onClick={this.props.spawnKin}
        />
      );
    });
  }
}

Menu.propTypes = {
  items    : PropTypes.array.isRequired,
  spawnKin : PropTypes.func.isRequired,
};
export default Menu;
