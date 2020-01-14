import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../../middleware/auth';
import { Loading } from '../../components/loading';
import FollowListItem from '../../components/follow';
import { FollowHeader } from '../../components/follow/header';
import { ScrollToTopOnMount } from '../../components/scroll/scrollToTopOnMount';
import { TwoChoiceModal } from '../../components/modal/twoChoiceModal';
import { following } from '../../actions/follow/following';
import { followed } from '../../actions/follow/followed';
import { follow, unfollow } from '../../actions/follow';

export class FollowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowersView: true,
      showModal: false,
      userId: false,
      targetIndex: -1
    };
  }

  ToggleList = () => {
    if (this.isPathFollowing()) {
      return (
        <ul className="pl-0">
          {this.props.followingList.map((user, idx) => {
            return (
              <FollowListItem
                key={idx}
                index={idx}
                user={user}
                openModal={(userId, idx) => this.openModal(userId, idx)}
                follow={(userId, idx) => this.follow(userId, idx)}
              />
            );
          })}
        </ul>
      );
    } else {
      return (
        <ul className="pl-0">
          {this.props.followedList.map((user, idx) => {
            return (
              <FollowListItem
                key={idx}
                index={idx}
                user={user}
                openModal={(userId, idx) => this.openModal(userId, idx)}
                follow={(userId, idx) => this.follow(userId, idx)}
              />
            );
          })}
        </ul>
      );
    }
  };

  openModal = (userId, idx) => {
    this.setState({ showModal: true });
    this.setState({ userId: userId });
    this.setState({ targetIndex: idx })
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  follow = (userId, idx) => {
    const payload = {
      accessToken: this.props.accessToken,
      targetUserId: userId
    };
    this.props.follow(payload);
    if (this.isPathFollowing()) {
      this.props.followingList[idx].is_following = true;
    } else {
      this.props.followedList[idx].is_following = true;
    }
  };

  unfollow = () => {
    const payload = {
      accessToken: this.props.accessToken,
      targetUserId: this.state.userId
    };
    this.props.unfollow(payload);
    this.closeModal();
    if (this.isPathFollowing()) {
      this.props.followingList[this.state.targetIndex].is_following = false;
    } else {
      this.props.followedList[this.state.targetIndex].is_following = false;
    }
  };

  isPathFollowing = () => {
    return this.props.history.location.pathname.split('/')[1] === 'following';
  };

  targetUserId = () => {
    return this.props.history.location.pathname.split('/')[2];
  };

  initSetPayload = () => {
    const params = {
      user_id: this.props.match.params.id
    };
    return {
      params,
      accessToken: this.props.accessToken
    };
  };

  initGetFollowing = () => {
    if (
      this.props.followingStatus === -1 ||
      this.props.followingTargetUserId !== this.targetUserId()
    ) {
      this.props.getFollowing(this.initSetPayload());
    }
  };

  initGetFollowed = () => {
    if (
      this.props.followedStatus === -1 ||
      this.props.followedTargetUserId !== this.targetUserId()
    ) {
      this.props.getFollowed(this.initSetPayload());
    }
  };

  render() {
    return (
      <div>
        {auth(this.props.accessToken)}
        <ScrollToTopOnMount />
        {this.props.loading && <Loading />}
        {this.isPathFollowing()
          ? this.initGetFollowing()
          : this.initGetFollowed()}
        {<FollowHeader history={this.props.history} />}
        <div className="c-container__padding pt-3">{this.ToggleList()}</div>
        {this.state.showModal && (
          <TwoChoiceModal
            text={'フォローをはずしますか？'}
            buttonName={'はずす'}
            closeModal={() => this.closeModal()}
            submit={userId => this.unfollow(userId)}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    status: state.error.status,
    loading: state.loading.loading,
    followingList: state.following.followingList,
    followingStatus: state.following.followingStatus,
    followingTargetUserId: state.following.targetUserId,
    followedList: state.followed.followedList,
    followedStatus: state.followed.followedStatus,
    followedTargetUserId: state.followed.followedTargetUserId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFollowing(payload) {
      dispatch(following(payload));
    },
    getFollowed(payload) {
      dispatch(followed(payload));
    },
    follow(payload) {
      dispatch(follow(payload))
    },
    unfollow(payload) {
      dispatch(unfollow(payload))
    }
  };
}

export const Follow = connect(
  mapStateToProps,
  mapDispatchToProps
)(FollowContainer);

FollowContainer.propTypes = {
  accessToken: PropTypes.string,
  history: PropTypes.object,
  match: PropTypes.object,
  loading: PropTypes.bool,
  getFollowing: PropTypes.func,
  followingList: PropTypes.array,
  followingStatus: PropTypes.number,
  followingTargetUserId: PropTypes.string,
  getFollowed: PropTypes.func,
  followedList: PropTypes.array,
  followedStatus: PropTypes.number,
  followedTargetUserId: PropTypes.string,
  follow: PropTypes.func,
  unfollow: PropTypes.func
};
