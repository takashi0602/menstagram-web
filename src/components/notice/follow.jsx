import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  followNoticeRow,
  notice_size,
  like_size,
  under,
  UnFollowButton,
  FollowButton
} from './styled';

export default class FollowNotices extends Component {
  render() {
    if (this.props.notices.length !== 0) {
      return (
        <div>
          {this.props.notices.map((notice, idx) => {
            return (
              <div key={idx} className="d-flex px-2 py-2 m-3">
                <div className="d-inline-block" style={followNoticeRow}>
                  <Link
                    to={'/profile/' + notice.src_user.user_id}
                    className=" d-flex align-items-start"
                    style={under}
                  >
                    <img
                      src={notice.src_user.avater}
                      alt="user_avatar"
                      className="d-inline-block rounded-circle border"
                      height="55px"
                      width="55px"
                    />
                    <div
                      className="d-inline-block pl-3 text-body"
                      style={notice_size}
                    >
                      <p className="mb-0">
                        {notice.src_user.screen_name}さんにフォローされました
                      </p>
                      <p className="text-muted mb-0" style={like_size}>
                        {notice.follow.created_at.substr(0, 10)}
                      </p>
                    </div>
                  </Link>
                </div>
                {(() => {
                  if (notice.follow.is_followed) {
                    return (
                      <div className="d-flex align-items-center">
                        <button
                          className="d-inline-block rounded-pill border"
                          style={UnFollowButton}
                        >
                          フォロー中
                        </button>
                      </div>
                    );
                  } else {
                    return (
                      <div className="d-flex align-items-center">
                        <button
                          className="d-inline-block rounded-pill"
                          style={FollowButton}
                        >
                          フォローする
                        </button>
                      </div>
                    );
                  }
                })()}
              </div>
            );
          })}
        </div>
      );

      //通知がない時
    } else {
      return (
        <div className="text-center mb-5 mt-4 p-1">通知はありません。</div>
      );
    }
  }
}

FollowNotices.propTypes = {
  notices: PropTypes.array
};
