import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './style/MenuItem.css';

class MenuItem extends Component {
  core = this.props.core;
  diffx = Math.trunc(Math.cos(this.core.spawnDir) * 100);
  diffy = Math.trunc(Math.sin(this.core.spawnDir) * 100);

  constructor (props) {
    super(props);

    let { startPos, animated, title } = props.core;
    this.state = {
      animated      : animated ? animated : false,
      title         : title,
      endPos        : {
        x : startPos.x - (animated ? this.diffx : 0),
        y : startPos.y + (animated ? this.diffy : 0),
      },
      animationName : '',
    };
  }

  componentDidMount () {
    if (this.core.animated) {
      let styleSheet = document.styleSheets[0];
      let animationName = `animation${Math.ceil(this.core.spawnDir * 10)}`;

      let keyframes = `@keyframes ${animationName} {
        0% {
          transform: translate(0px, 0px);
        }
        100% {
          transform: translate(
            ${this.diffx}px,
            ${-1 * this.diffy}px);
          }
        }`;

      styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

      this.setState({
        animationName : animationName,
      });
    }
  }

  getStyle = () => {
    return {
      animationName : this.state.animationName,

      right         : this.core.startPos.x,
      bottom        : this.core.startPos.y,
    };
  };

  render () {
    return (
      <div>
        <button
          className='Menu-btn'
          style={this.getStyle()}
          onClick={this.props.onClick.bind(this, this.core, this.state.endPos)}
        >
          {this.core.title}
        </button>
      </div>
    );
  }
}

MenuItem.propTypes = {
  core    : PropTypes.object.isRequired,
  onClick : PropTypes.func.isRequired,
};

export default MenuItem;
