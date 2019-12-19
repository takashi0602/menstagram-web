import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UnfollowButton, FollowButtonStyle } from './styled';

export default class FollowButton extends Component {
  render() {
    if (this.props.is_followed) {
      return <UnfollowButton>フォロー中</UnfollowButton>;
    } else {
      return <FollowButtonStyle>フォローする</FollowButtonStyle>;
    }
  }
}

FollowButton.propTypes = {
  is_followed: PropTypes.bool
};
