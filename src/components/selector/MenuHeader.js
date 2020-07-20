import React from 'react';

function MenuHeader () {
  return (
    <header style={headerStyle}>
      <h1>Selector: </h1>
    </header>
  );
}

const headerStyle = {
  background : '#333',
  color      : 'white',
  textAlign  : 'center',
  padding    : '10px'
};

export default MenuHeader;
