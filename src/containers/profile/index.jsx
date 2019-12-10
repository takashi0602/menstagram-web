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
  render() {
    const parentRoute = '/post/3';
    const isMypage = true;
    const user = {
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
    const posts = [
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

    const TopHeader = () => {
      if (isMypage) {
        return (
          <header className="py-3 px-3 d-flex justify-content-between">
            <span className="pr-3"></span>
            <h1></h1>
            <button className="text-left bg-white p-0">
              <FontAwesomeIcon icon={faBars} style={SideDrawerButton} />
            </button>
          </header>
        );
      } else {
        return (
          <header className="py-3 px-3 d-flex justify-content-between">
            <Link className="text-left" to={parentRoute}>
              <FontAwesomeIcon icon={faChevronLeft} style={BackButton} />
            </Link>
            <h1></h1>
            <span className="pr-3"></span>
          </header>
        );
      }
    };

    const ControllButton = () => {
      if (isMypage) {
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
      } else if (user.is_followed) {
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
    const PostsTileView = () => {
      if (posts.length > 0) {
        return (
          <div className="container">
            <div className="row">
              {posts.map((post, idx) => {
                return (
                  <Link
                    key={idx}
                    to={'/post/' + post.id}
                    className="col-4 p-1"
                    style={PostLink}
                  >
                    <img src={post.images[0]} style={PostImage} />
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
    return (
      <div>
        {<TopHeader></TopHeader>}
        <div className="text-center">
          <img
            src={user.avatar}
            className="d-inline-block rounded-circle border mb-2"
            height="100px"
            width="100px"
          />
        </div>
        <h2 className="text-center pt-2" style={UserName}>
          {user.screen_name}
        </h2>
        <h3 className="text-center" style={UserId}>
          {user.user_id}
        </h3>

        <div className="container pb-2 border-bottom">
          <div className="row pb-2">
            <span className="col">
              <p className="text-center mb-0">{posts.length}</p>
              <p className="text-center">投稿</p>
            </span>
            <Link
              to={'/followed/' + user.user_id}
              className="col"
              style={noUnderline}
            >
              <p className="text-center mb-0">{user.followed}</p>
              <p className="text-center">フォロワー</p>
            </Link>
            <Link
              to={'/following/' + user.user_id}
              className="col"
              style={noUnderline}
            >
              <p className="text-center mb-0">{user.following}</p>
              <p className="text-center">フォロー</p>
            </Link>
          </div>
          <div className="p-2" style={Biography}>
            {user.biography}
          </div>
          {<ControllButton></ControllButton>}
        </div>
        {<PostsTileView></PostsTileView>}
      </div>
    );
  }
}

Profile.propTypes = {
  match: PropTypes.object
};
