import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faImages,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { HamMenu } from '../../components/hamMenu';
import {
  BackButton,
  ChevronLeftIcons,
  UserName,
  UserId,
  Biography,
  SlurpImage,
  imagesIcon,
  UserImage,
  userIcon,
  Item
} from './styled';
import { logout } from '../../actions/auth/logout';
import { profileSlurps } from '../../actions/profileSlurps';
import { connect } from 'react-redux';
import { auth } from '../../middleware/auth';
import { Loading } from '../../components/loading';
import { Error } from '../../components/error';
import { TwoChoiceModal } from '../../components/modal/twoChoiceModal';
import { ScrollToTopOnMount } from '../../components/scroll/scrollToTopOnMount';
import { follow, unfollow } from '../../actions/follow';
import { clearFollowees } from '../../actions/follow/followees';
import { clearFollowers } from '../../actions/follow/followers';
import { appearance } from '../../helpers';

class ProfileContainer extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      isFollowersView: true,
      showLogoutModal: false,
      showUnfollowModal: false
    };
  }

  TopHeader = () => {
    return (
      <header className="py-3 pl-3 d-flex justify-content-between">
        <BackButton onClick={this.goBack}>
          <FontAwesomeIcon icon={faChevronLeft} style={ChevronLeftIcons} />
        </BackButton>
        {this.HamMenuButton()}
      </header>
    );
  };
  HamMenuButton = () => {
    if (!this.props.profile.is_me) return;
    const menuItems = [
      {
        label: '問題の報告',
        path: 'https://forms.gle/FeK1F9dinHAS6LoB8',
        targetBlank: true
      }
    ];
    return (
      <HamMenu menuItems={menuItems} logout={() => this.openLogoutModal()} />
    );
  };

  ControlButton = () => {
    if (this.props.profile.is_me) {
      return (
        <button type="button" className="c-button__white px-0 w-100">
          <Link
            to={`/user/${this.props.match.params.id}/edit`}
            className="d-inline-block w-100 c-link__gray"
          >
            プロフィールの編集
          </Link>
        </button>
      );
    } else if (this.props.profile.is_follow) {
      return (
        <button
          type="button"
          className="c-button__white w-100"
          onClick={this.openUnfollowModal}
        >
          フォロー解除
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="c-button__orange w-100"
          onClick={this.follow}
        >
          フォローする
        </button>
      );
    }
  };

  showSlurps = () => {
    if (this.props.slurps.length > 0) {
      return (
        <div className="row m-0">
          {this.props.slurps.map((slurp, idx) => {
            return (
              <Link
                key={idx}
                to={`/slurp/${slurp.id}`}
                className="col-4 p-1 position-relative"
              >
                <SlurpImage src={slurp.images[0]} alt="slurp" />
                {slurp.images.length !== 1 && (
                  <FontAwesomeIcon icon={faImages} style={imagesIcon} />
                )}
              </Link>
            );
          })}
        </div>
      );
    } else if (this.props.profile.is_me) {
      return (
        <div className="c-container__padding pt-2">
          <p className="m-0">まだスラープしていません。</p>
          <p>ラーメンをスラープしてみましょう。</p>
          <Link to="/slurp">ラーメンをスラープする</Link>
        </div>
      );
    } else {
      return (
        <div className="c-container__padding pt-2">
          <p className="m-0">スラープはありません。</p>
        </div>
      );
    }
  };

  showUserImage = () => {
    if (this.props.profile.avatar)
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

  // TODO: history.goBack()はブラウザバックなので共有した際などは押しても遷移しない場合がある
  goBack = () => {
    this.props.history.goBack();
  };

  logout = () => {
    const payload = {
      accessToken: this.props.accessToken,
      userId: this.props.userId
    };
    this.props.logout(payload);
  };

  openLogoutModal = () => {
    this.setState({ showLogoutModal: true });
  };

  closeLogoutModal = () => {
    this.setState({ showLogoutModal: false });
  };

  initSetProfileSlurps = () => {
    const params = { user_id: this.props.match.params.id };
    return {
      params,
      accessToken: this.props.accessToken
    };
  };

  initGetProfileSlurps = () => {
    if (
      this.props.match.params.id !== this.props.profile.user_id ||
      this.props.slurpsStatus === -1
    ) {
      this.props.getProfileSlurps(this.initSetProfileSlurps());
    }
  };

  follow = () => {
    const payload = {
      accessToken: this.props.accessToken,
      targetUserId: this.props.profile.user_id
    };
    this.props.follow(payload);
    // TODO: api通信後にプロフィール取得 or 200が返ってきた段階でtrueにする
    this.props.profile.is_follow = true;
  };

  unfollow = () => {
    const payload = {
      accessToken: this.props.accessToken,
      targetUserId: this.props.profile.user_id
    };
    this.props.unfollow(payload);
    this.closeUnfollowModal();
    // TODO: api通信後にプロフィール取得 or 200が返ってきた段階でfalseにする
    this.props.profile.is_follow = false;
  };

  openUnfollowModal = () => {
    this.setState({ showUnfollowModal: true });
  };

  closeUnfollowModal = () => {
    this.setState({ showUnfollowModal: false });
  };

  initFolloweesOrFollowers = () => {
    if (this.props.followeesStatus !== -1) {
      this.props.clearFollowees();
    }
    if (this.props.followersStatus !== -1) {
      this.props.clearFollowers();
    }
  };

  checkErrorStatus = () => {
    if (!this.props.status) return;
    if (this.props.status === 400) return <Redirect to={'/404'} />;
    return <Error status={this.props.status} />;
  };

  render() {
    return (
      <div>
        {auth(this.props.accessToken)}
        <ScrollToTopOnMount />
        {this.props.loading && <Loading />}
        {!this.props.loading && this.initGetProfileSlurps()}
        {this.initFolloweesOrFollowers()}
        {this.TopHeader()}
        {this.checkErrorStatus()}
        <div className="text-center">
          {this.showUserImage()}
          <UserName>{this.props.profile.user_name}</UserName>
          <UserId>{this.props.profile.user_id}</UserId>
        </div>
        <div className="mb-2 border-bottom">
          <div className="d-flex justify-content-around mb-2">
            <Item>
              <div className="text-center mb-0">
                {this.props.profile.slurp_count}
              </div>
              <div className="text-center">スラープ</div>
            </Item>
            <Item>
              <Link
                to={`/user/${this.props.profile.user_id}/follower`}
                className="c-link__black"
              >
                <div className="text-center mb-0">
                  {this.props.profile.follower_count}
                </div>
                <div className="text-center">フォロワー</div>
              </Link>
            </Item>
            <Item>
              <Link
                to={`/user/${this.props.profile.user_id}/followee`}
                className="c-link__black"
              >
                <div className="text-center mb-0">
                  {this.props.profile.follow_count}
                </div>
                <div className="text-center">フォロイー</div>
              </Link>
            </Item>
          </div>
          <div className="c-container__padding mb-3">
            {this.props.profile.biography && (
              <Biography
                dangerouslySetInnerHTML={{
                  __html: appearance(this.props.profile.biography)
                }}
              />
            )}
            {this.ControlButton()}
          </div>
        </div>
        {this.showSlurps()}
        {this.state.showUnfollowModal && (
          <TwoChoiceModal
            text={'フォローを解除しますか？'}
            buttonName={'解除する'}
            closeModal={() => this.closeUnfollowModal()}
            submit={() => this.unfollow()}
          />
        )}
        {this.state.showLogoutModal && (
          <TwoChoiceModal
            text={'ログアウトしますか？'}
            buttonName={'ログアウト'}
            closeModal={() => this.closeLogoutModal()}
            submit={() => this.logout()}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    userId: state.auth.userId,
    status: state.error.status,
    loading: state.loading.loading,
    profileStatus: state.profile.profileStatus,
    profile: state.profile.profile,
    slurpsStatus: state.profileSlurps.status,
    slurps: state.profileSlurps.slurps,
    followeesStatus: state.followees.status,
    followersStatus: state.followers.status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout(payload) {
      dispatch(logout(payload));
    },
    getProfileSlurps(payload) {
      dispatch(profileSlurps(payload));
    },
    follow(payload) {
      dispatch(follow(payload));
    },
    unfollow(payload) {
      dispatch(unfollow(payload));
    },
    clearFollowees() {
      dispatch(clearFollowees());
    },
    clearFollowers() {
      dispatch(clearFollowers());
    }
  };
}

export const Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);

ProfileContainer.propTypes = {
  match: PropTypes.object,
  accessToken: PropTypes.string,
  userId: PropTypes.string,
  history: PropTypes.object,
  status: PropTypes.number,
  profileStatus: PropTypes.number,
  slurpsStatus: PropTypes.number,
  profile: PropTypes.object,
  slurps: PropTypes.array,
  logout: PropTypes.func,
  getProfileSlurps: PropTypes.func,
  loading: PropTypes.bool,
  follow: PropTypes.func,
  unfollow: PropTypes.func,
  followeesStatus: PropTypes.number,
  followersStatus: PropTypes.number,
  clearFollowees: PropTypes.func,
  clearFollowers: PropTypes.func
};
