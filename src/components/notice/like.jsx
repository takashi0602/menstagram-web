import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Calc, under, NoticeSize, LikeSize } from './styled';

export default class LikeNotices extends Component {
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
            <div key={idx} className="d-flex px-2 py-2 m-3 mb-0">
              <Calc>
                <Link
                  to={'/profile/' + notice.src_user.user_id}
                  className=" d-flex align-items-center"
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
                      {notice.src_user.screen_name}さんにいいねされました
                    </p>
                    <LikeSize>{notice.like.created_at.substr(0, 10)}</LikeSize>
                  </NoticeSize>
                </Link>
              </Calc>
              <img
                className="d-inline-block"
                src={notice.post.image}
                height="50px"
                width="50px"
                alt=""
              />
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

LikeNotices.propTypes = {
  notices: PropTypes.array
};
