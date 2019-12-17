import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  FollowNoticeRow,
  NoticeSize,
  LikeSize,
  under,
  UnFollowButton,
  FollowButton
} from './styled';

export default class FollowNotices extends Component {
  ListOrEmpty = () => {
    if (this.props.notices.length === 0) {
      return (
        <div className="text-center mb-5 mt-4 p-1">通知はありません。</div>
      );
    }
    return (
      <div>
        {this.props.notices.map((notice, idx) => {
          return (
            <div key={idx} className="d-flex px-2 py-2 m-3">
              <FollowNoticeRow>
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
                  <NoticeSize>
                    <p className="mb-0">
                      {notice.src_user.screen_name}さんにフォローされました
                    </p>
                    <LikeSize>
                      {notice.follow.created_at.substr(0, 10)}
                    </LikeSize>
                  </NoticeSize>
                </Link>
              </FollowNoticeRow>
              {(() => {
                if (notice.follow.is_followed) {
                  return (
                    <div className="d-flex align-items-center">
                      <UnFollowButton>フォロー中</UnFollowButton>
                    </div>
                  );
                } else {
                  return (
                    <div className="d-flex align-items-center">
                      <FollowButton>フォローする</FollowButton>
                    </div>
                  );
                }
              })()}
            </div>
          );
        })}
      </div>
    );
  };
  render() {
    return <this.ListOrEmpty />;
  }
}

FollowNotices.propTypes = {
  notices: PropTypes.array
};
