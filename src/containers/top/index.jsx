import React, { Component } from 'react';
import { Link } from "react-router-dom";
import titleSvg from "../../assets/images/title.svg";
import { SubTitle } from "./styled";
import { noAuth } from "../../middleware/auth";
import { connect } from 'react-redux';

export class Top extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="c-container__padding">
        {noAuth(this.props.accessToken)}
        <div className="text-center pt-5 mb-3">
          <img src={titleSvg} alt="Menstagram" className="mb-3"/>
          <div className="mb-3">
            <img src="http://placehold.it/100x100/?text=Icon" alt="MenstagramIcon"/>
          </div>
          <SubTitle>SUSURU FOREVER,<br />SUSURU ANYWHERE.</SubTitle>
        </div>
        <p className="mb-5">Menstagramは世界中のラーメンコミュニティを支える特化型SNSです。</p>
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
    accessToken: state.auth.accessToken,
  };
}

Top = connect(mapStateToProps)(Top);
