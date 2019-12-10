import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  Submit,
  BlackLink,
  Title,
  PositionParent,
  OrangeText,
  TextArea
} from './styled';

export class ProfileEdit extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      isFollowersView: true
    };
  }
  render() {
    const user = {
      id: 1,
      user_id: 'menstagram',
      avatar: 'https://placehold.jp/150x150.png?text=icon',
      screen_name: 'メンスタグラム公式',
      posted: 10,
      following: 10,
      followed: 10,
      is_followed: false,
      biography:
        'user_information. user_information. user_information. user_information.'
    };

    const TopHeader = () => {
      return (
        <header
          className="py-3 px-3 border-bottom d-flex justify-content-between"
          style={PositionParent}
        >
          <Link
            to={'/profile/' + this.props.match.params.id}
            className=""
            style={BlackLink}
          >
            キャンセル
          </Link>
          <span style={Title} className="text-center">
            プロフィールの編集
          </span>
          <button className="text-right bg-white p-0" style={Submit}>
            完了
          </button>
        </header>
      );
    };
    return (
      <div>
        {<TopHeader></TopHeader>}
        <div className="mt-3 text-center border-bottom">
          <img
            src={user.avatar}
            alt="avatar"
            className="d-inline-block rounded-circle border mb-2"
            height="100px"
            width="100px"
          />
          <div style={OrangeText} className="mb-3">
            プロフィール写真の変更
          </div>
        </div>
        <div className="container">
          <div className="row pt-3">
            <div className="col">スクリーンネーム</div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                value={user.screen_name}
              />
            </div>
            <div className="col-12">
              <p>自己紹介</p>
              <textarea
                name=""
                className="form-control"
                cols="30"
                rows="5"
                style={TextArea}
              >
                {user.biography}
              </textarea>
            </div>
          </div>
        </div>

        <div className="container pb-2"></div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  match: PropTypes.object
};
