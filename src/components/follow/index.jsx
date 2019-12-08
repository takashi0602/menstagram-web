import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  LinkStyle,
  UnFollowButton,
  FollowButton,
  UserAvatar,
  UserLink
} from './styled';

export default class FollowUser extends Component {
  render() {
    return (
      <li className="row px-2 py-2">
        <Link
          to={'/users/' + this.props.user.user_id}
          className="col-7 d-flex align-items-center"
          style={LinkStyle}
        >
          <img
            src={this.props.user.avater}
            alt="user_avatar"
            className="d-inline-block rounded-circle border"
            height="55px"
            width="55px"
            style={UserAvatar}
          />
          <span className="d-inline-block pl-2" style={UserLink}>
            {this.props.user.user_id}
            <br />
            {this.props.user.screen_name}
          </span>
        </Link>
        {(() => {
          if (this.props.user.is_follwed) {
            return (
              <button
                className="col-5 rounded-pill border"
                style={UnFollowButton}
              >
                フォロー中
              </button>
            );
          } else {
            return (
              <button className="col-5 rounded-pill" style={FollowButton}>
                フォローする
              </button>
            );
          }
        })()}
      </li>
    );
  }
}

FollowUser.propTypes = {
  user: PropTypes.object
};
