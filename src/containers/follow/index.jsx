import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FollowListItem from '../../components/follow';
import { FollowHeader } from '../../components/follow/header';
import { ScrollToTopOnMount } from '../../components/scroll/scrollToTopOnMount';
import { TwoChoiceModal } from '../../components/modal/twoChoiceModal';

const followers = [
  {
    user_id: 'mensta',
    screen_name: 'メンスタグラム公式',
    avatar:
      'https://placehold.jp/150x150.png?text=%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3',
    is_followed: false
  },
  {
    user_id: 'menstaaaa',
    screen_name: 'メンスタグラム非公式',
    avatar:
      'https://placehold.jp/150x150.png?text=%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3',
    is_followed: true
  }
];

const follows = [
  {
    user_id: 'menstaaaa',
    screen_name: 'メンスタグラム非公式',
    avatar:
      'https://placehold.jp/150x150.png?text=%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3',
    is_followed: true
  }
];

export class Follow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFollowersView: true,
      showModal: false
    };
  }

  ToggleList = () => {
    if (this.props.history.location.pathname.split('/')[1] === 'followed') {
      return (
        <ul className="pl-0">
          {followers.map((user, idx) => {
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
          {follows.map((user, idx) => {
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

  render() {
    return (
      <div>
        <ScrollToTopOnMount />
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

Follow.propTypes = {
  history: PropTypes.object
};
