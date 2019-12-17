import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { under, NoticeSize, LikeSize } from './styled';

export default class ManageNotices extends Component {
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
            <div key={idx} className=" px-2 py-2 m-3">
              <span className=" d-flex align-items-center" style={under}>
                <img
                  src="https://placehold.jp/150x150.png?text=icon"
                  alt="user_avatar"
                  className="d-inline-block rounded-circle border"
                  height="55px"
                  width="55px"
                />
                <NoticeSize>
                  {notice.text}
                  <LikeSize>{notice.created_at.substr(0, 10)}</LikeSize>
                </NoticeSize>
              </span>
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

ManageNotices.propTypes = {
  notices: PropTypes.array
};
