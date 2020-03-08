import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { SlurpComponent } from '../../components/slurp/detail';
import { BackButton, Title, ChevronLeftIcons } from './styled';
import { ScrollToTopOnMount } from '../../components/scroll/scrollToTopOnMount';
import { connect } from 'react-redux';
import { auth } from '../../middleware/auth';
import { slurpDetail } from '../../actions/slurpDetail';
import { Loading } from '../../components/loading';
import { yum, unyum } from '../../actions/yum';
import { Error } from '../../components/error';
import { Redirect } from 'react-router-dom';
import { has_prop } from '../../helpers';

class SlurpDetailContainer extends Component {
  // TODO: history.goBack()はブラウザバックなので共有した際などは押しても遷移しない場合がある
  goBack = () => {
    this.props.history.goBack();
  };

  initSlurpDetail = () => {
    const params = {
      slurp_id: this.props.match.params.id
    };
    return {
      params,
      accessToken: this.props.accessToken
    };
  };

  initGetData = () => {
    if (!Number(this.props.match.params.id)) {
      // TODO: 404ページへ遷移する
      return;
    }
    if (
      this.props.slurpDetailStatus === -1 ||
      Number(this.props.match.params.id) !== this.props.slurpDetail.id
    ) {
      this.props.getSlurpDetail(this.initSlurpDetail());
    }
  };

  yum = () => {
    const payload = {
      accessToken: this.props.accessToken,
      slurpId: this.props.slurpDetail.id
    };
    this.props.yum(payload);
    this.props.slurpDetail.is_yum = true;
    this.props.slurpDetail.yum_count += 1;
  };

  unyum = () => {
    const payload = {
      accessToken: this.props.accessToken,
      slurpId: this.props.slurpDetail.id
    };
    this.props.unyum(payload);
    this.props.slurpDetail.is_yum = false;
    this.props.slurpDetail.yum_count -= 1;
  };

  showSlurp = () => {
    if (
      !has_prop(this.props.slurpDetail, 'images') ||
      Number(this.props.match.params.id) !== this.props.slurpDetail.id
    )
      return;
    return (
      <SlurpComponent
        slurpItem={this.props.slurpDetail}
        yum={this.yum}
        unyum={this.unyum}
      />
    );
  };

  checkErrorStatus = () => {
    if (!this.props.status) return;
    if (this.props.status === 400) return <Redirect to={'/404'} />;
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
        {this.props.loading && <Loading />}
        {!this.props.loading && this.initGetData()}
        <ScrollToTopOnMount />
        <header className="py-3 px-3 border-bottom">
          <BackButton onClick={this.goBack}>
            <FontAwesomeIcon icon={faChevronLeft} style={ChevronLeftIcons} />
          </BackButton>
          <Title>スラープ</Title>
        </header>
        {this.checkErrorStatus()}
        {this.showSlurp()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    status: state.error.status,
    loading: state.loading.loading,
    success: state.slurp.success,
    slurpDetail: state.slurpDetail.slurpDetail,
    slurpDetailStatus: state.slurpDetail.status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSlurpDetail(payload) {
      dispatch(slurpDetail(payload));
    },
    yum(payload) {
      dispatch(yum(payload));
    },
    unyum(payload) {
      dispatch(unyum(payload));
    }
  };
}

export const SlurpDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(SlurpDetailContainer);

SlurpDetailContainer.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  accessToken: PropTypes.string,
  status: PropTypes.number,
  loading: PropTypes.bool,
  getSlurpDetail: PropTypes.func,
  success: PropTypes.bool,
  slurpDetail: PropTypes.object,
  yum: PropTypes.func,
  unyum: PropTypes.func,
  slurpDetailStatus: PropTypes.number
};
