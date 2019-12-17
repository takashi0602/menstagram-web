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

export default class UserRow extends Component {
  ActionButton = is_follwed => {
    if (is_follwed) {
      return (
        <button className="col-5 rounded-pill border" style={UnFollowButton}>
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
  };
  render() {
    return (
      <li className="row px-2 py-2">
        <Link
          to={'/profile/' + this.props.user.user_id}
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
          <UserLink>
            {this.props.user.user_id}
            <br />
            {this.props.user.screen_name}
          </UserLink>
        </Link>
        {<this.ActionButton is_follwed={this.props.user.is_follwed} />}
      </li>
    );
  }
}

UserRow.propTypes = {
  user: PropTypes.object
};
