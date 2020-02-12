import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  FollowNoticeRow,
  NoticeSize,
  YumSize,
  under,
  NowrapButton
} from './styled';

export default class FollowNotices extends Component {
  ListOrEmpty = () => {
    if (this.props.notices.length === 0) {
      return <div className="text-center pt-3">通知はありません。</div>;
    }
    return this.props.notices.map((notice, idx) => {
      return (
        <div key={idx} className="d-flex mb-3">
          <FollowNoticeRow>
            <Link
              to={`/user/${notice.src_user.user_id}`}
              className=" d-flex align-items-start"
              style={under}
            >
              <img
                src={notice.src_user.avatar}
                alt="user_avatar"
                className="d-inline-block rounded-circle border"
                height="55px"
                width="55px"
              />
              <NoticeSize>
                <p className="mb-0">
                  {notice.src_user.user_name}さんにフォローされました。
                </p>
                <YumSize>{notice.follow.created_at.substr(0, 10)}</YumSize>
              </NoticeSize>
            </Link>
          </FollowNoticeRow>
          {(() => {
            if (notice.follow.is_followed) {
              return (
                <div className="d-flex align-items-center">
                  <NowrapButton
                    type="button"
                    className="c-button__white c-button__commonWidth"
                    onClick={this.props.openModal}
                  >
                    フォロー解除
                  </NowrapButton>
                </div>
              );
            } else {
              return (
                <div className="d-flex align-items-center">
                  <NowrapButton
                    type="button"
                    className="c-button__orange c-button__commonWidth"
                  >
                    フォローする
                  </NowrapButton>
                </div>
              );
            }
          })()}
        </div>
      );
    });
  };

  render() {
    return (
      <div className="c-container__padding pt-3">{this.ListOrEmpty()}</div>
    );
  }
}

FollowNotices.propTypes = {
  notices: PropTypes.array,
  openModal: PropTypes.func
};
