import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { under, notice_size, like_size } from './styled';

export default class ManageNotices extends Component {
  render() {
    if (this.props.notices.length !== 0) {
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
                  <span
                    className="d-inline-block pl-3 text-body"
                    style={notice_size}
                  >
                    {notice.text}
                    <span className="text-muted" style={like_size}>
                      {notice.created_at.substr(0, 10)}
                    </span>
                  </span>
                </span>
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

ManageNotices.propTypes = {
  notices: PropTypes.array
};
