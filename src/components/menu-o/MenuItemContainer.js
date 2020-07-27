import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuItem from './MenuItem';

class MenuItemContainer extends Component {
  core = this.props.core;

  constructor (props) {
    super(props);

    let { startPos, animated, title, spawnDir } = props.core;
    const diffx = Math.trunc(Math.cos(spawnDir) * 100);
    const diffy = Math.trunc(Math.sin(spawnDir) * 100);

    this.setState = {
      animated      : animated || false,
      title         : title,
      startPos      : startPos,
      endPos        : {
        x : startPos.x - (animated ? diffx : 0),
        y : startPos.y + (animated ? diffy : 0),
      },
      diff          : {
        x : diffx,
        y : diffy,
      },
      animationName : `animation${Math.ceil(spawnDir * 10)}`,
    };
  }

  render () {
    return <MenuItem data={this.state} />;
  }
}

MenuItemContainer.propTypes = {
  core    : PropTypes.object.isRequired,
  onClick : PropTypes.func.isRequired,
};

export default MenuItemContainer;
