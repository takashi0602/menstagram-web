import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form } from '../../components/form';
import { register } from '../../actions/auth/register';
import { noAuth } from '../../middleware/auth';
import { Loading } from '../../components/loading';
import { Error } from '../../components/error';
import { has_prop } from '../../helpers';
import { ErrorMessage } from '../../components/error/badRequest';

export class RegisterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userName: '',
      email: '',
      password: '',
      errorUserId: false,
      errorUserName: false,
      errorEmail: false,
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

  register = () => {
    const payload = {
      user_id: this.state.userId,
      user_name: this.state.userName,
      email: this.state.email,
      password: this.state.password
    };
    if (this.validate(payload)) return;
    this.props.register(payload);
  };

  validate = payload => {
    let errorCheck = false;
    this.setState({ errorUserName: false });
    this.setState({ errorUserId: false });
    this.setState({ errorEmail: false });
    this.setState({ errorPassword: false });

    if (payload && has_prop(payload, 'user_name')) {
      if (payload.user_name.length === 0 || payload.user_name.length > 16) {
        this.setState({ errorUserName: true });
        errorCheck = true;
      }
    }
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
    if (payload && has_prop(payload, 'email')) {
      if (
        payload.email.match(
          /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        ) === null
      ) {
        this.setState({ errorEmail: true });
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
    if (key === 'userName' && this.state.errorUserName) {
      return (
        <p className="text-danger">
          ユーザーネームは1〜16文字の範囲で指定してください。
        </p>
      );
    }
    if (key === 'userId' && this.state.errorUserId) {
      return (
        <p className="text-danger">
          ユーザーIDは1〜16文字の英数字のみで指定してください。
        </p>
      );
    }
    if (key === 'email' && this.state.errorEmail) {
      return (
        <p className="text-danger">正しいメールアドレスを入力してください。</p>
      );
    }
    if (key === 'password' && this.state.errorPassword) {
      return (
        <p className="text-danger">パスワードは8文字以上で指定してください。</p>
      );
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
            <input
              type="text"
              className="c-form mb-3"
              placeholder="ユーザーネーム"
              value={this.state.userName}
              onChange={e => this.changeForm('userName', e)}
            />
            {this.showValidateMassage('userName')}
            <ErrorMessage errors={this.props.errors} keyName="user_name" />
            <input
              type="text"
              className="c-form mb-3"
              placeholder="ユーザーID"
              value={this.state.userId}
              onChange={e => this.changeForm('userId', e)}
            />
            {this.showValidateMassage('userId')}
            <ErrorMessage errors={this.props.errors} keyName="user_id" />
            <input
              type="email"
              className="c-form mb-3"
              placeholder="メールアドレス"
              value={this.state.email}
              onChange={e => this.changeForm('email', e)}
            />
            {this.showValidateMassage('email')}
            <ErrorMessage errors={this.props.errors} keyName="email" />
            <Form
              password={this.state.password}
              changeForm={(stateName, e) => this.changeForm(stateName, e)}
            />
            {this.showValidateMassage('password')}
            <ErrorMessage errors={this.props.errors} keyName="password" />
          </div>
          <div className="mb-5">
            <button className="c-button__orange w-100" onClick={this.register}>
              登録する
            </button>
          </div>
          <div className="mb-3">
            <p className="mb-0">アカウントをお持ちですか？</p>
            <Link to="/login">ログインする</Link>
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
    register(payload) {
      dispatch(register(payload));
    }
  };
}

export const Register = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainer);

RegisterContainer.propTypes = {
  accessToken: PropTypes.string,
  status: PropTypes.number,
  errors: PropTypes.object,
  register: PropTypes.func,
  loading: PropTypes.bool
};
