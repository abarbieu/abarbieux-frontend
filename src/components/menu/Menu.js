import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

class Menu extends Component {
  render () {
    var activeQueue = [];
    var menuItems = [];

    if (this.props.menuMap.root.active) {
      activeQueue.push(this.props.menuMap.root);
    }
    while (activeQueue.length > 0) {
      let item = activeQueue.shift();

      menuItems.push(
        <MenuItem key={item.key} core={item} onClick={this.props.activateKin} />
      );
      if (item && item.children) {
        item.children.manifest.forEach((child) => {
          if (item.children[child] && item.children[child].active) {
            activeQueue.push(item.children[child]);
          } else if (!item.children[child] || !item.children[child].title) {
            item.children[child] = {
              title  : child,
              id     : child,
              active : false,
            };
          }
        });
      }
    }

    return menuItems;
  }
}

Menu.propTypes = {
  menuMap     : PropTypes.object.isRequired,
  activateKin : PropTypes.func.isRequired,
};

export default Menu;
