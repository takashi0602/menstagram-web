import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  followNoticeRow,
  notice_size,
  like_size,
  tital_size,
  menu_size,
  under,
  FollowButton,
  UnFollowButton
} from './styled';

export class NotificationFollow extends Component {
  render() {
    //ダミーデータ

    const follows = [
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
          user_id: 'menstagram',
          screen_name: 'メンスタグラム非公式',
          avater: 'https://placehold.jp/150x150.png?text=icon'
        },
        follow: {
          is_followed: false,
          created_at: '2019/11/29 22:56:15'
        }
      }
    ];

    //通知がある時

    if (follows) {
      return (
        <div className=" px-0">
          <div className="text-center mb-4 mt-4" style={tital_size}>
            通知
          </div>
          <div className="d-flex justify-content-around border-bottom">
            <Link
              to="/notification"
              className="text-black-50 mb-2"
              style={(menu_size, under)}
            >
              いいね
            </Link>
            <Link
              to="/notification/follow"
              className="text-dark"
              style={(menu_size, under)}
            >
              フォロー
            </Link>
            <Link
              to="/notification/management"
              className="text-black-50"
              style={(menu_size, under)}
            >
              運営から
            </Link>
          </div>
          <div>
            {follows.map((follow, idx) => {
              return (
                <div key={idx} className="d-flex px-2 py-2 m-3">
                  <Link
                    to={'/users/' + 'aaaa'}
                    className=" d-inline-block align-items-center"
                    style={followNoticeRow}
                  >
                    <img
                      src={follow.src_user.avater}
                      alt="user_avatar"
                      className="d-inline-block rounded-circle border"
                      height="55px"
                      width="55px"
                    />
                    <a
                      className="d-inline-block pl-3 text-body"
                      style={notice_size}
                    >
                      {follow.src_user.screen_name}にフォローされました
                      <td></td>
                      <a className="text-muted" style={like_size}>
                        {follow.follow.created_at.substr(0, 10)}
                      </a>
                    </a>
                  </Link>
                  {(() => {
                    if (follow.follow.is_followed) {
                      return (
                        <button
                          className="d-inline-block rounded-pill border"
                          style={UnFollowButton}
                        >
                          フォロー中
                        </button>
                      );
                    } else {
                      return (
                        <button
                          className="d-inline-block rounded-pill"
                          style={FollowButton}
                        >
                          フォローする
                        </button>
                      );
                    }
                  })()}
                </div>
              );
            })}
          </div>
        </div>
      );

      //通知がない時
    } else {
      return (
        <div className=" px-0">
          <div className="text-center mb-5 mt-4" style={tital_size}>
            通知
          </div>
          <div className="d-flex justify-content-around border-bottom">
            <Link
              to="/notification"
              className="text-black-50 mb-2"
              style={(menu_size, under)}
            >
              いいね
            </Link>
            <Link
              to="/notification/follow"
              className="text-dark"
              style={(menu_size, under)}
            >
              フォロー
            </Link>
            <Link
              to="/notification/management"
              className="text-black-50"
              style={(menu_size, under)}
            >
              運営
            </Link>
          </div>
          <div className="text-center mb-5 mt-4 p-1">通知はありません。</div>
        </div>
      );
    }
  }
}
