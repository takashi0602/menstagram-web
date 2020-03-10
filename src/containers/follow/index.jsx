import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../../middleware/auth';
import { Loading } from '../../components/loading';
import FollowListItem from '../../components/follow';
import { FollowHeader } from '../../components/follow/header';
import { ScrollToTopOnMount } from '../../components/scroll/scrollToTopOnMount';
import { TwoChoiceModal } from '../../components/modal/twoChoiceModal';
import { followees } from '../../actions/follow/followees';
import { followers } from '../../actions/follow/followers';
import { follow, unfollow } from '../../actions/follow';
import { Error } from '../../components/error';
import { has_prop } from '../../helpers';
import { Redirect } from 'react-router-dom';

export class FollowContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowersView: true,
      showModal: false,
      userId: '',
      targetIndex: -1
    };
  }

  ToggleList = () => {
    if (this.isPathFollow()) {
      return this.showFollowees();
    }
    return this.showFollowers();
  };

  showFollowees = () => {
    if (this.props.followees.length === 0) {
      return <p className="text-center">ユーザーをフォローしていません。</p>;
    }
    return (
      <ul className="pl-0">
        {this.props.followees.map((user, idx) => {
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
  };

  showFollowers = () => {
    if (this.props.followers.length === 0) {
      return <p className="text-center">フォロワーはいません。</p>;
    }
    return (
      <ul className="pl-0">
        {this.props.followers.map((user, idx) => {
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
  };

  openModal = (userId, idx) => {
    this.setState({ showModal: true });
    this.setState({ userId: userId });
    this.setState({ targetIndex: idx });
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
    if (this.isPathFollow()) {
      this.props.followees[idx].is_follow = true;
    } else {
      this.props.followers[idx].is_follow = true;
    }
  };

  unfollow = () => {
    const payload = {
      accessToken: this.props.accessToken,
      targetUserId: this.state.userId
    };
    this.props.unfollow(payload);
    this.closeModal();
    if (this.isPathFollow()) {
      this.props.followees[this.state.targetIndex].is_follow = false;
    } else {
      this.props.followers[this.state.targetIndex].is_follow = false;
    }
  };

  isPathFollow = () => {
    return this.props.history.location.pathname.split('/')[3] === 'followee';
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

  initGetFollowees = () => {
    if (this.props.loading) return;
    if (
      this.props.followeesStatus === -1 ||
      this.props.followeesTargetUserId !== this.targetUserId()
    ) {
      this.props.getFollowees(this.initSetPayload());
    }
  };

  initGetFollowers = () => {
    if (this.props.loading) return;
    if (
      this.props.followersStatus === -1 ||
      this.props.followersTargetUserId !== this.targetUserId()
    ) {
      this.props.getFollowers(this.initSetPayload());
    }
  };

  showToggleList = () => {
    if (
      !this.props.loading ||
      !!this.props.followees.length ||
      !!this.props.followers.length
    ) {
      return (
        <div className="c-container__padding pt-3">{this.ToggleList()}</div>
      );
    }
  };

  checkErrorStatus = () => {
    if (!this.props.status) return;
    if (has_prop(this.props.errors, 'user_id')) return <Redirect to={'/404'} />;
    return (
      <div className="c-container__padding">
        <Error status={this.props.status} />
      </div>
    );
  };

  render() {
    return (
      <div>
        {auth(this.props.accessToken)}
        <ScrollToTopOnMount />
        {this.props.loading && <Loading />}
        {this.isPathFollow()
          ? this.initGetFollowees()
          : this.initGetFollowers()}
        <FollowHeader history={this.props.history} />
        {this.checkErrorStatus()}
        {this.showToggleList()}
        {this.state.showModal && (
          <TwoChoiceModal
            text={'フォローを解除しますか？'}
            buttonName={'解除する'}
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
    errors: state.error.errors,
    loading: state.loading.loading,
    followees: state.followees.followees,
    followeesStatus: state.followees.status,
    followeesTargetUserId: state.followees.targetUserId,
    followers: state.followers.followers,
    followersStatus: state.followers.status,
    followersTargetUserId: state.followers.targetUserId
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFollowees(payload) {
      dispatch(followees(payload));
    },
    getFollowers(payload) {
      dispatch(followers(payload));
    },
    follow(payload) {
      dispatch(follow(payload));
    },
    unfollow(payload) {
      dispatch(unfollow(payload));
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
  status: PropTypes.number,
  errors: PropTypes.object,
  getFollowees: PropTypes.func,
  followees: PropTypes.array,
  followeesStatus: PropTypes.number,
  followeesTargetUserId: PropTypes.string,
  getFollowers: PropTypes.func,
  followers: PropTypes.array,
  followersStatus: PropTypes.number,
  followersTargetUserId: PropTypes.string,
  follow: PropTypes.func,
  unfollow: PropTypes.func
};
