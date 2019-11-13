import React, { Component } from 'react';
import { Link } from "react-router-dom";
import titleSvg from "../../assets/images/title.svg";
import {Form} from "../../components/form";
import { connect } from 'react-redux'
import { login } from '../../actions/auth/login'

export class Login extends Component {
  constructor(prop) {
    super(prop);
  }

  render() {
    return (
      <div className="c-container__padding">
        <div className="text-center pt-5 mb-5">
          <img src={titleSvg} alt="Menstagram" />
        </div>
        <Form formName="login" post={(payload) => this.props.post(payload)} status={this.props.status} />
        <div className="mb-3">
          <p className="mb-0">アカウントをお持ちでないですか？</p>
          <Link to="/register">登録する</Link>
        </div>
        <Link to="/">トップへ戻る</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.login.status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    post(payload) {
      dispatch(login(payload));
    }
  }
}

Login = connect(mapStateToProps, mapDispatchToProps)(Login);
