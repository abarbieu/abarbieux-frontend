import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MenuItem.css';

class MenuItem extends Component {
  core = this.props.core;
  constructor (props) {
    super(props);

    let { startPos, animated, spawnDir, title } = props.core;

    const diffx = startPos[0] + Math.cos(spawnDir) * -100;
    const diffy = startPos[1] + Math.sin(spawnDir) * 100;

    this.state = {
      animated      : animated ? animated : false,
      title         : title,
      endPos        : [
        animated ? diffx : startPos[0],
        animated ? diffy : startPos[1],
      ],
      animationName : '',
    };
  }

  componentDidMount () {
    if (this.core.animated) {
      let styleSheet = document.styleSheets[0];
      let animationName = `animation${Math.ceil(this.core.spawnDir)}`;

      let keyframes = `@keyframes ${animationName} {
        0% {
          transform: translate(0px, 0px);
        }
        100% {
          transform: translate(
            ${Math.cos(this.core.spawnDir) * 100}px,
            ${Math.sin(this.core.spawnDir) * -100}px);
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

      right         : this.core.startPos[0],
      bottom        : this.core.startPos[1],
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
