import React from 'react';
import PropTypes from 'prop-types';
import MenuItemContainer from './MenuItemContainer';

function Menu (props) {
  return props.itemsToRender.map((item) => (
    <MenuItemContainer key={item.key} core={item} onClick={props.onClick} />
  ));
}

Menu.propTypes = {
  itemsToRender : PropTypes.array.isRequired,
  onClick       : PropTypes.func.isRequired,
};

export default Menu;
