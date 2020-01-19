import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../../middleware/auth';
import { likers } from '../../actions/likers';
import { Loading } from '../../components/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {
  faChevronLeftIconStyle,
  FaChevronLeftStyle,
  HeaderTitle
} from './styled';
import LikerListItem from '../../components/liker';
import { TwoChoiceModal } from '../../components/modal/twoChoiceModal';
import { follow, unfollow } from '../../actions/follow';

export class LikerContainer extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      showModal: false,
      userId: '',
      targetIndex: -1
    };
  }

  // TODO: history.goBack()はブラウザバックなので共有した際などは押しても遷移しない場合がある
  goBack = () => {
    this.props.history.goBack();
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
    this.props.likerList[idx].is_following = true;
  };

  // TODO: フォローはずす
  unfollow = () => {
    const payload = {
      accessToken: this.props.accessToken,
      targetUserId: this.state.userId
    };
    this.props.unfollow(payload);
    this.props.likerList[this.state.targetIndex].is_following = false;
  };

  initSetLikersData = () => {
    const params = {
      post_id: this.props.match.params.id
    };
    return {
      params,
      accessToken: this.props.accessToken
    };
  };

  initGetLikers = () => {
    // stateに保持するpostIdとURLのパラメータが違うときはリクエストを発火
    if (
      this.props.postId !== this.props.match.params.id ||
      this.props.likerStatus === -1
    ) {
      this.props.getLikers(this.initSetLikersData());
    }
  };

  render() {
    return (
      <div>
        {auth(this.props.accessToken)}
        {this.props.loading && <Loading />}
        {!this.props.loading && this.initGetLikers()}
        <header className="pt-3 mb-3 border-bottom">
          <div className="position-relative mb-3">
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
            {this.props.likerList.map((user, idx) => {
              return (
                <LikerListItem
                  key={idx}
                  user={user}
                  index={idx}
                  openModal={(userId, idx) => this.openModal(userId, idx)}
                  follow={(userId, idx) => this.follow(userId, idx)}
                />
              );
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

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    status: state.error.status,
    loading: state.loading.loading,
    likerList: state.likers.likerList,
    likerStatus: state.likers.status,
    postId: state.likers.postId
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getLikers(payload) {
      dispatch(likers(payload));
    },
    follow(payload) {
      dispatch(follow(payload));
    },
    unfollow(payload) {
      dispatch(unfollow(payload));
    }
  };
}

export const Liker = connect(
  mapStateToProps,
  mapDispatchToProps
)(LikerContainer);

LikerContainer.propTypes = {
  accessToken: PropTypes.string,
  status: PropTypes.number,
  loading: PropTypes.bool,
  history: PropTypes.object,
  match: PropTypes.object,
  getLikers: PropTypes.func,
  likerList: PropTypes.array,
  likerStatus: PropTypes.number,
  postId: PropTypes.string,
  follow: PropTypes.func,
  unfollow: PropTypes.func
};
