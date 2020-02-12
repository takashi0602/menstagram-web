import React, { Component } from 'react';
import { Title } from './styled';
import YumsNotices from '../../components/notification/yums';
import FollowNotices from '../../components/notification/follow';
import SystemNotices from '../../components/notification/system';
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
      user_name: 'メンスタグラム公式',
      avatar: 'https://placehold.jp/150x150.png?text=icon'
    },
    follow: {
      is_followed: true,
      created_at: '2019/11/29 22:56:15'
    }
  },
  {
    id: 2,
    src_user: {
      user_id: 'menstagraaaaam',
      user_name: 'メンスタグラム非公式',
      avatar: 'https://placehold.jp/150x150.png?text=icon'
    },
    follow: {
      is_followed: false,
      created_at: '2019/11/29 22:56:15'
    }
  }
];

const yums = [
  {
    id: 1,
    src_user: {
      user_id: 'menstagram',
      user_name: 'メンスタグラム公式',
      avatar: 'https://placehold.jp/150x150.png?text=icon'
    },
    slurp: {
      id: 1,
      image: 'https://placehold.jp/150x150.png?text=image'
    },
    yum: {
      created_at: '2019/11/29 22:56:15'
    }
  },
  {
    id: 2,
    src_user: {
      user_id: 'menstagram',
      user_name: 'メンスタグラム非公式',
      avatar: 'https://placehold.jp/150x150.png?text=icon'
    },
    slurp: {
      id: 1,
      image: 'https://placehold.jp/150x150.png?text=image'
    },
    yum: {
      created_at: '2019/11/29 22:56:15'
    }
  }
];

const systems = [
  {
    id: 1,
    text:
      'あなたのスラープにラーメンではない画像が含まれていたため、削除致しました。',
    created_at: '2019/11/29 22:56:15'
  },
  {
    id: 2,
    text:
      'あなたのスラープにラーメンではない画像が含まれていたため、削除致しました。',
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
    if (path === 'yummed') {
      return <YumsNotices notices={yums} />;
    } else if (path === 'followed') {
      return (
        <FollowNotices notices={follows} openModal={() => this.openModal()} />
      );
    } else if (path === 'system') {
      return <SystemNotices notices={systems} />;
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
            text={'フォローを解除しますか？'}
            buttonName={'解除する'}
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
