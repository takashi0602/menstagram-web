import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
  PostImage,
  imagesIcon,
  UserImage,
  userIcon,
  Item
} from './styled';
import { logout } from '../../actions/auth/logout';
import { profilePosts } from '../../actions/profilePosts';
import { connect } from 'react-redux';
import { auth } from '../../middleware/auth';
import { Loading } from '../../components/loading';
import { Error } from '../../components/error';
import { TwoChoiceModal } from '../../components/modal/twoChoiceModal';
import { ScrollToTopOnMount } from '../../components/scroll/scrollToTopOnMount';
import { follow, unfollow } from '../../actions/follow';
import { clearFollowing } from '../../actions/follow/following';
import { clearFollowed } from '../../actions/follow/followed';

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
    } else if (this.props.profile.is_followed) {
      return (
        <button
          type="button"
          className="c-button__white w-100"
          onClick={this.openUnfollowModal}
        >
          フォロー中
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

  PostsTileView = () => {
    if (this.props.posts.length > 0) {
      return (
        <div className="row m-0">
          {this.props.posts.map((post, idx) => {
            return (
              <Link
                key={idx}
                to={`/post/${post.id}`}
                className="col-4 p-1 position-relative"
              >
                <PostImage src={post.images[0]} alt="post" />
                {post.images.length !== 1 && (
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
          <p className="m-0">まだ投稿していません。</p>
          <p>ラーメンを投稿してみましょう。</p>
          <Link to="/post">ラーメンを投稿する</Link>
        </div>
      );
    } else {
      return (
        <div className="c-container__padding pt-2">
          <p className="m-0">投稿はありません。</p>
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

  initSetUserPosts = () => {
    const params = { user_id: this.props.match.params.id };
    return {
      params,
      accessToken: this.props.accessToken
    };
  };

  initGetProfilePosts = () => {
    if (
      this.props.match.params.id !== this.props.profile.user_id ||
      this.props.postsStatus === -1
    ) {
      this.props.getProfilePosts(this.initSetUserPosts());
    }
  };

  follow = () => {
    const payload = {
      accessToken: this.props.accessToken,
      targetUserId: this.props.profile.user_id
    };
    this.props.follow(payload);
    // TODO: api通信後にプロフィール取得 or 200が返ってきた段階でtrueにする
    this.props.profile.is_followed = true;
  };

  unfollow = () => {
    const payload = {
      accessToken: this.props.accessToken,
      targetUserId: this.props.profile.user_id
    };
    this.props.unfollow(payload);
    this.closeUnfollowModal();
    // TODO: api通信後にプロフィール取得 or 200が返ってきた段階でfalseにする
    this.props.profile.is_followed = false;
  };

  openUnfollowModal = () => {
    this.setState({ showUnfollowModal: true });
  };

  closeUnfollowModal = () => {
    this.setState({ showUnfollowModal: false });
  };

  initFollowingOrFollowed = () => {
    if (this.props.followingStatus !== -1) {
      this.props.clearFollowing();
    }
    if (this.props.followedStatus !== -1) {
      this.props.clearFollowed();
    }
  };

  render() {
    return (
      <div>
        {auth(this.props.accessToken)}
        <ScrollToTopOnMount />
        {this.props.loading && <Loading />}
        {!this.props.loading && this.initGetProfilePosts()}
        {this.initFollowingOrFollowed()}
        {this.TopHeader()}
        {this.props.status && <Error status={this.props.status} />}
        <div className="text-center">
          {this.showUserImage()}
          <UserName>{this.props.profile.screen_name}</UserName>
          <UserId>{this.props.profile.user_id}</UserId>
        </div>
        <div className="mb-2 border-bottom">
          <div className="d-flex justify-content-around mb-2">
            <Item>
              <div className="text-center mb-0">
                {this.props.profile.posted}
              </div>
              <div className="text-center">投稿</div>
            </Item>
            <Item>
              <Link
                to={`/user/${this.props.profile.user_id}/followed`}
                className="c-link__black"
              >
                <div className="text-center mb-0">
                  {this.props.profile.followed}
                </div>
                <div className="text-center">フォロワー</div>
              </Link>
            </Item>
            <Item>
              <Link
                to={`/user/${this.props.profile.user_id}/following`}
                className="c-link__black"
              >
                <div className="text-center mb-0">
                  {this.props.profile.following}
                </div>
                <div className="text-center">フォロー</div>
              </Link>
            </Item>
          </div>
          <div className="c-container__padding mb-3">
            <Biography>{this.props.profile.biography}</Biography>
            {this.ControlButton()}
          </div>
        </div>
        {this.PostsTileView()}
        {this.state.showUnfollowModal && (
          <TwoChoiceModal
            text={'フォローをはずしますか？'}
            buttonName={'はずす'}
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
    postsStatus: state.profilePosts.status,
    posts: state.profilePosts.posts,
    followingStatus: state.following.followingStatus,
    followedStatus: state.followed.followedStatus
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout(payload) {
      dispatch(logout(payload));
    },
    getProfilePosts(payload) {
      dispatch(profilePosts(payload));
    },
    follow(payload) {
      dispatch(follow(payload));
    },
    unfollow(payload) {
      dispatch(unfollow(payload));
    },
    clearFollowing() {
      dispatch(clearFollowing());
    },
    clearFollowed() {
      dispatch(clearFollowed());
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
  postsStatus: PropTypes.number,
  profile: PropTypes.object,
  posts: PropTypes.array,
  logout: PropTypes.func,
  getProfilePosts: PropTypes.func,
  loading: PropTypes.bool,
  follow: PropTypes.func,
  unfollow: PropTypes.func,
  followingStatus: PropTypes.number,
  followedStatus: PropTypes.number,
  clearFollowing: PropTypes.func,
  clearFollowed: PropTypes.func
};
