import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FollowListItem from '../../components/follow';
import { FollowHeader } from '../../components/follow/header';

const followers = [
  {
    user_id: 'mensta',
    screen_name: 'メンスタグラム公式',
    avatar:
      'https://placehold.jp/150x150.png?text=%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3',
    is_followed: false
  },
  {
    user_id: 'menstaaaa',
    screen_name: 'メンスタグラム非公式',
    avatar:
      'https://placehold.jp/150x150.png?text=%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3',
    is_followed: true
  }
];

const follows = [
  {
    user_id: 'menstaaaa',
    screen_name: 'メンスタグラム非公式',
    avatar:
      'https://placehold.jp/150x150.png?text=%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3',
    is_followed: true
  }
];

export class Follow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowersView: true
    };
  }

  ToggleList = () => {
    if (this.props.history.location.pathname.split('/')[1] === 'followed') {
      return (
        <ul className="pl-0">
          {followers.map((user, idx) => {
            return <FollowListItem key={idx} user={user} />;
          })}
        </ul>
      );
    } else {
      return (
        <ul className="pl-0">
          {follows.map((user, idx) => {
            return <FollowListItem key={idx} user={user} />;
          })}
        </ul>
      );
    }
  };

  render() {
    return (
      <div>
        {<FollowHeader history={this.props.history} />}
        <div className="c-container__padding pt-3">{this.ToggleList()}</div>
      </div>
    );
  }
}

Follow.propTypes = {
  history: PropTypes.object
};
