import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

class Menu extends Component {
  render () {
    var activeQueue = [];
    var menuItems = [];
    if (this.props.root.active) {
      activeQueue.push(this.props.root);
    }
    while (activeQueue.length > 0) {
      item = activeQueue.shift();
      menuItems.push(
        <MenuItem
          key={item.key}
          // id={item.id}
          // title={item.title}
          spawnDir={item.spawnDir}
          onClick={this.props.activateKin}
          startPos={item.startPos}
          animated={item.animated}
          // fromMenu={item.fromMenu}
        />
      );
      item.children.forEach((child) => {
        if (item[child] && item[child].active) {
          activeQueue.push(item[child]);
        }
      });
    }
    return Object.entries(this.props.root).map((entry) => {
      const item = entry[1];
      return (
        <MenuItem
          key={item.key}
          // id={item.id}
          // title={item.title}
          spawnDir={item.spawnDir}
          onClick={this.props.activateKin}
          startPos={item.startPos}
          animated={item.animated}
          // fromMenu={item.fromMenu}
        />
      );
    });
  }
}

Menu.propTypes = {
  root        : PropTypes.object.isRequired,
  activateKin : PropTypes.func.isRequired,
};
export default Menu;
