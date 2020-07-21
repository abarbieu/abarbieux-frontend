import React from 'react';
// import MenuItem from './components/selector/MenuItem';
import MenuHeader from './components/selector/MenuHeader';
import MenuMap from './components/selector/resources/menu';
import Menu from './components/selector/Menu';
import './App.css';

class App extends React.Component {
  state = {
    menuItems : [],
    result    : {},
  };

  spawnKin = (parent, parentPos) => {
    let spawned = parent.children.map((child) => {
      if (parent[child]) {
        return {
          fromMenu : parent[child],
          fresh    : true,
          fromPos  : parentPos,
        };
        // <MenuItem fromMenu={parent[child]} fresh={true} fromPos={parentPos} />
      } else {
        console.log('REACHED END');
        return null;
      }
    });
    this.setState(
      {
        menuItems : [ ...this.state.menuItems, ...spawned ],
      },
      () => {
        console.log('State: %O', this.state);
      }
    );
  };

  componentDidMount () {
    this.setState(
      {
        menuItems : [
          {
            fromMenu : MenuMap.root,
            fresh    : false,
            fromPos  : [ 0, 0 ],
          },
        ],
        // <MenuItem fromMenu={MenuMap.root} onClick={this.spawnKin} /> ],
      },
      () => {
        console.log('App mounted, initial state: %O', this.state);
      }
    );
  }

  render () {
    return (
      <div className='Tiled-back'>
        <div className='container'>
          <MenuHeader />
          <div className='Menu-container'>
            {/* {console.log(this.state.menuItems)} */}
            <Menu items={this.state.menuItems} spawnKin={this.spawnKin} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
