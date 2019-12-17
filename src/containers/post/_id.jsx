import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Post } from '../../components/post/show';

const parentRoute = '/profile/menstagram';
const BackButton = {
  fontSize: '20px',
  color: '#666666'
};
const likers = [
  {
    id: 1,
    user: {
      user_id: 'abc',
      screen_name: 'test1',
      avatar: 'http://placehold.it/100x100/?text=Icon'
    }
  },
  {
    id: 2,
    user: {
      user_id: 'def',
      screen_name: 'test2',
      avatar: 'http://placehold.it/100x100/?text=Icon'
    }
  },
  {
    id: 3,
    user: {
      user_id: 'ghi',
      screen_name: 'test3',
      avatar: 'http://placehold.it/100x100/?text=Icon'
    }
  },
  {
    id: 4,
    user: {
      user_id: 'jkl',
      screen_name: 'test4',
      avatar: 'http://placehold.it/100x100/?text=Icon'
    }
  },
  {
    id: 5,
    user: {
      user_id: 'mno',
      screen_name: 'test4',
      avatar: 'http://placehold.it/100x100/?text=Icon'
    }
  },
  {
    id: 6,
    user: {
      user_id: 'pqr',
      screen_name: 'test4',
      avatar: 'http://placehold.it/100x100/?text=Icon'
    }
  }
];
export class PostDetail extends Component {
  data = {
    id: this.props.match.params.id,
    text:
      'Eum consequatur magnam laboriosam cumque blanditiis consequatur est in. Enim veniam fuga iure odio qui dolorem impedit alias. Itaque veniam odit aut. Provident eum sint quia rem impedit.',
    images: [
      'http://placehold.it/300x300?text=1',
      'http://placehold.it/300x300?text=2',
      'http://placehold.it/300x300?text=3',
      'http://placehold.it/300x300?text=4'
    ],
    liked: 1,
    user: {
      id: 1,
      user_id: 'J4N1AmVPxT',
      screen_name: 'user_name',
      avatar: 'http://placehold.it/100x100/?text=Icon'
    },
    created_at: '2019-11-18T13:52:25.000000Z',
    updated_at: '2019-11-18T13:52:25.000000Z'
  };
  render() {
    return (
      <div>
        <header className="py-3 px-3 border-bottom d-flex justify-content-between">
          <Link className="text-left" to={parentRoute}>
            <FontAwesomeIcon icon={faChevronLeft} style={BackButton} />
          </Link>
          <h1 className="h5 mb-0 text-center">投稿</h1>
          <span></span>
        </header>
        <Post isTimeline={false} post={this.data} likers={likers} />
      </div>
    );
  }
}

PostDetail.propTypes = {
  match: PropTypes.object
};
