import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../../middleware/auth';
import { YumsItem } from '../../components/yums';
import { yums } from '../../actions/yums';
import { Loading } from '../../components/loading';
import { Reload, BackToTop } from './styled';
import { Error } from '../../components/error';
import { Scroll } from '../../components/scroll';
import { ScrollToTopOnMount } from '../../components/scroll/scrollToTopOnMount';
import { yum, unyum } from '../../actions/yum';
import { Redirect } from 'react-router-dom';

class YumsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notYumsMessage: 'まだヤムはされていません。',
      showBackToTop: false,
      scrollValue: 0
    };
  }

  initSetYumsData = () => {
    const params = {};
    return {
      params,
      accessToken: this.props.accessToken,
      slurpList: []
    };
  };

  setYumsData = (params, slurpList) => {
    return {
      params,
      accessToken: this.props.accessToken,
      slurpList
    };
  };

  initGetYums = () => {
    if (this.props.yumsStatus !== -1) return;
    this.props.getYums(this.initSetYumsData());
  };

  getYums = (params, slurpList) => {
    this.props.getYums(this.setYumsData(params, slurpList));
  };

  showSlurpItems = () => {
    if (this.props.yums.length === 0)
      return (
        <div>
          <Reload onClick={this.getUpdateYums}>更新する</Reload>
          <p className="pt-3 px-3 text-center">{this.state.notYumsMessage}</p>
        </div>
      );
    return this.props.yums.map((item, idx) => this.getYumsItem(item, idx));
  };

  getOldYums = () => {
    const params = {
      slurp_id: this.props.yums[this.props.yums.length - 1].id,
      type: 'old'
    };
    this.getYums(params, this.props.yums);
  };

  getUpdateYums = () => {
    this.getYums({}, this.props.yums);
  };

  showReloadBar = (text, getYums) => {
    if (this.props.yums.length === 0) return;
    return <Reload onClick={getYums}>{text}</Reload>;
  };

  setScrollTop = () => {
    let scrollValue = this.state.scrollValue;
    let scrollSmallValue = this.state.scrollValue / 10;
    setTimeout(function scrollAnimation() {
      if (scrollValue > 0) {
        scrollValue -= scrollSmallValue;
        window.scrollTo(0, scrollValue);
        setTimeout(scrollAnimation, 10);
      }
    }, 100);
  };

  handleScroll = scrollTop => {
    this.setState({ scrollValue: scrollTop });
    if (!this.state.showBackToTop && scrollTop > 100)
      this.setState({ showBackToTop: true });
    else if (this.state.showBackToTop && scrollTop <= 100)
      this.setState({ showBackToTop: false });
  };

  // TODO: ヤム機能の改善
  yum = (slurpId, idx) => {
    const payload = {
      accessToken: this.props.accessToken,
      slurpId: slurpId
    };
    this.props.yum(payload);
    this.props.yums[idx].is_yum = true;
    this.props.yums[idx].yum_count += 1;
  };

  unyum = (slurpId, idx) => {
    const payload = {
      accessToken: this.props.accessToken,
      slurpId: slurpId
    };
    this.props.unyum(payload);
    this.props.yums[idx].is_yum = false;
    this.props.yums[idx].yum_count -= 1;
  };

  getYumsItem = (item, idx) => {
    return (
      <YumsItem
        key={item.id}
        index={idx}
        slurpItem={item}
        yum={(slurpId, idx) => this.yum(slurpId, idx)}
        unyum={(slurpId, idx) => this.unyum(slurpId, idx)}
      />
    );
  };

  checkErrorStatus = () => {
    if (!this.props.status) return;
    if (this.props.status === 400) return <Redirect to={'/404'} />;
    return <Error status={this.props.status} />
  };

  render() {
    return (
      <div>
        {auth(this.props.accessToken)}
        <ScrollToTopOnMount />
        {this.props.loading && <Loading />}
        {this.initGetYums()}
        <Scroll handleScroll={this.handleScroll} />
        <div className="p-3 text-center border-bottom">ヤム</div>
        {this.showReloadBar('更新する', this.getUpdateYums)}
        {this.state.showBackToTop && (
          <BackToTop onClick={this.setScrollTop}>トップへ戻る</BackToTop>
        )}
        {this.checkErrorStatus()}
        {this.showSlurpItems()}
        {this.props.yums.length > 9 &&
          this.showReloadBar('ヤムをさらに表示', this.getOldYums)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    status: state.error.status,
    loading: state.loading.loading,
    yums: state.yums.slurpList,
    yumsStatus: state.yums.status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getYums(payload) {
      dispatch(yums(payload));
    },
    yum(payload) {
      dispatch(yum(payload));
    },
    unyum(payload) {
      dispatch(unyum(payload));
    }
  };
}

export const Yums = connect(
  mapStateToProps,
  mapDispatchToProps
)(YumsContainer);

YumsContainer.propTypes = {
  accessToken: PropTypes.string,
  status: PropTypes.number,
  loading: PropTypes.bool,
  history: PropTypes.object,
  yums: PropTypes.array,
  yumsStatus: PropTypes.number,
  getYums: PropTypes.func,
  yum: PropTypes.func,
  unyum: PropTypes.func
};
