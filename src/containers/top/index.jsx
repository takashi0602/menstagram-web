import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { SubTitle, Logo } from './styled';
import { noAuth } from '../../middleware/auth';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo.png';

export class TopContainer extends Component {
  render() {
    return (
      <div className="c-container__padding">
        {noAuth(this.props.accessToken)}
        <div className="text-center pt-5 mb-3">
          <div className="mb-3 c-image__title" />
          <div className="mb-3">
            <Logo style={{ backgroundImage: `url(${logo})` }} />
          </div>
          <SubTitle>
            SUSURU FOREVER,
            <br />
            SUSURU ANYWHERE.
          </SubTitle>
        </div>
        <p className="mb-5">
          Menstagramは世界中のラーメンコミュニティを支える特化型SNSです。
        </p>
        <div className="mb-3">
          <p className="mb-0">アカウントをお持ちでないですか？</p>
          <Link to="/register">登録する</Link>
        </div>
        <div>
          <p className="mb-0">アカウントをお持ちですか？</p>
          <Link to="/login">ログインする</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken
  };
}

export const Top = connect(mapStateToProps)(TopContainer);

TopContainer.propTypes = {
  accessToken: PropTypes.string
};
