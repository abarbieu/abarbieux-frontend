import React from 'react';
import Routes from './components/routes/Routes';
import Footer from './components/footer/Footer';
import { ParallaxProvider } from 'react-scroll-parallax';
import MainNavbar from './components/navbar/MainNavbar';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

type MyState = {
	mid: { x: number; y: number };
};
type MyProps = {};

class App extends React.Component<MyProps, MyState> {
	constructor(props: MyProps) {
		super(props);

		this.state = {
			mid: { x: 0, y: 0 }
		};
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
	}
	render() {
		return (
			<ParallaxProvider>
				<div className="Tiled-back">
					<div id="wrap">
						<Router>
							<MainNavbar />
							<div style={{ paddingTop: '65px', paddingBottom: '42px' }}>
								<Routes rootPos={this.state.mid} />
							</div>
						</Router>
					</div>
					<footer className="footer">
						<Footer />
						{/* <small style={{ color: '#121314' }}>
              &copy; 2020, Aidan Barbieux
            </small>{' '} */}
					</footer>
				</div>
			</ParallaxProvider>
		);
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({
			mid: { x: window.innerWidth / 2, y: window.innerHeight / 2 }
		});
	}
}

export default App;
