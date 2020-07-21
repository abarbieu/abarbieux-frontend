import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { css, keyframes } from 'styled-components';
import './MenuItem.css';

class MenuItem extends Component {
  constructor (props) {
    super(props);

    let { fromPos, fresh, spawnDir } = props;
    let dirs = [ 1, 1 ];
    if (spawnDir === 'goL') {
      dirs = [ 1, 0 ];
    } else if (spawnDir === 'goU') {
      dirs = [ 0, 1 ];
    }

    this.state = {
      fresh     : fresh ? fresh : false,
      title     : props.title,
      endPos    : [
        fromPos[0] + fresh ? dirs[0] * 100 : 0,
        fromPos[1] + fresh ? dirs[1] * 100 : 0,
      ],
      className : fresh ? 'Menu-btn ' + spawnDir : 'Menu-btn',
    };
  }

  getStyle = () => {
    return {
      right  : this.props.fromPos[0],
      bottom : this.props.fromPos[1],
    };
  };

  render () {
    return (
      <div>
        <button
          className={this.state.className}
          style={this.getStyle()}
          onClick={this.props.onClick.bind(
            this,
            this.props.fromMenu,
            this.state.endPos
          )}
        >
          {this.state.title}
        </button>
      </div>
    );
  }
}

MenuItem.propTypes = {
  title    : PropTypes.string.isRequired,
  spawnDir : PropTypes.string.isRequired,
  onClick  : PropTypes.func.isRequired,
  fromPos  : PropTypes.array,
  fromMenu : PropTypes.object,
  fresh    : PropTypes.bool,
};

export default MenuItem;
