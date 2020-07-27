import React from 'react';
import PropTypes from 'prop-types';
import './style/MenuItem.css';

function MenuItem (props) {
  const data = props.data;
  const style = {
    right  : data.startPos.x,
    bottom : data.startPos.y,
  };

  if (data.animated) {
    let styleSheet = document.styleSheets[0];
    let animationName = data.animationName;

    let keyframes = `@keyframes ${animationName} {
        0% {
          transform: translate(0px, 0px);
        }
        100% {
          transform: translate(
            ${data.diff.x}px,
            ${-1 * data.diff.y}px);
          }
        }`;

    styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
  }

  return (
    <div>
      <button
        className='Menu-btn'
        style={style}
        onClick={data.onClick.bind(data.core, data.endPos)}
      >
        {this.data.title}
      </button>
    </div>
  );
}

MenuItem.propTypes = {
  data : PropTypes.object.isRequired,
};

export default MenuItem;
