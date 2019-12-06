import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export class TimelineHeader extends Component {
  choicePrivateHeader = () => {
    return (
      <div className="d-flex justify-content-around">
        <div>プライベート</div>
        <div>
          <Link to="/timeline/global" className="c-link__timelineHeader">
            グローバル
          </Link>
        </div>
      </div>
    );
  };

  choiceGlobalHeader = () => {
    return (
      <div className="d-flex justify-content-around">
        <div>
          <Link to="/timeline/private" className="c-link__timelineHeader">
            プライベート
          </Link>
        </div>
        <div>グローバル</div>
      </div>
    );
  };

  render() {
    return (
      <div className="p-3 border-bottom">
        {this.props.isPrivate
          ? this.choicePrivateHeader()
          : this.choiceGlobalHeader()}
      </div>
    );
  }
}

TimelineHeader.propTypes = {
  isPrivate: PropTypes.bool
};
