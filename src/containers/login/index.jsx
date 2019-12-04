import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import titleSvg from '../../assets/images/title.svg';
import { Form } from '../../components/form';
import { connect } from 'react-redux';
import { login } from '../../actions/auth/login';
import { noAuth } from '../../middleware/auth';
import { Loading } from '../../components/loading';
import { Error } from '../../components/error';

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
    this.props.post(payload);
  };

  validate = payload => {
    let errorCheck = false;
    this.setState({ errorUserId: false });
    this.setState({ errorPassword: false });

    if (payload && this.hasProperty(payload, 'user_id')) {
      if (
        payload.user_id.match(/^[a-zA-Z0-9_]+$/) === null ||
        payload.user_id.length === 0 ||
        payload.user_id.length > 16
      ) {
        this.setState({ errorUserId: true });
        errorCheck = true;
      }
    }
    if (payload && this.hasProperty(payload, 'password')) {
      if (payload.password.length < 8) {
        this.setState({ errorPassword: true });
        errorCheck = true;
      }
    }
    return errorCheck;
  };

  hasProperty = (obj, key) => {
    return !!obj && Object.prototype.hasOwnProperty.call(obj, key);
  };

  render() {
    return (
      <div>
        {noAuth(this.props.accessToken)}
        {this.props.loading && <Loading />}
        <div className="c-container__padding">
          <div className="text-center pt-5 mb-5">
            <img src={titleSvg} alt="Menstagram" />
          </div>
          {this.props.status && <Error status={this.props.status} />}
          <div className="mb-4">
            <input
              type="text"
              className="c-form mb-3"
              placeholder="ユーザーID"
              value={this.state.userId}
              onChange={e => this.changeForm('userId', e)}
            />
            {this.state.errorUserId && (
              <p className="text-danger">
                16文字以下の英数字で入力してください。
              </p>
            )}
            <Form
              password={this.state.password}
              changeForm={(stateName, e) => this.changeForm(stateName, e)}
            />
            {this.state.errorPassword && (
              <p className="text-danger">8文字以上で入力してください。</p>
            )}
          </div>
          <div className="mb-5">
            <button className="c-button__orange w-100" onClick={this.login}>
              ログイン
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
    loading: state.loading.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    post(payload) {
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
  post: PropTypes.func,
  loading: PropTypes.bool
};
