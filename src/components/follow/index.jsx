import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { LinkStyle, UserAvatar, UserLink, FollowButton } from './styled';

export default class FollowListItem extends Component {
  render() {
    return (
      <li className="row mx-0 mb-3 align-items-center">
        <Link
          to={`/profile/${this.props.user.user_id}`}
          className="col-7 d-flex align-items-center p-0 pr-1"
          style={LinkStyle}
        >
          <img
            src={this.props.user.avatar}
            alt="user_avatar"
            className="d-inline-block rounded-circle border"
            height="55px"
            width="55px"
            style={UserAvatar}
          />
          <UserLink>
            {this.props.user.screen_name}
            <br />
            {this.props.user.user_id}
          </UserLink>
        </Link>
        <div className="col-5 p-0 text-right">
          {this.props.user.is_followed ? (
            <FollowButton type="button" className="c-button__white" onClick={this.props.openModal}>
              フォロー中
            </FollowButton>
          ) : (
            <FollowButton type="button" className="c-button__orange">
              フォローする
            </FollowButton>
          )}
        </div>
      </li>
    );
  }
}

FollowListItem.propTypes = {
  user: PropTypes.object,
  openModal: PropTypes.func
};
