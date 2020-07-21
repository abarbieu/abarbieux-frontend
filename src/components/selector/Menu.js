import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

class Menu extends Component {
  render () {
    return this.props.items.map((item) => {
      return (
        <MenuItem
          key={item.key}
          title={item.title}
          spawnDir={item.spawnDir}
          onClick={this.props.spawnKin}
          fromPos={item.fromPos}
          fromMenu={item.fromMenu}
          fresh={item.fresh}
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
