import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { calc, under, notice_size, like_size } from './styled';

export default class LikeNotices extends Component {
  render() {
    if (this.props.notices.length !== 0) {
      return (
        <div>
          {this.props.notices.map((notice, idx) => {
            return (
              <div key={idx} className="d-flex px-2 py-2 m-3 mb-0">
                <div className="d-inline-block" style={calc}>
                  <Link
                    to={'/users/' + notice.src_user.user_id}
                    className=" d-flex align-items-center"
                    style={under}
                  >
                    <img
                      src={notice.src_user.avater}
                      alt="user_avatar"
                      className="d-inline-block rounded-circle border"
                      height="55px"
                      width="55px"
                    />
                    <a
                      className="d-inline-block pl-3 text-body"
                      style={notice_size}
                    >
                      {notice.src_user.screen_name}さんがいいねしました
                      <td></td>
                      <a className="text-muted" style={like_size}>
                        {notice.like.created_at.substr(0, 10)}
                      </a>
                    </a>
                  </Link>
                </div>
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

      //通知がない時
    } else {
      return (
        <div className="text-center mb-5 mt-4 p-1">通知はありません。</div>
      );
    }
  }
}

LikeNotices.propTypes = {
  notices: PropTypes.object
};
