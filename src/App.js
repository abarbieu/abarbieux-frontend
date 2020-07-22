import React from 'react';
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
    if (parent) {
      let spawned = parent.children.map((child, index) => {
        return {
          key      : uuid.v4(),
          title    : child,
          spawnDir : Math.PI - index * Math.PI / 4.0,
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
            fromPos  : [ 0, 0 ],
            fromMenu : MenuMap.root,
            fresh    : false,
          },
        ],
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
          <div className='Menu-container'>
            <Menu items={this.state.menuItems} spawnKin={this.spawnKin} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
