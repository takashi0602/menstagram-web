import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import {Absolute, Eye, Relative} from "./styled";

export class Form extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      iconName: faEye,
      userId: '',
      userName: '',
      email: '',
      password: '',
      errorUserId: false,
      errorUserName: false,
      errorEmail: false,
      errorPassword: false
    }
  }

  render() {
    const showPassword = () => {
      this.state.iconName === faEye
        ? this.setState((state) => ({
          iconName: faEyeSlash
        }))
        : this.setState((state) => ({
          iconName: faEye
        }));
    };

    const checkInputType = () => {
      return this.state.iconName === faEye ? 'password' : 'text';
    };

    const changeForm = (stateName, e) => {
      switch (stateName) {
        case 'userId':
          this.setState({userId : e.target.value});
          break;
        case 'userName':
          this.setState({userName : e.target.value});
          break;
        case 'email':
          this.setState({email : e.target.value});
          break;
        case 'password':
          this.setState({password : e.target.value});
          break;
      }
    };

    const postRegister = () => {
      const payload = {
        user_id: this.state.userId,
        screen_name: this.state.userName,
        email: this.state.email,
        password: this.state.password
      };
      if (validate(payload)) return;
      this.props.post(payload);
    };

    const postLogin = () => {
      const payload = {
        user_id: this.state.userId,
        password: this.state.password
      };
      if (validate(payload)) return;
      this.props.post(payload);
    };

    const validate = (payload) => {
      let errorCheck = false;
      this.setState({errorUserName: false});
      this.setState({errorUserId: false});
      this.setState({errorEmail: false});
      this.setState({errorPassword: false});

      if (payload.hasOwnProperty('screen_name')) {
        if (payload.screen_name.length === 0 || payload.screen_name.length > 16) {
          this.setState({errorUserName: true});
          errorCheck = true;
        }
      }
      if (payload.hasOwnProperty('user_id')) {
        if (payload.user_id.match(/^[a-zA-Z0-9_]+$/) === null || payload.user_id.length === 0 || payload.user_id.length > 16) {
          this.setState({errorUserId: true});
          errorCheck = true;
        }
      }
      if (payload.hasOwnProperty('email')) {
        if (payload.email.match(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/) === null) {
          this.setState({errorEmail: true});
          errorCheck = true;
        }
      }
      if (payload.hasOwnProperty('password')) {
        if (payload.password.length < 8) {
          this.setState({errorPassword: true});
          errorCheck = true;
        }
      }
      return errorCheck;
    };

    return this.props.formName === 'register' ?
      (
        <div>
          <div className="mb-4">
            <input type="text" className="c-form mb-3" placeholder="ユーザーネーム" value={this.state.userName} onChange={(e) => changeForm('userName', e)} />
            { this.state.errorUserName && <p className="text-danger">16文字以下で入力してください。</p> }
            <input type="text" className="c-form mb-3" placeholder="ユーザーID" value={this.state.userId} onChange={(e) => changeForm('userId', e)} />
            { this.state.errorUserId && <p className="text-danger">16文字以下の英数字で入力してください。</p> }
            <input type="email" className="c-form mb-3" placeholder="メールアドレス" value={this.state.email} onChange={(e) => changeForm('email', e)} />
            { this.state.errorEmail && <p className="text-danger">正しいメールアドレスを入力してください。</p> }
            <Relative>
              <input type={checkInputType()} className="c-form" placeholder="パスワード" value={this.state.password} onChange={(e) => changeForm('password', e)} />
              <Absolute onClick={showPassword}>
                <FontAwesomeIcon icon={this.state.iconName} style={Eye} />
              </Absolute>
            </Relative>
            { this.state.errorPassword && <p className="text-danger">8文字以上で入力してください。</p> }
          </div>
          <div className="mb-5">
            <button className="c-button__orange w-100" onClick={postRegister}>登録</button>
          </div>
        </div>
      )
      : (
        <div>
          <div className="mb-4">
            <input type="text" className="c-form mb-3" placeholder="ユーザーID" value={this.state.userId} onChange={(e) => changeForm('userId', e)} />
            { this.state.errorUserId && <p className="text-danger">16文字以下の英数字で入力してください。</p> }
            <Relative>
              <input type={checkInputType()} className="c-form" placeholder="パスワード" value={this.state.password} onChange={(e) => changeForm('password', e)} />
              <Absolute onClick={showPassword}>
                <FontAwesomeIcon icon={this.state.iconName} style={Eye} />
              </Absolute>
            </Relative>
            { this.state.errorPassword && <p className="text-danger">8文字以上で入力してください。</p> }
          </div>
          <div className="mb-5">
            <button className="c-button__orange w-100" onClick={postLogin}>ログイン</button>
          </div>
        </div>
      )
  }
}
