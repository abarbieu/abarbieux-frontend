import React from 'react';

function Header () {
  return (
    <header style={headerStyle}>
      <h1>Notes</h1>
    </header>
  );
}

const headerStyle = {
  background: '#333',
  color: 'white',
  textAlight: 'center',
  padding: '10px',
};

export default Header;
