import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {
  faChevronLeftIconStyle,
  FaChevronLeftStyle,
  HeaderTitle
} from './styled';
import LikerListItem from '../../components/liker';
import {TwoChoiceModal} from "../../components/modal/twoChoiceModal";

const likers = [
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

export class Liker extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      showModal: false
    };
  }

  // TODO: history.goBack()はブラウザバックなので共有した際などは押しても遷移しない場合がある
  goBack = () => {
    this.props.history.goBack();
  };

  openModal = () => {
    this.setState({showModal: true});
  };

  closeModal = () => {
    this.setState({showModal: false});
  };

  // TODO: フォローはずす
  unfollow = () => {
    console.log('フォローをはずす');
  };

  render() {
    return (
      <div>
        <header className="pt-3 mb-3 border-bottom">
          <div className="position-relative mb-4">
            <FaChevronLeftStyle onClick={this.goBack}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={faChevronLeftIconStyle}
              />
            </FaChevronLeftStyle>
            <HeaderTitle>いいねした人</HeaderTitle>
          </div>
        </header>
        <div className="c-container__padding">
          <ul className="pl-0">
            {likers.map((user, idx) => {
              return <LikerListItem key={idx} user={user} openModal={() => this.openModal()} />;
            })}
          </ul>
        </div>
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

Liker.propTypes = {
  history: PropTypes.object
};
