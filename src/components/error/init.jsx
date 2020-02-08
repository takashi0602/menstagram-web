import { Component } from 'react';
import PropTypes from 'prop-types';
import connect from 'react-redux/es/connect/connect';
import { notError } from '../../actions/error';

class InitErrorComponent extends Component {
  state = {
    location: null
  };

  static getDerivedStateFromProps(props, state) {
    if (props.location !== state.location) {
      props.initError();
      return {
        location: props.location
      };
    }
    return null;
  }

  render() {
    return null;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initError() {
      dispatch(notError());
    }
  };
}

export const InitError = connect(
  null,
  mapDispatchToProps
)(InitErrorComponent);

InitErrorComponent.propTypes = {
  location: PropTypes.object,
  initError: PropTypes.func
};
