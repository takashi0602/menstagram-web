import React from 'react';

export class Scroll extends React.Component {
  componentDidMount = () => {
    window.addEventListener('scroll', () => this.watchCurrentPosition(), true)
  };

  componentWillUnmount = () => {
    window.removeEventListener('scroll')
  };

  watchCurrentPosition = () => {
    this.props.handleScroll(this.scrollTop());
  };

  scrollTop = () => {
    return Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop);
  };

  render() {
    return <div />;
  }
}
