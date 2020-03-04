import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
import { profile, clearProfile } from '../../actions/profile';
import { profileEdit, failProfileEdit } from '../../actions/profileEdit';
import { connect } from 'react-redux';
import { Loading } from '../../components/loading';
import { Error } from '../../components/error';
import { ErrorMessage } from '../../components/error/badRequest';
import { has_prop } from '../../helpers';

class ProfileEditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newImage: [],
      errorFileFormat: false,
      userName: '',
      biography: '',
      errorUserName: false,
      errorBiography: false,
      changeUserName: false,
      changeBiography: false
    };
  }

  TopHeader = () => {
    return (
      <PositionParent>
        <Link to={`/user/${this.props.match.params.id}`} style={blackLink}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <Title>プロフィールの編集</Title>
        {this.showSubmitButton()}
      </PositionParent>
    );
  };

  showSubmitButton = () => {
    if (
      this.state.errorUserName ||
      this.state.errorBiography ||
      (!this.state.changeUserName && !this.state.changeBiography)
    )
      return <Submit className="c-link__lightgray">完了</Submit>;
    return <Submit onClick={this.requestEditProfile}>完了</Submit>;
  };

  showUserImage = () => {
    if (this.state.newImage.length !== 0) return this.returnNewImage();
    if (!!this.props.profile && this.props.profile.avatar)
      return (
        <UserImage
          style={{ backgroundImage: `url(${this.props.profile.avatar})` }}
        />
      );
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

  // TODO: プロフィール画像も編集可能にする
  requestEditProfile = () => {
    const payload = {
      accessToken: this.props.accessToken,
      profile: {
        userName: this.state.changeUserName
          ? this.state.userName
          : this.props.profile.user_name,
        biography: this.state.changeBiography
          ? this.state.biography
          : this.props.profile.biography
      },
      userId: this.props.match.params.id
    };
    this.props.profileEdit(payload);
  };

  initGetProfile = () => {
    if (!this.props.profile || this.props.profileStatus !== -1) return;
    this.props.getProfile(this.initSetProfileData());
  };

  initSetProfileData = () => {
    const params = { user_id: this.props.match.params.id };
    return {
      params,
      accessToken: this.props.accessToken
    };
  };

  isMe = () => {
    if (!this.props.profile && !this.props.profile.is_me)
      return <Redirect to={`/user/${this.props.match.params.id}`} />;
  };

  getDefaultValue = name => {
    if (!this.props.profile) return '';
    return this.props.profile[name];
  };

  changeUserName = e => {
    this.setState({
      errorUserName: false,
      changeUserName: true
    });
    this.setState({ userName: e.target.value });
    this.validationMaxLength('UserName', e.target.value.length, 16);
  };

  changeBiography = e => {
    this.setState({
      errorBiography: false,
      changeBiography: true
    });
    this.setState({ biography: e.target.value });
    this.validationMaxLength('Biography', e.target.value.length, 128);
  };

  validationMaxLength = (name, targetLength, length) => {
    if (targetLength > length) {
      this.setState({ [`error${name}`]: true });
    }
    if (name === 'UserName' && targetLength === 0) {
      this.setState({ userName: true });
    }
  };

  getErrorMessage = key => {
    if (this.state.errorUserName && key === 'userName') {
      return <p className="text-danger">ユーザーネームは1〜16文字の範囲で指定してください。</p>;
    }
    if (this.state.errorBiography && key === 'biography') {
      return <p className="text-danger">自己紹介は128文字以下で指定してください。</p>;
    }
  };

  checkErrorStatus = () => {
    if (!this.props.status) return;
    if (has_prop(this.props.errors, 'user_id')) return <Redirect to={'/404'} />;
    return <Error status={this.props.status} />
  };

  render() {
    return (
      <div>
        {this.isMe()}
        {this.props.loading && <Loading />}
        {!this.props.loading && this.initGetProfile()}
        {this.TopHeader()}
        <div className="pt-3 mb-3 text-center border-bottom">
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
          {this.checkErrorStatus()}
          <div className="mb-3">
            <div className="d-flex align-items-center">
              <ItemLabel>ユーザーネーム</ItemLabel>
              <input
                type="text"
                className="c-form"
                defaultValue={this.getDefaultValue('user_name')}
                onChange={e => {
                  this.changeUserName(e);
                }}
              />
            </div>
            {this.getErrorMessage('userName')}
            <ErrorMessage errors={this.props.errors} keyName="user_name" />
          </div>
          <div>
            <label>自己紹介</label>
            <textarea
              className="c-form__textArea"
              defaultValue={this.getDefaultValue('biography')}
              onChange={e => {
                this.changeBiography(e);
              }}
            />
          </div>
          {this.getErrorMessage('biography')}
          <ErrorMessage errors={this.props.errors} keyName="biography" />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    status: state.error.status,
    errors: state.error.errors,
    loading: state.loading.loading,
    profileStatus: state.profile.profileStatus,
    profile: state.profile.profile,
    profileEditSuccess: state.profileEdit.success
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getProfile(payload) {
      dispatch(profile(payload));
    },
    profileEdit(payload) {
      dispatch(profileEdit(payload));
    },
    clearProfile() {
      dispatch(clearProfile());
    },
    clearProfileEdit() {
      dispatch(failProfileEdit());
    }
  };
}

export const ProfileEdit = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileEditContainer);

ProfileEditContainer.propTypes = {
  match: PropTypes.object,
  accessToken: PropTypes.string,
  history: PropTypes.object,
  status: PropTypes.number,
  errors: PropTypes.object,
  profileStatus: PropTypes.number,
  profile: PropTypes.object,
  getProfile: PropTypes.func,
  profileEdit: PropTypes.func,
  loading: PropTypes.bool,
  profileEditSuccess: PropTypes.bool,
  clearProfile: PropTypes.func,
  clearProfileEdit: PropTypes.func
};
