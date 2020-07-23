import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

class Menu extends Component {
  render () {
    var activeQueue = [];
    var menuItems = [];
    console.log('rendering menu: ', this.props.menuMap);
    if (this.props.menuMap.root.active) {
      activeQueue.push(this.props.menuMap.root);
    }
    while (activeQueue.length > 0) {
      let item = activeQueue.shift();

      menuItems.push(
        <MenuItem key={item.key} core={item} onClick={this.props.activateKin} />
      );

      item.children.forEach((child) => {
        if (item[child] && item[child].active) {
          activeQueue.push(item[child]);
        } else if (!item[child]) {
          item[child] = {
            title  : child,
            id     : child,
            active : false,
          };
        }
      });
    }

    return menuItems;
  }
}

Menu.propTypes = {
  menuMap     : PropTypes.object.isRequired,
  activateKin : PropTypes.func.isRequired,
};
export default Menu;
