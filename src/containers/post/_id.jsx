import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../components/post/show';
import { BackButton, Title, ChevronLeftIcons } from './styled';
import { ScrollToTopOnMount } from '../../components/scroll/scrollToTopOnMount';
import { connect } from 'react-redux';
import { auth } from '../../middleware/auth';
import { postDetail } from '../../actions/postDetail';
import { Loading } from '../../components/loading';
import { likePost, notLikePost } from '../../actions/likePost';

export class PostDetailContainer extends Component {
  // TODO: history.goBack()はブラウザバックなので共有した際などは押しても遷移しない場合がある
  goBack = () => {
    this.props.history.goBack();
  };

  initPostDetail = () => {
    const params = {
      post_id: this.props.match.params.id
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
      this.props.postDetailStatus === -1 ||
      Number(this.props.match.params.id) !== this.props.postDetail.id
    ) {
      this.props.getPostDetail(this.initPostDetail());
    }
  };

  likePost = () => {
    const payload = {
      accessToken: this.props.accessToken,
      postId: this.props.postDetail.id
    };
    this.props.likePost(payload);
    this.props.postDetail.is_liked = true;
    this.props.postDetail.liked += 1;
  };

  notLikePost = () => {
    const payload = {
      accessToken: this.props.accessToken,
      postId: this.props.postDetail.id
    };
    this.props.notLikePost(payload);
    this.props.postDetail.is_liked = false;
    this.props.postDetail.liked -= 1;
  };

  showPost = () => {
    if (!this.props.postDetail.images.length) return;
    return <Post
      postItem={this.props.postDetail}
      likePost={this.likePost}
      notLikePost={this.notLikePost}
    />
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
          <Title>投稿</Title>
        </header>
        {this.showPost()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    status: state.postDetail.status,
    loading: state.loading.loading,
    success: state.post.success,
    postDetail: state.postDetail.postDetail,
    postDetailStatus: state.postDetail.status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPostDetail(payload) {
      dispatch(postDetail(payload));
    },
    likePost(payload) {
      dispatch(likePost(payload));
    },
    notLikePost(payload) {
      dispatch(notLikePost(payload));
    }
  };
}

export const PostDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetailContainer);

PostDetailContainer.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  accessToken: PropTypes.string,
  status: PropTypes.number,
  loading: PropTypes.bool,
  getPostDetail: PropTypes.func,
  success: PropTypes.bool,
  postDetail: PropTypes.object,
  likePost: PropTypes.func,
  notLikePost: PropTypes.func,
  postDetailStatus: PropTypes.number
};
