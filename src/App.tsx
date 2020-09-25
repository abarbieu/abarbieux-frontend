import React from 'react';
import Routes from './components/routes/Routes';
import Footer from './components/footer/Footer';
// import { ParallaxProvider } from 'react-scroll-parallax';
import MainNavbar from './components/navbar/MainNavbar';
import ContactMe from './components/contact/ContactMe';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

type MyState = {
  contactOpen: boolean;
  mid: { x: number; y: number };
};
type MyProps = {};

class App extends React.Component<MyProps, MyState> {
  constructor (props: MyProps) {
    super(props);

    this.state = {
      contactOpen: false,
      mid: { x: 0, y: 0 },
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  toggleContact = (open: boolean) => {
    this.setState(
      (prevState: MyState) => {
        if (open) {
          prevState.contactOpen = true;
        } else {
          prevState.contactOpen = false;
        }
        return prevState;
      },
      () => {
        // console.log(`cmodal: ${this.state.contactOpen}`);
      }
    );
  };
  render () {
    return (
      // <ParallaxProvider>
        <div className='Tiled-back'>
          <Router>
            <MainNavbar toggleContact={this.toggleContact} />
            <div style={{ paddingTop: '60px', paddingBottom: '42px' }}>
              <Routes rootPos={this.state.mid} />
            </div>
          </Router>
          <ContactMe
            show={this.state.contactOpen}
            toggleContact={this.toggleContact}
          />
          {/* <footer className='footer dark-bg'> */}

          <Footer />
          {/* <small style={{ color: '#121314' }}>
              &copy; 2020, Aidan Barbieux
            </small>{' '} */}
          {/* </footer> */}
        </div>
      // </ParallaxProvider>
    );
  }

  componentDidMount () {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions () {
    this.setState({
      mid: { x: window.innerWidth / 2, y: window.innerHeight / 2 },
    });
  }
}

export default App;
