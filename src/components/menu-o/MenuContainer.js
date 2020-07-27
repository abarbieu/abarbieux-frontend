import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from './Menu';
import uuid from 'uuid';

class MenuContainer extends Component {
  constructor (props) {
    super(props);

    this.state = {
      menuMap       : {
        ...props.MenuMap,
        root : {
          ...props.MenuMap.root,
          key      : uuid.v4(),
          menuPath : 'root',
          active   : true,
          startPos : props.RootPos || { x: 100, y: 50 },
          animated : false,
        },
      },
      itemsToRender : [],
    };
  }

  render () {
    this.findActive(this.state.menuMap);
    return (
      <Menu
        itemsToRender={this.state.itemsToRender}
        onClick={this.activateKin}
      />
    );
  }

  //* Traverses MenuMap and adds any active items to itemsToRender
  findActive = (fromMap) => {
    let activeQueue = [];
    let activatedItems = [];
    // let item = {};

    if (fromMap.root.active) {
      activeQueue.push(fromMap.root);
    }

    while (activeQueue.length > 0) {
      let item = activeQueue.shift();
      let kids = item.children;
      activatedItems.push(item);

      if (kids) {
        kids.manifest.forEach((child) => {
          if (kids[child] && kids[child].active) {
            activeQueue.push(kids[child]);
          } else if (!kids[child] || !kids[child].title) {
            //* Creates generic child if listed but not specified in fromMap
            kids[child] = {
              title  : child,
              id     : child,
              active : false,
            };
          }
        });
      }
    }
    this.setState({ itemsToRender: activatedItems });
  };

  //* Gets into nested objects via path
  followPath = (root, path) => {
    try {
      return path
        .split('.')
        .reduce(
          (accum, curr) => (accum[curr] = accum[curr] ? accum[curr] : {}),
          root
        );
    } catch (err) {
      return undefined;
    }
  };

  //* Follows path
  updateMenu = (path, attr, val) => {
    if (this.followPath(this.state.menuMap, path)) {
      this.setState((prevState) => {
        this.followPath(this.state.menuMap, path)[attr] = val;
        return {
          menuMap : prevState.menuMap,
        };
      });
    }
  };

  //* Deactivates all kin downstream of path
  deactivateChildren = (path) => {
    if (this.followPath(this.state.menuMap, path).children) {
      let manifest = this.followPath(this.state.menuMap, path).children
        .manifest;
      manifest.forEach((child) => {
        this.updateMenu(path + '.children.' + child, 'active', false);
        this.deactivateChildren(path + '.children.' + child);
      });
    }
  };

  //* Deactivates all children at path except favoriteKid
  deactivateSiblings = (path) => {
    let chosen = path.slice(path.search(/\.[^.]*$/) + 1);
    path = path.replace(/\.[^.]*$/, '');
    let manifest = this.followPath(this.state.menuMap, path).manifest;
    manifest.forEach((child) => {
      if (child !== chosen) {
        this.updateMenu(path + '.' + child, 'active', false);
      }
    });
  };

  //* Called when a MenuItem is clicked
  //* DONE: remove siblings
  activateKin = (parent, parentPos) => {
    this.deactivateChildren(parent.menuPath);
    if (parent.id !== 'root') {
      this.deactivateSiblings(parent.menuPath);
    }
    if (parent && parent.children) {
      let childList = parent.children.manifest;

      this.followPath(this.state.menuMap, parent.menuPath)[
        'endPos'
      ] = parentPos;

      childList.forEach((child, index) => {
        this.setState((prevState) => {
          this.followPath(prevState.menuMap, parent.menuPath).children[
            child
          ] = {
            ...parent.children[child],
            key      : uuid.v4(),
            menuPath : parent.menuPath + '.children.' + child,
            spawnDir :
              3 * Math.PI / 4 +
              Math.pow(-1, index + 1) * Math.ceil(index / 2) * Math.PI / 4.0,
            startPos : parentPos,
            active   : true,
            animated : true,
          };
          return {
            menuMap : prevState.menuMap,
          };
        });
      });
    }
  };
}

MenuContainer.propTypes = {
  MenuMap : PropTypes.object.isRequired,
  RootPos : PropTypes.object,
};

export default MenuContainer;
