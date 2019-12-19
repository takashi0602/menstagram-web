import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UnfollowButton, FollowButton } from './styled';

export default class FollowButtons extends Component {
  render() {
    if (this.props.is_followed) {
      return <UnfollowButton>フォロー中</UnfollowButton>;
    } else {
      return <FollowButton>フォローする</FollowButton>;
    }
  }
}

FollowButtons.propTypes = {
  is_followed: PropTypes.bool
};
