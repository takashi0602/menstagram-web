import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UnFollowButton, FollowButtonStyle } from './styled';

export default class FollowButton extends Component {
  render() {
    if (this.props.is_followed) {
      return <UnFollowButton>フォロー中</UnFollowButton>;
    } else {
      return <FollowButtonStyle>フォローする</FollowButtonStyle>;
    }
  }
}

FollowButton.propTypes = {
  is_followed: PropTypes.bool
};
