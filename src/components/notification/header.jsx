import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class NotificationHeader extends Component {
  showHeader = () => {
    if (this.props.pathName === 'yummed') {
      return this.choiceYummedHeader();
    } else if (this.props.pathName === 'followed') {
      return this.choiceFollowedHeader();
    } else if (this.props.pathName === 'system') {
      return this.choiceSystemHeader();
    }
  };

  choiceYummedHeader = () => {
    return (
      <div className="row justify-content-around mx-0 mb-3">
        <div className="col text-center">ヤム</div>
        <Link
          to="/notice/followed"
          className="col text-center c-link__lightgray"
        >
          フォロー
        </Link>
        <Link to="/notice/system" className="col text-center c-link__lightgray">
          運営から
        </Link>
      </div>
    );
  };

  choiceFollowedHeader = () => {
    return (
      <div className="row justify-content-around mx-0 mb-3">
        <Link to="/notice/yummed" className="col text-center c-link__lightgray">
          ヤム
        </Link>
        <div className="col text-center">フォロー</div>
        <Link to="/notice/system" className="col text-center c-link__lightgray">
          運営から
        </Link>
      </div>
    );
  };

  choiceSystemHeader = () => {
    return (
      <div className="row justify-content-around mx-0 mb-3">
        <Link to="/notice/yummed" className="col text-center c-link__lightgray">
          ヤム
        </Link>
        <Link
          to="/notice/followed"
          className="col text-center c-link__lightgray"
        >
          フォロー
        </Link>
        <div className="col text-center">運営から</div>
      </div>
    );
  };

  render() {
    return <div className="border-bottom">{this.showHeader()}</div>;
  }
}

NotificationHeader.propTypes = {
  pathName: PropTypes.string
};
