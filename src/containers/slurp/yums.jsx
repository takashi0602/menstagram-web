import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../../middleware/auth';
import { slurpYums } from '../../actions/slurpYums';
import { Loading } from '../../components/loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {
  faChevronLeftIconStyle,
  FaChevronLeftStyle,
  HeaderTitle
} from './styled';
import SlurpYumsItem from '../../components/slurp/yums';
import { TwoChoiceModal } from '../../components/modal/twoChoiceModal';
import { follow, unfollow } from '../../actions/follow';
import { Error } from '../../components/error';
import { Redirect } from 'react-router-dom';

class SlurpYumsContainer extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      showModal: false,
      userId: '',
      targetIndex: -1
    };
  }

  componentDidMount() {
    this.props.getSlurpYums(this.initSetSlurpYumsData());
  }

  goBack = () => {
    this.props.history.push(`/slurp/${this.props.match.params.id}`);
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
    this.props.slurpYums[idx].is_follow = true;
  };

  // TODO: フォローはずす
  unfollow = () => {
    const payload = {
      accessToken: this.props.accessToken,
      targetUserId: this.state.userId
    };
    this.props.unfollow(payload);
    this.props.slurpYums[this.state.targetIndex].is_follow = false;
    this.closeModal();
  };

  initSetSlurpYumsData = () => {
    const params = {
      slurp_id: this.props.match.params.id
    };
    return {
      params,
      accessToken: this.props.accessToken
    };
  };

  showSlurpYums = () => {
    if (this.props.loading && !this.props.slurpYums.length) return;
    if (!this.props.slurpYums.length) {
      return <p className="text-center">ヤムしたユーザーはいません。</p>;
    }
    return this.props.slurpYums.map((user, idx) => {
      return (
        <SlurpYumsItem
          key={idx}
          user={user}
          index={idx}
          openModal={(userId, idx) => this.openModal(userId, idx)}
          follow={(userId, idx) => this.follow(userId, idx)}
        />
      );
    });
  };

  checkErrorStatus = () => {
    if (!this.props.status) return;
    if (this.props.status === 400) return <Redirect to={'/404'} />;
    return <Error status={this.props.status} />;
  };

  render() {
    return (
      <div>
        {auth(this.props.accessToken)}
        {this.props.loading && <Loading />}
        <header className="pt-3 mb-3 border-bottom">
          <div className="position-relative mb-3">
            <FaChevronLeftStyle onClick={this.goBack}>
              <FontAwesomeIcon
                icon={faChevronLeft}
                style={faChevronLeftIconStyle}
              />
            </FaChevronLeftStyle>
            <HeaderTitle>ヤムしたユーザー</HeaderTitle>
          </div>
        </header>
        <div className="c-container__padding">
          {this.checkErrorStatus()}
          <ul className="pl-0">{this.showSlurpYums()}</ul>
        </div>
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

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    status: state.error.status,
    loading: state.loading.loading,
    slurpYums: state.slurpYums.slurpYums
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getSlurpYums(payload) {
      dispatch(slurpYums(payload));
    },
    follow(payload) {
      dispatch(follow(payload));
    },
    unfollow(payload) {
      dispatch(unfollow(payload));
    }
  };
}

export const SlurpYums = connect(
  mapStateToProps,
  mapDispatchToProps
)(SlurpYumsContainer);

SlurpYumsContainer.propTypes = {
  accessToken: PropTypes.string,
  status: PropTypes.number,
  loading: PropTypes.bool,
  history: PropTypes.object,
  match: PropTypes.object,
  getSlurpYums: PropTypes.func,
  slurpYums: PropTypes.array,
  follow: PropTypes.func,
  unfollow: PropTypes.func
};
