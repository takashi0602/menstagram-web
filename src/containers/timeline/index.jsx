import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { TimelineHeader } from '../../components/timeline/header';

export class TimelineContainer extends Component {
  render() {
    return (
      <div>
        <TimelineHeader
          isPrivate={window.location.pathname === '/timeline/private'}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    status: state.error.status,
    loading: state.loading.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPostList() {
      dispatch();
    }
  };
}

export const Timeline = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineContainer);

Timeline.propTypes = {
  getPostList: PropTypes.func
};
