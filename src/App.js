import React from 'react';
import MenuItem from './components/selector/MenuItem';
import MenuHeader from './components/selector/MenuHeader';
import './App.css';

class App extends React.Component {
  state = {
    btns : []
  };

  addBtn = (parent, title) => {
    this.setState({
      btns : [ ...this.state.btns, 'title' ]
    });
  };

  render () {
    return (
      <div className="Tiled-back">
        <div className="container">
          <MenuHeader />
          <div className="Menu-container">
            <MenuItem title="+" addItem={this.addBtn} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
