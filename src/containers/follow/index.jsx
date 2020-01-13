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

export class FollowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowersView: true,
      showModal: false
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
                user={user}
                openModal={() => this.openModal()}
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
                user={user}
                openModal={() => this.openModal()}
              />
            );
          })}
        </ul>
      );
    }
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  // TODO: フォローはずす
  unfollow = () => {
    console.log('フォローをはずす');
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
            submit={() => this.unfollow()}
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
  followedTargetUserId: PropTypes.string
};
