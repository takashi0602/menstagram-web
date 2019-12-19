import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { BackButton } from './styled';
import UserRow from '../../components/userRow';

const likers = [
  {
    user_id: 'mensta',
    screen_name: 'メンスタグラム公式',
    avatar:
      'https://placehold.jp/150x150.png?text=%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3',
    is_followed: false
  },
  {
    user_id: 'menstaaaa',
    screen_name: 'メンスタグラム非公式',
    avatar:
      'https://placehold.jp/150x150.png?text=%E3%82%A2%E3%82%A4%E3%82%B3%E3%83%B3',
    is_followed: true
  }
];
export class Liker extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      isFollowersView: true
    };
  }

  parentRoute = '/post/' + this.props.match.params.id;
  render() {
    return (
      <div>
        <header className="py-3 px-3 border-bottom d-flex justify-content-between">
          <Link className="text-left" to={this.parentRoute}>
            <FontAwesomeIcon icon={faChevronLeft} style={BackButton} />
          </Link>
          <h1 className="h5 mb-0 text-center">いいねした人</h1>
          <span className="pr-3"></span>
        </header>
        <div className="container">
          <ul className="pl-0 pt-2">
            {likers.map((user, idx) => {
              return <UserRow key={idx} user={user} />;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

Liker.propTypes = {
  match: PropTypes.object
};
