import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../../middleware/auth';
import { TimelineHeader } from '../../components/timeline/header';
import { TimelinePostItem } from '../../components/timeline/post';
import { privateTimeline } from '../../actions/timeline/private';
import { globalTimeline } from '../../actions/timeline/global';
import { Loading } from '../../components/loading';
import { Reload, BackToTop } from './styled';
import { Error } from '../../components/error';
import { Scroll } from '../../components/scroll';
import { ScrollToTopOnMount } from '../../components/scroll/scrollToTopOnMount';
import { likePost, notLikePost } from '../../actions/likePost';

export class TimelineContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notGlobalTimelineMessage: '投稿がありません。',
      notPrivateTimelineMessage:
        'グローバルタイムラインからお気に入りのユーザーをみつけフォローして、あなただけのタイムラインを作りましょう！',
      showBackToTop: false,
      scrollValue: 0,
      likedPost: false,
      likePostId: -1
    };
  }

  initSetTimeline = () => {
    const params = {};
    const pathName = this.isPathPrivate() ? 'private' : 'global';
    return {
      params,
      pathName,
      accessToken: this.props.accessToken,
      postList: []
    };
  };

  setTimeline = (params, postList) => {
    const pathName = this.isPathPrivate() ? 'private' : 'global';
    return {
      params,
      pathName,
      accessToken: this.props.accessToken,
      postList
    };
  };

  initGetPrivateTimeline = () => {
    if (this.props.privateStatus !== -1) return;
    this.props.getPrivateTimeline(this.initSetTimeline());
  };

  initGetGlobalTimeline = () => {
    if (this.props.globalStatus !== -1) return;
    this.props.getGlobalTimeline(this.initSetTimeline());
  };

  isPathPrivate = () => {
    return this.props.history.location.pathname.split('/')[2] === 'private';
  };

  getTimeline = () => {
    this.isPathPrivate()
      ? this.props.getPrivateTimeline(this.initSetTimeline())
      : this.props.getGlobalTimeline(this.initSetTimeline());
  };

  showPostItems = () => {
    if (this.isPathPrivate()) {
      if (this.props.privateTimeline.length === 0)
        return (
          <div>
            <Reload onClick={this.getTimeline}>投稿を読み込む</Reload>
            <p className="pt-3 px-3">{this.state.notPrivateTimelineMessage}</p>
          </div>
        );
      return this.props.privateTimeline.map((item, idx) =>
        this.getTimelinePostItem(item, idx)
      );
    } else {
      if (this.props.globalTimeline.length === 0)
        return (
          <div>
            <Reload onClick={this.getTimeline}>投稿を読み込む</Reload>
            <p className="pt-3 px-3">{this.state.notGlobalTimelineMessage}</p>
          </div>
        );
      return this.props.globalTimeline.map((item, idx) =>
        this.getTimelinePostItem(item, idx)
      );
    }
  };

  getOldTimeline = () => {
    const params = {
      post_id: this.isPathPrivate()
        ? this.props.privateTimeline[this.props.privateTimeline.length - 1].id
        : this.props.globalTimeline[this.props.globalTimeline.length - 1].id,
      type: 'old'
    };
    this.isPathPrivate()
      ? this.getPrivateTimeline(params)
      : this.getGlobalTimeline(params);
  };

  getNewTimeline = () => {
    const params = {
      post_id: this.isPathPrivate()
        ? this.props.privateTimeline[0].id
        : this.props.globalTimeline[0].id,
      type: 'new'
    };
    this.isPathPrivate()
      ? this.getPrivateTimeline(params)
      : this.getGlobalTimeline(params);
  };

  getPrivateTimeline = params => {
    this.props.getPrivateTimeline(
      this.setTimeline(params, this.props.privateTimeline)
    );
  };

  getGlobalTimeline = params => {
    this.props.getGlobalTimeline(
      this.setTimeline(params, this.props.globalTimeline)
    );
  };

  showReloadBar = (text, getTimeline) => {
    const postList = this.isPathPrivate()
      ? this.props.privateTimeline
      : this.props.globalTimeline;
    if (postList.length === 0) return;
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

  // TODO: いいね機能の改善
  likePost = (postId, idx) => {
    const payload = {
      accessToken: this.props.accessToken,
      postId: postId
    };
    this.props.likePost(payload);
    if (this.isPathPrivate()) {
      this.props.privateTimeline[idx].liked += 1;
      this.props.privateTimeline[idx].is_liked = true;
    } else {
      this.props.globalTimeline[idx].liked += 1;
      this.props.globalTimeline[idx].is_liked = true;
    }
  };

  notLikePost = (postId, idx) => {
    const payload = {
      accessToken: this.props.accessToken,
      postId: postId
    };
    this.props.notLikePost(payload);
    if (this.isPathPrivate()) {
      this.props.privateTimeline[idx].liked -= 1;
      this.props.privateTimeline[idx].is_liked = false;
    } else {
      this.props.globalTimeline[idx].liked -= 1;
      this.props.globalTimeline[idx].is_liked = false;
    }
  };

  getTimelinePostItem = (item, idx) => {
    return (
      <TimelinePostItem
        key={item.id}
        index={idx}
        postItem={item}
        likePost={(postId, idx) => this.likePost(postId, idx)}
        notLikePost={(postId, idx) => this.notLikePost(postId, idx)}
      />
    );
  };

  render() {
    return (
      <div>
        {auth(this.props.accessToken)}
        <ScrollToTopOnMount />
        {this.props.loading && <Loading />}
        {this.isPathPrivate()
          ? this.initGetPrivateTimeline()
          : this.initGetGlobalTimeline()}
        <Scroll handleScroll={this.handleScroll} />
        <TimelineHeader isPrivate={this.isPathPrivate()} />
        {this.showReloadBar('新しい投稿を表示', this.getNewTimeline)}
        {this.state.showBackToTop && (
          <BackToTop onClick={this.setScrollTop}>トップへ戻る</BackToTop>
        )}
        {this.props.status && <Error status={this.props.status} />}
        {this.showPostItems()}
        {this.props.status && <Error status={this.props.status} />}
        {this.showReloadBar('投稿をさらに表示', this.getOldTimeline)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    status: state.error.status,
    loading: state.loading.loading,
    privateTimeline: state.privateTimeline.postList,
    privateStatus: state.privateTimeline.status,
    globalTimeline: state.globalTimeline.postList,
    globalStatus: state.globalTimeline.status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPrivateTimeline(payload) {
      dispatch(privateTimeline(payload));
    },
    getGlobalTimeline(payload) {
      dispatch(globalTimeline(payload));
    },
    likePost(payload) {
      dispatch(likePost(payload));
    },
    notLikePost(payload) {
      dispatch(notLikePost(payload));
    }
  };
}

export const Timeline = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineContainer);

TimelineContainer.propTypes = {
  accessToken: PropTypes.string,
  status: PropTypes.number,
  loading: PropTypes.bool,
  history: PropTypes.object,
  privateTimeline: PropTypes.array,
  privateStatus: PropTypes.number,
  globalTimeline: PropTypes.array,
  globalStatus: PropTypes.number,
  getPrivateTimeline: PropTypes.func,
  getGlobalTimeline: PropTypes.func,
  likePost: PropTypes.func,
  notLikePost: PropTypes.func
};
