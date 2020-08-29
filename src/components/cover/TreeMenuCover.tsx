import React, { Component } from 'react';
import { Point } from '../tree_menu/TreeMenuApi';
import { Link, withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

type LocationState = {
  openPath?: Array<string>;
  highlighted?: string;
};
type MyState = {
  // clicked: boolean;
};
type MyProps = RouteComponentProps<{}, {}, LocationState> & {
  pos?: Point;
  fading: boolean;
};

class TreeMenuCover extends Component<MyProps, MyState> {
  renderable = true;
  timeouts: Array<number> = [];

  render() {
    if (!this.props.fading || (this.props.location.state && this.renderable)) {
      if (this.props.fading) {
        this.timeouts.push(
          setTimeout(() => {
            this.renderable = false;
            this.timeouts.push(
              setTimeout(() => {
                this.renderable = true;
              }, 1300)
            );
          }, 400)
        );
      }
      return (
        <div id="tree-cover" className={this.props.fading ? 'shrinkFade' : undefined}>
          <Container className="justify-content-center m-0 p-0">
            <Row className="m-0 p-0">
              <Link
                to={{
                  pathname: '/explore',
                  state: { openPath: [ 'root', 'projects', 'fun' ] }
                }}
              >
                <Col className="m-0 p-0 ">
                  <button className="gen-btn pos-relative">
                    <LazyLoadImage
                      className="img-block"
                      effect="black-and-white"
                      alt="gpx visualizer demo"
                      placeholderSrc="/icons/gpxdemo-o_thumb_.gif"
                      src="/icons/gpxdemo-o.gif"
                    />
                    {/* <p className="light-bg rounded centered" /> */}
                  </button>
                </Col>
              </Link>
              <Link
                to={{
                  pathname: '/art/',
                  state: { openPath: [ 'root', 'art' ] }
                }}
              >
                <button className="gen-btn">
                  <Col className="m-0 p-0">
                    <LazyLoadImage
                      className="img-block"
                      effect="black-and-white"
                      alt="sherbert!"
                      placeholderSrc="/icons/sherbert.svg"
                      src="/icons/sherbert.svg"
                    />
                  </Col>
                </button>
              </Link>
              <Link
                to={{
                  pathname: '/explore',
                  state: { openPath: [ 'root', 'projects', 'fun' ] }
                }}
              >
                <button className="gen-btn">
                  <Col className="m-0 p-0">
                    <LazyLoadImage
                      className="img-block"
                      effect="black-and-white"
                      alt="madelbrot set zoom"
                      placeholderSrc="/icons/mzoom_thumb_.gif"
                      src="/icons/mzoom.gif"
                    />
                  </Col>
                </button>
              </Link>
            </Row>
            <Link
              to={{
                pathname: '/explore',
                state: { openPath: [ 'root' ] }
              }}
            >
              <button
                className="gen-btn"
                style={{
                  position: 'absolute',
                  textAlign: 'center',
                  // padding: '20px 0',
                  lineHeight: 100,
                  height: 100,
                  width: 300,
                  bottom: 100,
                  left: 0,
                  backgroundColor: '#116a88'
                }}
              >
                <h1
                  style={{
                    lineHeight: 2.5
                  }}
                >
                  Explore
                </h1>
              </button>
            </Link>
            <div
              style={{
                position: 'absolute',
                height: 100,
                bottom: 0
              }}
            >
              <Row className="m-0 p-0">
                <Link
                  to={{
                    pathname: '/art/ceramics',
                    state: { openPath: [ 'root', 'art' ] }
                  }}
                >
                  <button className="gen-btn">
                    <Col className="m-0 p-0">
                      <LazyLoadImage
                        className="img-block"
                        effect="black-and-white"
                        alt="raw bowl"
                        placeholderSrc="/icons/raw-bowl_thumb_.jpg"
                        src="/icons/raw-bowl.jpg"
                      />
                    </Col>
                  </button>
                </Link>
                <Link
                  to={{
                    pathname: '/explore',
                    state: { openPath: [ 'root', 'projects', 'fun' ] }
                  }}
                >
                  <button className="gen-btn">
                    <Col className="m-0 p-0">
                      <LazyLoadImage
                        className="img-block"
                        effect="black-and-white"
                        alt="julia set zoom"
                        placeholderSrc="/icons/jzoom_thumb_.gif"
                        src="/icons/jzoom.gif"
                      />
                    </Col>
                  </button>
                </Link>
                <Link
                  to={{
                    pathname: '/art/photos',
                    state: { openPath: [ 'root', 'art' ] }
                  }}
                >
                  <button className="gen-btn">
                    <Col className="m-0 p-0">
                      <LazyLoadImage
                        className="img-block"
                        effect="black-and-white"
                        alt="water droplets"
                        placeholderSrc="/icons/macro-drops_thumb_.jpg"
                        src="/icons/macro-drops.jpg"
                      />
                    </Col>
                  </button>
                </Link>
              </Row>
            </div>
          </Container>
        </div>
      );
    }

    return <div style={{ display: 'none' }} />;
  }

  //! --------------------------------------------------------------------------

  componentWillUnmount() {
    this.timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
  }
}

export default withRouter(TreeMenuCover);
