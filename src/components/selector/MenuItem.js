import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MenuItem.css';

class MenuItem extends Component {
  constructor (props) {
    super(props);

    let { fromPos, fresh, spawnDir } = props;

    const diffx = fromPos[0] + Math.cos(spawnDir) * -100;
    const diffy = fromPos[1] + Math.sin(spawnDir) * 100;

    this.state = {
      fresh         : fresh ? fresh : false,
      title         : props.title,
      endPos        : [
        fresh ? diffx : fromPos[0],
        fresh ? diffy : fromPos[1],
      ],
      animationName : '',
    };
  }

  componentDidMount () {
    if (this.props.fresh) {
      let styleSheet = document.styleSheets[0];
      let animationName = `animation${Math.ceil(this.props.spawnDir)}`;

      let keyframes = `@keyframes ${animationName} {
        0% {
          transform: translate(0px, 0px);
        }
        100% {
          transform: translate(
            ${Math.cos(this.props.spawnDir) * 100}px,
            ${Math.sin(this.props.spawnDir) * -100}px);
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
  onClick  : PropTypes.func.isRequired,
  spawnDir : PropTypes.number,
  fromPos  : PropTypes.array,
  fromMenu : PropTypes.object,
  fresh    : PropTypes.bool,
};

export default MenuItem;
