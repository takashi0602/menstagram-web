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

export class LikerContainer extends Component {
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
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  // TODO: フォローはずす
  unfollow = () => {
    console.log('フォローをはずす');
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
    if (this.props.postId !== this.props.match.params.id) {
      this.props.getLikers(this.initSetLikersData());
    }
    if (this.props.likerStatus !== -1) return;
    this.props.getLikers(this.initSetLikersData());
  };

  render() {
    return (
      <div>
        {auth(this.props.accessToken)}
        {this.props.loading && <Loading />}
        {this.initGetLikers()}
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
            {this.props.likerList.map((user, idx) => {
              return (
                <LikerListItem
                  key={idx}
                  user={user}
                  openModal={() => this.openModal()}
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
  postId: PropTypes.string
};
