import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

class Menu extends Component {
  render () {
    return Object.entries(this.props.items).map(([ key, item ]) => {
      return (
        <MenuItem
          key={item.key}
          id={key}
          title={item.title}
          spawnDir={item.spawnDir}
          onClick={this.props.spawnKin}
          fromPos={item.fromPos}
          fromMenu={item.fromMenu}
          animated={item.animated}
        />
      );
    });
  }
}

Menu.propTypes = {
  items    : PropTypes.object.isRequired,
  spawnKin : PropTypes.func.isRequired,
};
export default Menu;
