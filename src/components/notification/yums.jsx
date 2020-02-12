import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Calc, under, NoticeSize, YumSize } from './styled';

export default class YumsNotices extends Component {
  ListOrEmpty = () => {
    if (this.props.notices.length === 0) {
      return <div className="text-center pt-3">通知はありません。</div>;
    }
    return this.props.notices.map((notice, idx) => {
      return (
        <div key={idx} className="d-flex justify-content-between mb-3">
          <Calc>
            <Link
              to={`/user/${notice.src_user.user_id}`}
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
                  {notice.src_user.user_name}さんがヤムしました。
                </p>
                <YumSize>{notice.yum.created_at.substr(0, 10)}</YumSize>
              </NoticeSize>
            </Link>
          </Calc>
          <img
            className="d-inline-block"
            src={notice.slurp.image}
            height="50px"
            width="50px"
            alt="ラーメン"
          />
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

YumsNotices.propTypes = {
  notices: PropTypes.array
};
