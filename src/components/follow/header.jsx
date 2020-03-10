import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {
  HeaderTitle,
  FaChevronLeftStyle,
  faChevronLeftIconStyle
} from './styled';

export class FollowHeader extends Component {
  showHeader = () => {
    const pathName = this.props.history.location.pathname.split('/')[3];
    if (pathName === 'follower') {
      return this.followerHeader();
    } else if (pathName === 'followee') {
      return this.followeeHeader();
    }
  };

  followerHeader = () => {
    return (
      <div className="row justify-content-around mx-0 mb-3">
        <div className="col text-center">フォロワー</div>
        <Link
          to={`/user/${
            this.props.history.location.pathname.split('/')[2]
          }/followee`}
          className="col text-center c-link__lightgray"
        >
          フォロイー
        </Link>
      </div>
    );
  };

  followeeHeader = () => {
    return (
      <div className="row justify-content-around mx-0 mb-3">
        <Link
          to={`/user/${
            this.props.history.location.pathname.split('/')[2]
          }/follower`}
          className="col text-center c-link__lightgray"
        >
          フォロワー
        </Link>
        <div className="col text-center">フォロイー</div>
      </div>
    );
  };

  goBack = () => {
    this.props.history.push(
      `/user/${this.props.history.location.pathname.split('/')[2]}`
    );
  };

  render() {
    return (
      <div className="pt-3">
        <div className="position-relative mb-4">
          <FaChevronLeftStyle onClick={this.goBack}>
            <FontAwesomeIcon
              icon={faChevronLeft}
              style={faChevronLeftIconStyle}
            />
          </FaChevronLeftStyle>
          <HeaderTitle>
            {this.props.history.location.pathname.split('/')[2]}
          </HeaderTitle>
        </div>
        <div className="border-bottom">{this.showHeader()}</div>
      </div>
    );
  }
}

FollowHeader.propTypes = {
  history: PropTypes.object
};
