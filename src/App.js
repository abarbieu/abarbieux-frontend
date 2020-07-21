import React from 'react';
// import MenuItem from './components/selector/MenuItem';
import MenuHeader from './components/selector/MenuHeader';
import MenuMap from './components/selector/resources/menu';
import Menu from './components/selector/Menu';
import uuid from 'uuid';
import './App.css';

class App extends React.Component {
  state = {
    menuItems : [],
    result    : {},
  };

  spawnKin = (parent, parentPos) => {
    // console.log('spawnkin from: %O at pos: %O', parent, parentPos);
    const dirMap = {
      0 : 'goL',
      1 : 'goM',
      2 : 'goU',
      3 : 'goR',
    };
    if (parent) {
      let spawned = parent.children.map((child, index) => {
        console.log('%s, i %d -> ' + dirMap[index], child, index);
        return {
          key      : uuid.v4(),
          title    : child,
          spawnDir : dirMap[index],
          fromPos  : parentPos,
          fromMenu : parent[child],
          fresh    : true,
        };
      });

      this.setState(
        {
          menuItems : [ ...this.state.menuItems, ...spawned ],
        },
        () => {
          console.log('added: %O, result: %O', spawned, this.state);
        }
      );
    }
  };

  componentDidMount () {
    this.setState(
      {
        menuItems : [
          {
            key      : uuid.v4(),
            title    : MenuMap.root.title,
            spawnDir : 'goM',
            fromPos  : [ 0, 0 ],
            fromMenu : MenuMap.root,
            fresh    : false,
          },
        ],
        // <MenuItem fromMenu={MenuMap.root} onClick={this.spawnKin} /> ],
      },
      () => {
        // console.log('App mounted, initial state: %O', this.state);
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
