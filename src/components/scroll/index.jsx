import React from 'react';
import PropTypes from 'prop-types';

export class Scroll extends React.Component {
  constructor(props) {
    super(props);
  }

  _isMounted = false;

  componentDidMount = () => {
    this._isMounted = true;
    window.addEventListener('scroll', () => this.watchCurrentPosition(), false);
  };

  componentWillUnmount = () => {
    this._isMounted = false;
    window.removeEventListener('scroll', {}, false);
  };

  watchCurrentPosition = () => {
    if (this._isMounted) this.props.handleScroll(this.scrollTop());
  };

  scrollTop = () => {
    return Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );
  };

  render() {
    return <div />;
  }
}

Scroll.propTypes = {
  handleScroll: PropTypes.func
};
