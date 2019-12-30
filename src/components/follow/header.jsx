import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { HeaderTitle, FaChevronLeftStyle, faChevronLeftIconStyle } from './styled';

export class FollowHeader extends Component {
  showHeader = () => {
    const pathName = this.props.history.location.pathname.split('/')[1];
    if (pathName === 'followed') {
      return this.followedHeader();
    } else if (pathName === 'following') {
      return this.followingHeader();
    }
  };

  followedHeader = () => {
    return (
      <div className="row justify-content-around mx-0 mb-3">
        <div className="col text-center">フォロワー</div>
        <Link
          to={`/following/${this.props.history.location.pathname.split('/')[2]}`}
          className="col text-center c-link__lightgray"
        >
          フォロー中
        </Link>
      </div>
    );
  };

  followingHeader = () => {
    return (
      <div className="row justify-content-around mx-0 mb-3">
        <Link
          to={`/followed/${this.props.history.location.pathname.split('/')[2]}`}
          className="col text-center c-link__lightgray"
        >
          フォロワー
        </Link>
        <div className="col text-center">フォロー中</div>
      </div>
    );
  };

  goBack = () => {
    this.props.history.push(`/profile/${this.props.history.location.pathname.split('/')[2]}`);
  };

  render() {
    return (
      <div className="pt-3">
        <div className="position-relative mb-4">
          <FaChevronLeftStyle onClick={this.goBack}>
            <FontAwesomeIcon icon={faChevronLeft} style={faChevronLeftIconStyle} />
          </FaChevronLeftStyle>
          <HeaderTitle>{this.props.history.location.pathname.split('/')[2]}</HeaderTitle>
        </div>
        <div className="border-bottom">{this.showHeader()}</div>
      </div>
    );
  }
}

FollowHeader.propTypes = {
  history: PropTypes.object
};
