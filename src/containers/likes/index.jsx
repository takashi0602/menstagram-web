import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../../middleware/auth';
import { LikePostItem } from '../../components/likes/post';
import { likes } from '../../actions/likes';
import { Loading } from '../../components/loading';
import { Reload, BackToTop } from '../timeline/styled';
import { Error } from '../../components/error';
import { Scroll } from '../../components/scroll';
import { ScrollToTopOnMount } from '../../components/scroll/scrollToTopOnMount';

class LikeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notLikesMessage: 'いいねした投稿はありません。',
      showBackToTop: false,
      scrollValue: 0
    };
  }

  initSetLikesData = () => {
    const params = {};
    return {
      params,
      accessToken: this.props.accessToken,
      postList: []
    };
  };

  setLikesData = (params, postList) => {
    return {
      params,
      accessToken: this.props.accessToken,
      postList
    };
  };

  initGetLikes = () => {
    if (this.props.likesStatus !== -1) return;
    this.props.getLikes(this.initSetLikesData());
  };

  getLikes = (params, postList) => {
    this.props.getLikes(this.setLikesData(params, postList));
  };

  showPostItems = () => {
    if (this.props.likes.length === 0)
      return (
        <div>
          <Reload onClick={this.getLikes({}, [])}>投稿を読み込む</Reload>
          <p className="pt-3 px-3">{this.state.notLikesMessage}</p>
        </div>
      );
    return this.props.likes.map(item => (
      <LikePostItem key={item.id} postItem={item} />
    ));
  };

  getOldLikes = () => {
    const params = {
      post_id: this.props.likes[this.props.likes.length - 1].id,
      type: 'old'
    };
    this.getLikes(params, this.props.likes);
  };

  getNewLikes = () => {
    const params = {
      post_id: this.props.likes[0].id,
      type: 'new'
    };
    this.getLikes(params, this.props.likes);
  };

  showReloadBar = (text, getTimeline) => {
    if (this.props.likes.length === 0) return;
    return <Reload onClick={getTimeline}>{text}</Reload>;
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

  render() {
    return (
      <div>
        {auth(this.props.accessToken)}
        <ScrollToTopOnMount />
        {this.props.loading && <Loading />}
        {this.initGetLikes()}
        <Scroll handleScroll={this.handleScroll} />
        <div className="p-3 text-center border-bottom">いいね</div>
        {this.showReloadBar('更新する', this.getNewLikes)}
        {this.state.showBackToTop && (
          <BackToTop onClick={this.setScrollTop}>トップへ戻る</BackToTop>
        )}
        {this.props.status && <Error status={this.props.status} />}
        {this.showPostItems()}
        {this.props.status && <Error status={this.props.status} />}
        {this.showReloadBar('いいねした投稿をさらに表示', this.getOldLikes)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    status: state.error.status,
    loading: state.loading.loading,
    likes: state.likes.postList,
    likesStatus: state.likes.status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getLikes(payload) {
      dispatch(likes(payload));
    }
  };
}

export const Like = connect(
  mapStateToProps,
  mapDispatchToProps
)(LikeContainer);

LikeContainer.propTypes = {
  accessToken: PropTypes.string,
  status: PropTypes.number,
  loading: PropTypes.bool,
  history: PropTypes.object,
  likes: PropTypes.array,
  likesStatus: PropTypes.number,
  getLikes: PropTypes.func
};
