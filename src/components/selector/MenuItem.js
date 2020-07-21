import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './MenuItem.css';

class MenuItem extends Component {
  constructor (props) {
    super(props);
    const { title } = props.fromMenu;
    let { fromPos, fresh } = props;
    fromPos = fromPos ? fromPos : [ 0, 0 ];
    this.state = {
      fresh     : fresh ? fresh : false,
      title,
      endPos    : [
        fromPos[0] + fresh ? 100 : 0,
        fromPos[1] + fresh ? 100 : 0,
      ],
      style     : {
        right  : fromPos[0],
        bottom : fromPos[1],
      },
      className : fresh ? 'Menu-btn Spawned' : 'Menu-btn',
    };
  }

  componentDidMount () {
    console.log('state inited: %O', this.state);
  }

  render () {
    return (
      <div>
        <button
          className={this.state.className}
          style={this.state.style}
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
  fromMenu : PropTypes.object.isRequired,
  fresh    : PropTypes.bool,
  fromPos  : PropTypes.array,
};
// MenuItem.propTypes = {
//   title    : PropTypes.string.isRequired,
//   name     : PropTypes.string.isRequired,
//   children : PropTypes.array.isRequired,
//   parent   : PropTypes.string,
//   animated : PropTypes.bool,
//   addItem  : PropTypes.func,
// };

export default MenuItem;
