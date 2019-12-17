import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { BackButton, LinkStyle } from './styled';
import UserRow from '../../components/userRow';

export class Follow extends Component {
  constructor(prop) {
    super(prop);
    if (this.props.match.url.split('/')[1] === 'followed') {
      this.state = {
        isFollowersView: true
      };
    } else {
      this.state = {
        isFollowersView: false
      };
    }
  }

  toggleList = (e, props) => {
    this.setState({ isFollowersView: props });
  };
  ToggleList = () => {
    if (this.state.isFollowersView) {
      return (
        <ul className="pl-0">
          {this.followers.map((user, idx) => {
            return <UserRow key={idx} user={user} />;
          })}
        </ul>
      );
    } else {
      return (
        <ul className="pl-0">
          {this.follows.map((user, idx) => {
            return <UserRow key={idx} user={user} />;
          })}
        </ul>
      );
    }
  };

  parentRoute = '/profile/1';
  loginUser = {
    id: 100,
    user_id: 'AAABBB',
    screen_name: '表示名'
  };
  followers = [
    {
      user_id: 'mensta',
      screen_name: 'メンスタグラム公式',
      avater:
        'https://placehold.jp/150x150.png?text=%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3',
      is_followed: false
    },
    {
      user_id: 'menstaaaa',
      screen_name: 'メンスタグラム非公式',
      avater:
        'https://placehold.jp/150x150.png?text=%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3',
      is_followed: true
    }
  ];
  follows = [
    {
      user_id: 'menstaaaa',
      screen_name: 'メンスタグラム非公式',
      avater:
        'https://placehold.jp/150x150.png?text=%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3',
      is_followed: true
    }
  ];

  render() {
    return (
      <div>
        <header className="py-3 px-3 border-bottom d-flex justify-content-between">
          <Link className="text-left" to={this.parentRoute}>
            <FontAwesomeIcon icon={faChevronLeft} style={BackButton} />
          </Link>
          <h1 className="h5 mb-0 text-center">{this.loginUser.user_id}</h1>
          <span className="pr-3"></span>
        </header>
        <div className="container">
          <div className="row border-bottom">
            <span
              onClick={e => this.toggleList(e, true)}
              className={
                'col py-3 text-center ' +
                (this.state.isFollowersView
                  ? ' text-dark font-weight-bold '
                  : 'text-muted')
              }
              style={LinkStyle}
            >
              {this.followers.length + 'フォロワー'}
            </span>
            <span
              onClick={e => this.toggleList(e, false)}
              className={
                'col text-muted py-3 text-center' +
                (this.state.isFollowersView
                  ? ' text-muted '
                  : ' text-dark font-weight-bold ')
              }
              style={LinkStyle}
            >
              {this.follows.length + 'フォロー中'}
            </span>
          </div>
          {this.ToggleList()}
        </div>
      </div>
    );
  }
}

Follow.propTypes = {
  match: PropTypes.object
};
