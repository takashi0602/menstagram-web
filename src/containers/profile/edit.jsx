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
  TopHeader = () => {
    return (
      <PositionParent>
        <Link
          to={'/profile/' + this.props.match.params.id}
          className=""
          style={BlackLink}
        >
          キャンセル
        </Link>
        <Title>
          プロフィールの編集
        </Title>
        <Submit>
          完了
        </Submit>
      </PositionParent>
    );
  };

  user = {
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

  render() {
    return (
      <div>
        {this.TopHeader()}
        <div className="mt-3 text-center border-bottom">
          <img
            src={this.user.avatar}
            alt="avatar"
            className="d-inline-block rounded-circle border mb-2"
            height="100px"
            width="100px"
          />
          <OrangeText>プロフィール写真の変更</OrangeText>
        </div>
        <div className="container">
          <div className="row pt-3">
            <div className="col">スクリーンネーム</div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                defaultValue={this.user.screen_name}
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
                defaultValue={this.user.biography}
              />
            </div>
          </div>
        </div>

        <div className="container pb-2" />
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  match: PropTypes.object
};
