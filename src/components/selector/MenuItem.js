import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MenuItem.css';

class MenuItem extends Component {
  constructor (props) {
    super(props);

    let { fromPos, animated, spawnDir } = props;

    const diffx = fromPos[0] + Math.cos(spawnDir) * -200;
    const diffy = fromPos[1] + Math.sin(spawnDir) * 200;

    this.state = {
      animated      : animated ? animated : false,
      title         : props.title,
      endPos        : [
        animated ? diffx : fromPos[0],
        animated ? diffy : fromPos[1],
      ],
      animationName : '',
    };
  }

  componentDidMount () {
    if (this.props.animated) {
      let styleSheet = document.styleSheets[0];
      let animationName = `animation${Math.ceil(this.props.spawnDir)}`;

      let keyframes = `@keyframes ${animationName} {
        0% {
          transform: translate(0px, 0px);
        }
        100% {
          transform: translate(
            ${Math.cos(this.props.spawnDir) * 200}px,
            ${Math.sin(this.props.spawnDir) * -200}px);
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

      right         : this.props.fromPos[0],
      bottom        : this.props.fromPos[1],
    };
  };

  render () {
    return (
      <div>
        <button
          className='Menu-btn'
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
  key      : PropTypes.string.isRequired,
  onClick  : PropTypes.func.isRequired,
  spawnDir : PropTypes.number,
  fromPos  : PropTypes.array,
  fromMenu : PropTypes.object,
  animated : PropTypes.bool,
};

export default MenuItem;
