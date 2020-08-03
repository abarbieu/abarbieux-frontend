import React from 'react';
import styled, { css } from 'styled-components';
import { Point } from '../tree_menu/TreeMenuApi';

type MyState = {
  [key: string]: { hidden: boolean };
  // left: { hidden: boolean };
  // bottom: { hidden: boolean };
};
type MyProps = {
  screenSize: Point;
};
export default class Panels extends React.Component<MyProps, MyState> {
  animated = false;
  coverid = 'hidden';

  constructor (props: MyProps) {
    super(props);
    this.state = {
      left: { hidden: true },
      bottom: { hidden: true },
    };
  }
  render () {
    const SidePanel = this.getSideStyle();
    const BottomPanel = this.getBottomStyle();
    if (this.state.left.hidden && this.state.bottom.hidden) {
      this.coverid = 'hidden';
    }
    console.log(this.coverid);

    return (
      <div>
        <button
          className={this.coverid}
          onClick={() => this.toggleHidden('all')}
        />
        <BottomPanel id='bottomback' className='horiz'>
          <button
            id='bottombutton'
            className='horiz'
            onClick={() => this.toggleHidden('bottom')}
          >
            <p>Contact</p>
          </button>
        </BottomPanel>
        <SidePanel id='sideback' className='vert'>
          <button id='sidebutton' onClick={() => this.toggleHidden('left')}>
            <p>MORE</p>
          </button>
        </SidePanel>
      </div>
    );
  }

  getSideStyle = () => {
    let anim;
    if (this.animated) {
      anim = css`
        animation: ${this.state.left.hidden ? 'sidehide' : 'sideexpand'} 350ms
          ease-in-out forwards;
      `;
      this.animated = false;
      // this.coverid = 'hidden';
    } else {
      anim = '';
    }
    return styled.div`
      top: ${this.props.screenSize.y / 2 - 100}px;
      ${anim};
    `;
  };

  getBottomStyle = () => {
    let anim;
    if (this.animated) {
      anim = css`
        animation: ${this.state.bottom.hidden ? 'bottomhide' : 'bottomexpand'}
          350ms ease-in-out forwards;
      `;
      this.animated = false;
      // this.coverid = 'hidden';
    } else {
      anim = '';
    }
    return styled.div`
      left: ${this.props.screenSize.x / 2 - 150}px;
      ${anim};
    `;
  };

  toggleHidden = (panel: string) => {
    this.setState((prevState: MyState) => {
      if (panel === 'all') {
        prevState['left'].hidden = true;
        prevState['bottom'].hidden = true;
        this.coverid = 'hidden';
      } else {
        prevState[panel].hidden = !prevState[panel].hidden;
      }
      this.animated = true;
      this.coverid = prevState.hidden ? 'screenCover-h' : 'screenCover';
      return prevState;
    });
  };
}

// import React from 'react';
// import styled, { css } from 'styled-components';
// import { Point } from '../tree_menu/TreeMenuApi';
// import './SidePanel.css';

// type MyState = {
//   hidden: boolean;
// };
// type MyProps = {
//   screenSize: Point;
// };
// export default class SidePanel extends React.Component<MyProps, MyState> {
//   animated = false;
//   coverid = 'hidden';

//   constructor (props: MyProps) {
//     super(props);
//     this.state = {
//       hidden: true,
//     };
//   }
//   render () {
//     const Part = this.getStyle();
//     console.log(this.coverid);

//     return (
//       <div>
//         <button
//           id='sideCover'
//           className={this.coverid}
//           onClick={() => this.toggleHidden()}
//         />
//         <Part id='sideback' className='vert'>
//           <button id='sidebutton' onClick={() => this.toggleHidden()}>
//             <p>MORE</p>
//           </button>
//         </Part>
//       </div>
//     );
//   }

//   getStyle = () => {
//     let anim;
//     if (this.animated) {
//       anim = css`
//         animation: ${this.state.hidden ? 'sidehide' : 'sideexpand'} 350ms
//           ease-in-out forwards;
//       `;
//       this.animated = false;
//       // this.coverid = 'hidden';
//       // this.setState({ animated: false });
//     } else {
//       anim = '';
//     }
//     return styled.div`
//       top: ${this.props.screenSize.y / 2 - 100}px;
//       ${anim};
//     `;
//   };

//   toggleHidden = () => {
//     this.setState((prevState: MyState) => {
//       prevState.hidden = !prevState.hidden;
//       this.animated = true;
//       this.coverid = prevState.hidden ? 'screenCover-h' : 'screenCover';
//       return prevState;
//     });
//   };
// }
