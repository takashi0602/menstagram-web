import React, { Component } from 'react';
import { tital_size, menu_size, under } from './styled';
import LikeNotices from '../../components/notice/like';
import FollowNotices from '../../components/notice/follow';
import ManageNotices from '../../components/notice/manage';

export class Notification extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      viewMode: 'LIKE'
    };
  }
  changeViewMode = (e, props) => {
    this.setState({ viewMode: props });
  };
  DataView = () => {
    if (this.state.viewMode === 'LIKE') {
      return <LikeNotices notices={this.likes} />;
    } else if (this.state.viewMode === 'FOLLOW') {
      return <FollowNotices notices={this.follows} />;
    } else if (this.state.viewMode === 'MANAGE') {
      return <ManageNotices notices={this.manages} />;
    }
  };

  //ダミーデータ
  follows = [
    {
      id: 1,
      src_user: {
        user_id: 'menstagram',
        screen_name: 'メンスタグラム公式',
        avater: 'https://placehold.jp/150x150.png?text=icon'
      },
      follow: {
        is_followed: true,
        created_at: '2019/11/29 22:56:15'
      }
    },
    {
      id: 1,
      src_user: {
        user_id: 'menstagraaaaam',
        screen_name: 'メンスタグラム非公式',
        avater: 'https://placehold.jp/150x150.png?text=icon'
      },
      follow: {
        is_followed: false,
        created_at: '2019/11/29 22:56:15'
      }
    }
  ];
  likes = [
    {
      id: 1,
      src_user: {
        user_id: 'menstagram',
        screen_name: 'メンスタグラム公式',
        avater: 'https://placehold.jp/150x150.png?text=icon'
      },
      post: {
        id: 1,
        image: 'https://placehold.jp/150x150.png?text=image'
      },
      like: {
        created_at: '2019/11/29 22:56:15'
      }
    },
    {
      id: 1,
      src_user: {
        user_id: 'menstagram',
        screen_name: 'メンスタグラム非公式',
        avater: 'https://placehold.jp/150x150.png?text=icon'
      },
      post: {
        id: 1,
        image: 'https://placehold.jp/150x150.png?text=image'
      },
      like: {
        created_at: '2019/11/29 22:56:15'
      }
    }
  ];
  manages = [
    {
      id: 1,
      text:
        'あなたの投稿にラーメンではないラーメンではない画像が投稿されていたため,削除いたしました。',
      created_at: '2019/11/29 22:56:15'
    }
  ];

  render() {
    return (
      <div className=" px-0">
        <div className="text-center mb-4 mt-4" style={tital_size}>
          通知
        </div>
        <div className="container">
          <div className="row justify-content-around border-bottom">
            <span
              onClick={e => this.changeViewMode(e, 'LIKE')}
              className={
                'col text-center pl-0 pr-0 pt-2 pb-2' +
                (this.state.viewMode === 'LIKE'
                  ? ' text-dark font-weight-bold '
                  : 'text-muted')
              }
              style={(menu_size, under)}
            >
              いいね
            </span>
            <span
              onClick={e => this.changeViewMode(e, 'FOLLOW')}
              className={
                'col text-center pl-0 pr-0 pt-2 pb-2' +
                (this.state.viewMode === 'FOLLOW'
                  ? ' text-dark font-weight-bold '
                  : 'text-muted')
              }
              style={(menu_size, under)}
            >
              フォロー
            </span>
            <span
              onClick={e => this.changeViewMode(e, 'MANAGE')}
              className={
                'col text-center pl-0 pr-0 pt-2 pb-2' +
                (this.state.viewMode === 'MANAGE'
                  ? ' text-dark font-weight-bold '
                  : 'text-muted')
              }
              style={(menu_size, under)}
            >
              運営から
            </span>
          </div>
        </div>
        {this.DataView()}
      </div>
    );
  }
}
