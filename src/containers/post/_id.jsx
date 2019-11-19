import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../components/post/show';
import { BackButton, Title } from './styled';
import { ScrollToTopOnMount } from '../../components/scroll/scrollToTopOnMount';
import { connect } from 'react-redux';
import { auth } from '../../middleware/auth';
import { postDetail, failPostDetail } from '../../actions/postDetail';
import { Loading } from '../../components/loading';

export class PostDetailContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postDetail: {
        id: undefined,
        text: '',
        images: [],
        liked: undefined,
        user: {
          user_id: '',
          screen_name: '',
          avatar: ''
        },
        created_at: '',
        updated_at: ''
      },
      liker: []
    };
  }

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
      accessToken: this.props.accessToken,
      postDetail: {
        id: undefined,
        text: '',
        images: [],
        liked: undefined,
        user: {
          user_id: '',
          screen_name: '',
          avatar: ''
        },
        created_at: '',
        updated_at: '',
        liker: []
      }
    };
  };

  initGetData = () => {
    // query check
    if (Number.isNaN(Number(this.props.match.params.id))) return;
    // TODO: 404画面の表示

    //id:1 -> timeline -> id:2
    if (Number(this.props.match.params.id) !== this.props.postDetail.id) {
      this.props.getPostDetail(this.initPostDetail());
      return;
    }
    if (this.props.status !== -1) return;
    this.props.getPostDetail(this.initPostDetail());
  };

  render() {
    return (
      <div>
        {auth(this.props.accessToken)}
        {this.props.loading && <Loading />}
        {this.initGetData()}
        <ScrollToTopOnMount />
        <header className="py-3 px-3 border-bottom">
          <BackButton onClick={this.goBack}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </BackButton>
          <Title>投稿</Title>
        </header>
        {this.props.postDetail && <Post postItem={this.props.postDetail} />}
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
    postDetail: state.postDetail.postDetail
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getPostDetail(payload) {
      dispatch(postDetail(payload));
    },
    changeSuccessValue() {
      dispatch(failPostDetail());
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
  changeSuccessValue: PropTypes.func,
  postDetail: PropTypes.object
};
