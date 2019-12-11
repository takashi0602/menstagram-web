import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faBars,
  faImages
} from '@fortawesome/free-solid-svg-icons';
import {
  BackButton,
  SideDrawerButton,
  UserName,
  UserId,
  Biography,
  WhiteButton,
  FollowButton,
  noUnderline,
  PostLink,
  PostImage,
  ImagesIcon
} from './styled';

export class Profile extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      isFollowersView: true
    };
  }

  TopHeader = () => {
    if (this.isMypage) {
      return (
        <header className="py-3 px-3 d-flex justify-content-end">
          <button className="text-left bg-white p-0">
            <FontAwesomeIcon icon={faBars} style={SideDrawerButton} />
          </button>
        </header>
      );
    } else {
      return (
        <header className="py-3 px-3 d-flex justify-content-start">
          <Link className="text-left" to={this.parentRoute}>
            <FontAwesomeIcon icon={faChevronLeft} style={BackButton} />
          </Link>
        </header>
      );
    }
  };

  ControllButton = () => {
    if (this.isMypage) {
      return (
        <div className="p-2">
          <Link
            to={'/profile/' + this.props.match.params.id + '/edit'}
            className="d-block rounded-pill text-center"
            style={WhiteButton}
          >
            プロフィールの編集
          </Link>
        </div>
      );
    } else if (this.user.is_followed) {
      return (
        <div className="p-2">
          <div className="rounded-pill text-center" style={WhiteButton}>
            フォロー中
          </div>
        </div>
      );
    } else {
      return (
        <div className="p-2">
          <div className="rounded-pill text-center" style={FollowButton}>
            フォロー
          </div>
        </div>
      );
    }
  };
  PostsTileView = () => {
    if (this.posts.length > 0) {
      return (
        <div className="container">
          <div className="row">
            {this.posts.map((post, idx) => {
              return (
                <Link
                  key={idx}
                  to={'/post/' + post.id}
                  className="col-4 p-1"
                  style={PostLink}
                >
                  <img src={post.images[0]} style={PostImage} alt="post" />
                  <FontAwesomeIcon
                    icon={faImages}
                    style={ImagesIcon}
                  ></FontAwesomeIcon>
                </Link>
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="row">
            <div className="col-12 mt-2">
              <p>まだ投稿していません。</p>
              <p>ラーメンを投稿してみましょう。</p>
              <Link to="/post">ラーメンを投稿する</Link>
            </div>
          </div>
        </div>
      );
    }
  };

  parentRoute = '/post/3';
  isMypage = true;
  user = {
    id: 1,
    user_id: 'menstagram',
    avatar: 'https://placehold.jp/150x150.png?text=icon',
    screen_name: 'メンスタグラム公式',
    posted: 10,
    following: 10,
    followed: 10,
    is_followed: false,
    biography:
      'user_information. user_information. user_information. user_information.'
  };
  posts = [
    {
      id: 1,
      text: 'aaaa',
      images: [
        'http://placehold.it/300x300?text=1',
        'http://placehold.it/300x300?text=2',
        'http://placehold.it/300x300?text=3',
        'http://placehold.it/300x300?text=4'
      ],
      liked: 1
    },
    {
      id: 2,
      text: 'aaaa',
      images: [
        'http://placehold.it/300x500?text=1',
        'http://placehold.it/300x300?text=2',
        'http://placehold.it/300x300?text=3',
        'http://placehold.it/300x300?text=4'
      ],
      liked: 1
    },
    {
      id: 3,
      text: 'aaaa',
      images: [
        'http://placehold.it/500x300?text=1',
        'http://placehold.it/300x300?text=2',
        'http://placehold.it/300x300?text=3',
        'http://placehold.it/300x300?text=4'
      ],
      liked: 1
    },
    {
      id: 4,
      text: 'aaaa',
      images: [
        'http://placehold.it/300x200?text=1',
        'http://placehold.it/300x300?text=2',
        'http://placehold.it/300x300?text=3',
        'http://placehold.it/300x300?text=4'
      ],
      liked: 1
    },
    {
      id: 5,
      text: 'aaaa',
      images: [
        'http://placehold.it/300x300?text=1',
        'http://placehold.it/300x300?text=2',
        'http://placehold.it/300x300?text=3',
        'http://placehold.it/300x300?text=4'
      ],
      liked: 1
    },
    {
      id: 6,
      text: 'aaaa',
      images: [
        'http://placehold.it/800x300?text=1',
        'http://placehold.it/300x300?text=2',
        'http://placehold.it/300x300?text=3',
        'http://placehold.it/300x300?text=4'
      ],
      liked: 1
    },
    {
      id: 7,
      text: 'aaaa',
      images: [
        'http://placehold.it/300x400?text=1',
        'http://placehold.it/300x300?text=2',
        'http://placehold.it/300x300?text=3',
        'http://placehold.it/300x300?text=4'
      ],
      liked: 1
    },
    {
      id: 8,
      text: 'aaaa',
      images: [
        'http://placehold.it/300x300?text=1',
        'http://placehold.it/300x300?text=2',
        'http://placehold.it/300x300?text=3',
        'http://placehold.it/300x300?text=4'
      ],
      liked: 1
    },
    {
      id: 9,
      text: 'aaaa',
      images: [
        'http://placehold.it/300x300?text=1',
        'http://placehold.it/300x300?text=2',
        'http://placehold.it/300x300?text=3',
        'http://placehold.it/300x300?text=4'
      ],
      liked: 1
    },
    {
      id: 10,
      text: 'aaaa',
      images: [
        'http://placehold.it/300x300?text=1',
        'http://placehold.it/300x300?text=2',
        'http://placehold.it/300x300?text=3',
        'http://placehold.it/300x300?text=4'
      ],
      liked: 1
    }
  ];

  render() {
    return (
      <div>
        {this.TopHeader()}
        <div className="text-center">
          <img
            src={this.user.avatar}
            alt="avatar"
            className="d-inline-block rounded-circle border mb-2"
            height="100px"
            width="100px"
          />
        </div>
        <h2 className="text-center pt-2" style={UserName}>
          {this.user.screen_name}
        </h2>
        <h3 className="text-center" style={UserId}>
          {this.user.user_id}
        </h3>

        <div className="container pb-2 border-bottom">
          <div className="row pb-2">
            <span className="col">
              <p className="text-center mb-0">{this.posts.length}</p>
              <p className="text-center">投稿</p>
            </span>
            <Link
              to={'/followed/' + this.user.user_id}
              className="col"
              style={noUnderline}
            >
              <p className="text-center mb-0">{this.user.followed}</p>
              <p className="text-center">フォロワー</p>
            </Link>
            <Link
              to={'/following/' + this.user.user_id}
              className="col"
              style={noUnderline}
            >
              <p className="text-center mb-0">{this.user.following}</p>
              <p className="text-center">フォロー</p>
            </Link>
          </div>
          <div className="p-2" style={Biography}>
            {this.user.biography}
          </div>
          {this.ControllButton()}
        </div>
        {this.PostsTileView()}
      </div>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.object
};
