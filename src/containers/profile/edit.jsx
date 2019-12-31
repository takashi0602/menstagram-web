import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Submit,
  blackLink,
  Title,
  PositionParent,
  OrangeText,
  ItemLabel,
  UserImage,
  userIcon
} from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faUser } from '@fortawesome/free-solid-svg-icons';

const user = {
  id: 1,
  user_id: 'menstagram',
  avatar: '',
  screen_name: 'メンスタグラム公式',
  posted: 10,
  following: 10,
  followed: 10,
  is_followed: false,
  biography:
    'user_information. user_information. user_information. user_information.'
};

export class ProfileEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newImage: [],
      errorFileFormat: false
    };
  }
  TopHeader = () => {
    return (
      <PositionParent>
        <Link
          to={'/profile/' + this.props.match.params.id}
          className=""
          style={blackLink}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <Title>プロフィールの編集</Title>
        <Submit>完了</Submit>
      </PositionParent>
    );
  };

  showUserImage = () => {
    if (this.state.newImage.length !== 0) return this.returnNewImage();
    if (user.avatar)
      return <UserImage style={{ backgroundImage: `url(${user.avatar})` }} />;
    return (
      <UserImage>
        <FontAwesomeIcon icon={faUser} style={userIcon} />
      </UserImage>
    );
  };

  returnNewImage = () => {
    const createObjectURL =
      (window.URL || window.webkitURL).createObjectURL ||
      window.createObjectURL;
    return (
      <UserImage
        style={{
          backgroundImage: `url('${createObjectURL(this.state.newImage)}')`
        }}
      />
    );
  };

  setNewImage = e => {
    this.setState({ errorFileFormat: false });
    if (e.target.files && !e.target.files[0].type.startsWith('image')) {
      this.setState({ errorFileFormat: true });
      return;
    }
    this.setState({ newImage: e.target.files[0] });
  };

  render() {
    return (
      <div>
        {this.TopHeader()}
        <div className="mt-3 text-center border-bottom">
          {this.showUserImage()}
          <div className="text-center">
            {/*TODO: プロフィール画像変更APIが完成次第に実装*/}
            <OrangeText htmlFor="profileImage" className="c-link__lightgray">
              プロフィール写真の変更
            </OrangeText>
            {/*<input*/}
            {/*id="profileImage"*/}
            {/*type="file"*/}
            {/*className="d-none"*/}
            {/*accept="image/*"*/}
            {/*multiple*/}
            {/*onChange={e => {*/}
            {/*this.setNewImage(e);*/}
            {/*}}*/}
            {/*/>*/}
            {this.state.errorFileFormat && (
              <p className="text-danger">画像を選択してください。</p>
            )}
          </div>
        </div>
        <div className="c-container__padding">
          <div className="d-flex pt-3 align-items-center">
            <ItemLabel>スクリーンネーム</ItemLabel>
            <input
              type="text"
              className="c-form"
              defaultValue={user.screen_name}
            />
          </div>
          <div>
            <label>自己紹介</label>
            <textarea
              className="c-form__textArea"
              defaultValue={user.biography}
            />
          </div>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  match: PropTypes.object
};
