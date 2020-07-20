import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Menu extends Component {
  render () {
    return this.props.items.map((item) => {
      <MenuItem title={item.title} />;
    });
  }
}

Menu.propTypes = {
  items : PropTypes.array.isRequired
};
export default Menu;
