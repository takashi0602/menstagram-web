import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import titleSvg from '../../assets/images/title.svg';
import { Form } from '../../components/form';
import { register } from '../../actions/auth/register';
import { noAuth } from '../../middleware/auth';
import { Loading } from '../../components/loading';

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

    const register = () => {
      const payload = {
        user_id: this.state.userId,
        screen_name: this.state.userName,
        email: this.state.email,
        password: this.state.password
      };
      if (validate(payload)) return;
      this.props.post(payload);
    };

    const validate = payload => {
      let errorCheck = false;
      this.setState({ errorUserName: false });
      this.setState({ errorUserId: false });
      this.setState({ errorEmail: false });
      this.setState({ errorPassword: false });

      if (payload && hasProperty(payload, 'screen_name')) {
        if (
          payload.screen_name.length === 0 ||
          payload.screen_name.length > 16
        ) {
          this.setState({ errorUserName: true });
          errorCheck = true;
        }
      }
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
      if (payload && hasProperty(payload, 'email')) {
        if (
          payload.email.match(
            /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          ) === null
        ) {
          this.setState({ errorEmail: true });
          errorCheck = true;
        }
      }
      if (payload && Object.hasOwnProperty.call(payload, 'password')) {
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
      <div>
        {noAuth(this.props.accessToken)}
        {this.props.loading && <Loading />}
        <div className="c-container__padding">
          <div className="text-center pt-5 mb-5">
            <img src={titleSvg} alt="Menstagram" />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="c-form mb-3"
              placeholder="ユーザーネーム"
              value={this.state.userName}
              onChange={e => changeForm('userName', e)}
            />
            {this.state.errorUserName && (
              <p className="text-danger">16文字以下で入力してください。</p>
            )}
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
            <input
              type="email"
              className="c-form mb-3"
              placeholder="メールアドレス"
              value={this.state.email}
              onChange={e => changeForm('email', e)}
            />
            {this.state.errorEmail && (
              <p className="text-danger">
                正しいメールアドレスを入力してください。
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
            <button className="c-button__orange w-100" onClick={register}>
              登録
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
    status: state.auth.status,
    loading: state.loading.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    post(payload) {
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
  status: PropTypes.string,
  post: PropTypes.func,
  loading: PropTypes.bool
};
