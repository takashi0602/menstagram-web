import React, { Component } from 'react';
import { Title } from './styled';
import LikeNotices from '../../components/notification/like';
import FollowNotices from '../../components/notification/follow';
import ManageNotices from '../../components/notification/manage';
import { NotificationHeader } from '../../components/notification/header';
import PropTypes from 'prop-types';
import { ScrollToTopOnMount } from '../../components/scroll/scrollToTopOnMount';
import { TwoChoiceModal } from '../../components/modal/twoChoiceModal';

//ダミーデータ
const follows = [
  {
    id: 1,
    src_user: {
      user_id: 'menstagram',
      screen_name: 'メンスタグラム公式',
      avatar: 'https://placehold.jp/150x150.png?text=icon'
    },
    follow: {
      is_followed: true,
      created_at: '2019/11/29 22:56:15'
    }
  },
  {
    id: 1,
    src_user: {
      user_id: 'menstagraaaaam',
      screen_name: 'メンスタグラム非公式',
      avatar: 'https://placehold.jp/150x150.png?text=icon'
    },
    follow: {
      is_followed: false,
      created_at: '2019/11/29 22:56:15'
    }
  }
];

const likes = [
  {
    id: 1,
    src_user: {
      user_id: 'menstagram',
      screen_name: 'メンスタグラム公式',
      avatar: 'https://placehold.jp/150x150.png?text=icon'
    },
    post: {
      id: 1,
      image: 'https://placehold.jp/150x150.png?text=image'
    },
    like: {
      created_at: '2019/11/29 22:56:15'
    }
  },
  {
    id: 1,
    src_user: {
      user_id: 'menstagram',
      screen_name: 'メンスタグラム非公式',
      avatar: 'https://placehold.jp/150x150.png?text=icon'
    },
    post: {
      id: 1,
      image: 'https://placehold.jp/150x150.png?text=image'
    },
    like: {
      created_at: '2019/11/29 22:56:15'
    }
  }
];

const manages = [
  {
    id: 1,
    text:
      'あなたの投稿にラーメンではないラーメンではない画像が投稿されていたため,削除いたしました。',
    created_at: '2019/11/29 22:56:15'
  },
  {
    id: 2,
    text:
      'あなたの投稿にラーメンではないラーメンではない画像が投稿されていたため,削除いたしました。',
    created_at: '2019/11/29 22:56:15'
  }
];

export class Notification extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      showModal: false
    };
  }

  DataView = () => {
    const path = this.props.history.location.pathname.split('/')[2];
    if (path === 'liked') {
      return <LikeNotices notices={likes} />;
    } else if (path === 'followed') {
      return (
        <FollowNotices notices={follows} openModal={() => this.openModal()} />
      );
    } else if (path === 'system') {
      return <ManageNotices notices={manages} />;
    }
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  unfollow = () => {
    console.log('フォローをはずす');
  };

  render() {
    return (
      <div>
        <ScrollToTopOnMount />
        <Title>通知</Title>
        {
          <NotificationHeader
            pathName={this.props.history.location.pathname.split('/')[2]}
          />
        }
        {this.DataView()}
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

Notification.propTypes = {
  history: PropTypes.object
};
