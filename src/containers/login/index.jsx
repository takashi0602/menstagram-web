import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form } from '../../components/form';
import { connect } from 'react-redux';
import { login } from '../../actions/auth/login';
import { noAuth } from '../../middleware/auth';
import { Loading } from '../../components/loading';
import { Error } from '../../components/error';
import { ErrorMessage } from '../../components/error/badRequest';
import { has_prop } from '../../helpers';

export class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      password: '',
      errorUserId: false,
      errorPassword: false
    };
  }

  changeForm = (stateName, e) => {
    switch (stateName) {
      case 'userId':
        this.setState({ userId: e.target.value });
        break;
      case 'userName':
        this.setState({ userName: e.target.value });
        break;
      case 'email':
        this.setState({ email: e.target.value });
        break;
      case 'password':
        this.setState({ password: e.target.value });
        break;
      default:
    }
  };

  login = () => {
    const payload = {
      user_id: this.state.userId,
      password: this.state.password
    };
    if (this.validate(payload)) return;
    this.props.login(payload);
  };

  validate = payload => {
    let errorCheck = false;
    this.setState({ errorUserId: false });
    this.setState({ errorPassword: false });

    if (payload && has_prop(payload, 'user_id')) {
      if (
        payload.user_id.match(/^[a-zA-Z0-9_]+$/) === null ||
        payload.user_id.length === 0 ||
        payload.user_id.length > 16
      ) {
        this.setState({ errorUserId: true });
        errorCheck = true;
      }
    }
    if (payload && has_prop(payload, 'password')) {
      if (payload.password.length < 8) {
        this.setState({ errorPassword: true });
        errorCheck = true;
      }
    }
    return errorCheck;
  };

  showValidateMassage = key => {
    if (key === 'userId' && this.state.errorUserId) {
      return (
        <p className="text-danger">ユーザーIDは1〜16文字の範囲で指定してください。</p>
      );
    }
    if (key === 'password' && this.state.errorPassword) {
      return <p className="text-danger">パスワードは8文字以上で指定してください。</p>;
    }
    return null;
  };

  render() {
    return (
      <div>
        {noAuth(this.props.accessToken)}
        {this.props.loading && <Loading />}
        <div className="c-container__padding">
          <div className="pt-5 mb-5">
            <div className="c-image__title" />
          </div>
          {this.props.status && <Error status={this.props.status} />}
          <ErrorMessage errors={this.props.errors} keyName="message" />
          <div className="mb-4">
            <div className="mb-3">
              <input
                type="text"
                className="c-form"
                placeholder="ユーザーID"
                value={this.state.userId}
                onChange={e => this.changeForm('userId', e)}
              />
              {this.showValidateMassage('userId')}
              <ErrorMessage errors={this.props.errors} keyName="user_id" />
            </div>
            <div>
              <Form
                password={this.state.password}
                changeForm={(stateName, e) => this.changeForm(stateName, e)}
              />
              {this.showValidateMassage('password')}
              <ErrorMessage errors={this.props.errors} keyName="password" />
            </div>
          </div>
          <div className="mb-5">
            <button className="c-button__orange w-100" onClick={this.login}>
              ログインする
            </button>
          </div>
          <div className="mb-3">
            <p className="mb-0">アカウントをお持ちでないですか？</p>
            <Link to="/register">登録する</Link>
          </div>
          <Link to="/">トップへ戻る</Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    status: state.error.status,
    errors: state.error.errors,
    loading: state.loading.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login(payload) {
      dispatch(login(payload));
    }
  };
}

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);

LoginContainer.propTypes = {
  accessToken: PropTypes.string,
  status: PropTypes.number,
  errors: PropTypes.object,
  login: PropTypes.func,
  loading: PropTypes.bool
};
