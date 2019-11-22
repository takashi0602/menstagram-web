import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import titleSvg from '../../assets/images/title.svg';
import { Form } from '../../components/form';
import { connect } from 'react-redux';
import { login } from '../../actions/auth/login';
import { noAuth } from '../../middleware/auth';

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

  render() {
    const changeForm = (stateName, e) => {
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

    const login = () => {
      const payload = {
        user_id: this.state.userId,
        password: this.state.password
      };
      if (validate(payload)) return;
      this.props.post(payload);
    };

    const validate = payload => {
      let errorCheck = false;
      this.setState({ errorUserId: false });
      this.setState({ errorPassword: false });

      if (payload && hasProperty(payload, 'user_id')) {
        if (
          payload.user_id.match(/^[a-zA-Z0-9_]+$/) === null ||
          payload.user_id.length === 0 ||
          payload.user_id.length > 16
        ) {
          this.setState({ errorUserId: true });
          errorCheck = true;
        }
      }
      if (payload && hasProperty(payload, 'password')) {
        if (payload.password.length < 8) {
          this.setState({ errorPassword: true });
          errorCheck = true;
        }
      }
      return errorCheck;
    };

    const hasProperty = (obj, key) => {
      return !!obj && Object.prototype.hasOwnProperty.call(obj, key);
    };

    return (
      <div className="c-container__padding">
        {noAuth(this.props.accessToken)}
        <div className="text-center pt-5 mb-5">
          <img src={titleSvg} alt="Menstagram" />
        </div>
        <div className="mb-4">
          <input
            type="text"
            className="c-form mb-3"
            placeholder="ユーザーID"
            value={this.state.userId}
            onChange={e => changeForm('userId', e)}
          />
          {this.state.errorUserId && (
            <p className="text-danger">
              16文字以下の英数字で入力してください。
            </p>
          )}
          <Form
            password={this.state.password}
            changeForm={(stateName, e) => changeForm(stateName, e)}
          />
          {this.state.errorPassword && (
            <p className="text-danger">8文字以上で入力してください。</p>
          )}
        </div>
        <div className="mb-5">
          <button className="c-button__orange w-100" onClick={login}>
            ログイン
          </button>
        </div>
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
    accessToken: state.auth.accessToken,
    status: state.auth.status
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
  status: PropTypes.string,
  post: PropTypes.func
};
