import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faImages,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { HamMenu } from '../../components/hamMenu';
import {
  backButton,
  UserName,
  UserId,
  Biography,
  PostImage,
  imagesIcon,
  MyProfileHeader,
  UserImage,
  userIcon,
  Item
} from './styled';
import { logout } from '../../actions/auth/logout';
import { connect } from 'react-redux';
import { auth } from '../../middleware/auth';
import { Loading } from '../../components/loading';
import { Error } from '../../components/error';
import { TwoChoiceModal } from '../../components/modal/twoChoiceModal';
import { ScrollToTopOnMount } from '../../components/scroll/scrollToTopOnMount';

//ダミー
const parentRoute = '/post/3';

const isMypage = true;

const user = {
  id: 1,
  user_id: 'menstagram',
  avatar: '',
  screen_name: 'メンスタグラム公式',
  posted: 10,
  following: 10,
  followed: 10,
  is_followed: false,
  biography:
    'user_information. user_information. user_information. user_information.'
};

const posts = [
  {
    id: 1,
    text: 'aaaa',
    images: ['http://placehold.it/300x300?text=1'],
    liked: 1
  },
  {
    id: 2,
    text: 'aaaa',
    images: [
      'http://placehold.it/300x500?text=1',
      'http://placehold.it/300x300?text=2'
    ],
    liked: 1
  },
  {
    id: 3,
    text: 'aaaa',
    images: [
      'http://placehold.it/500x300?text=1',
      'http://placehold.it/300x300?text=2',
      'http://placehold.it/300x300?text=3'
    ],
    liked: 1
  },
  {
    id: 4,
    text: 'aaaa',
    images: [
      'http://placehold.it/300x200?text=1',
      'http://placehold.it/300x300?text=2',
      'http://placehold.it/300x300?text=3',
      'http://placehold.it/300x300?text=4'
    ],
    liked: 1
  },
  {
    id: 5,
    text: 'aaaa',
    images: ['http://placehold.it/300x300?text=1'],
    liked: 1
  },
  {
    id: 6,
    text: 'aaaa',
    images: [
      'http://placehold.it/800x300?text=1',
      'http://placehold.it/300x300?text=2',
      'http://placehold.it/300x300?text=3',
      'http://placehold.it/300x300?text=4'
    ],
    liked: 1
  },
  {
    id: 7,
    text: 'aaaa',
    images: [
      'http://placehold.it/300x400?text=1',
      'http://placehold.it/300x300?text=2',
      'http://placehold.it/300x300?text=3',
      'http://placehold.it/300x300?text=4'
    ],
    liked: 1
  },
  {
    id: 8,
    text: 'aaaa',
    images: [
      'http://placehold.it/300x300?text=1',
      'http://placehold.it/300x300?text=2',
      'http://placehold.it/300x300?text=3',
      'http://placehold.it/300x300?text=4'
    ],
    liked: 1
  },
  {
    id: 9,
    text: 'aaaa',
    images: [
      'http://placehold.it/300x300?text=1',
      'http://placehold.it/300x300?text=2',
      'http://placehold.it/300x300?text=3',
      'http://placehold.it/300x300?text=4'
    ],
    liked: 1
  },
  {
    id: 10,
    text: 'aaaa',
    images: [
      'http://placehold.it/300x300?text=1',
      'http://placehold.it/300x300?text=2',
      'http://placehold.it/300x300?text=3',
      'http://placehold.it/300x300?text=4'
    ],
    liked: 1
  }
];

class ProfileContainer extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      isFollowersView: true,
      showModal: false
    };
  }

  TopHeader = () => {
    if (isMypage) {
      return (
        <MyProfileHeader>
          <HamMenu menuItems={[]} logout={() => this.openModal()} />
        </MyProfileHeader>
      );
    } else {
      return (
        <header className="py-3 px-3 d-flex justify-content-start">
          <Link className="text-left" to={parentRoute}>
            <FontAwesomeIcon icon={faChevronLeft} style={backButton} />
          </Link>
        </header>
      );
    }
  };

  ControlButton = () => {
    if (isMypage) {
      return (
        <button type="button" className="c-button__white px-0 w-100">
          <Link
            to={`/profile/${this.props.match.params.id}/edit`}
            className="d-inline-block w-100 c-link__gray"
          >
            プロフィールの編集
          </Link>
        </button>
      );
    } else if (user.is_followed) {
      return (
        <button type="button" className="c-button__white w-100">
          フォロー中
        </button>
      );
    } else {
      return (
        <button type="button" className="c-button__orange w-100">
          フォローする
        </button>
      );
    }
  };

  PostsTileView = () => {
    if (posts.length > 0) {
      return (
        <div className="row m-0">
          {posts.map((post, idx) => {
            return (
              <Link
                key={idx}
                to={`/post/${post.id}`}
                className="col-4 p-1 position-relative"
              >
                <PostImage src={post.images[0]} alt="post" />
                {post.images.length !== 1 && (
                  <FontAwesomeIcon icon={faImages} style={imagesIcon} />
                )}
              </Link>
            );
          })}
        </div>
      );
    } else if (isMypage) {
      return (
        <div className="c-container__padding pt-2">
          <p className="m-0">まだ投稿していません。</p>
          <p>ラーメンを投稿してみましょう。</p>
          <Link to="/post">ラーメンを投稿する</Link>
        </div>
      );
    } else {
      return (
        <div className="c-container__padding pt-2">
          <p className="m-0">投稿はありません。</p>
        </div>
      );
    }
  };

  showUserImage = () => {
    if (user.avatar)
      return <UserImage style={{ backgroundImage: `url(${user.avatar})` }} />;
    return (
      <UserImage>
        <FontAwesomeIcon icon={faUser} style={userIcon} />
      </UserImage>
    );
  };

  logout = () => {
    this.props.post(this.props.accessToken);
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div>
        {auth(this.props.accessToken)}
        <ScrollToTopOnMount />
        {this.props.loading && <Loading />}
        {this.TopHeader()}
        {this.props.status && <Error status={this.props.status} />}
        <div className="text-center">
          {this.showUserImage()}
          <UserName>{user.screen_name}</UserName>
          <UserId>{user.user_id}</UserId>
        </div>
        <div className="mb-2 border-bottom">
          <div className="d-flex justify-content-around mb-2">
            <Item>
              <div className="text-center mb-0">{posts.length}</div>
              <div className="text-center">投稿</div>
            </Item>
            <Item>
              <Link to={`/followed/${user.user_id}`} className="c-link__black">
                <div className="text-center mb-0">{user.followed}</div>
                <div className="text-center">フォロワー</div>
              </Link>
            </Item>
            <Item>
              <Link to={`/following/${user.user_id}`} className="c-link__black">
                <div className="text-center mb-0">{user.following}</div>
                <div className="text-center">フォロー</div>
              </Link>
            </Item>
          </div>
          <div className="c-container__padding mb-3">
            <Biography>{user.biography}</Biography>
            {this.ControlButton()}
          </div>
        </div>
        {this.PostsTileView()}
        {this.state.showModal && (
          <TwoChoiceModal
            text={'ログアウトしますか？'}
            buttonName={'ログアウト'}
            closeModal={() => this.closeModal()}
            submit={() => this.logout()}
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
    loading: state.loading.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    post(payload) {
      dispatch(logout(payload));
    }
  };
}

export const Profile = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileContainer);

ProfileContainer.propTypes = {
  match: PropTypes.object,
  accessToken: PropTypes.string,
  status: PropTypes.number,
  post: PropTypes.func,
  loading: PropTypes.bool
};
