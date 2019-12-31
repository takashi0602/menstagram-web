import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { under, NoticeSize, LikeSize } from './styled';

export default class ManageNotices extends Component {
  ListOrEmpty = () => {
    if (this.props.notices.length === 0) {
      return <div className="text-center pt-3">通知はありません。</div>;
    }
    return (
      <div>
        {this.props.notices.map((notice, idx) => {
          return (
            <div key={idx} className="mb-3">
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
    return (
      <div className="c-container__padding pt-3">{this.ListOrEmpty()}</div>
    );
  }
}

ManageNotices.propTypes = {
  notices: PropTypes.array
};
