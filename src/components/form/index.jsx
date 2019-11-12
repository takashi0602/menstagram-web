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
      error: {
        userId: false,
        userName: false,
        email: false,
        password: false
      }
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
      this.props.post(payload);
    };

    return this.props.formName === 'register' ?
      (
        <div>
          <div className="mb-4">
            <input type="text" className="c-form mb-3" placeholder="ユーザーネーム" value={this.state.userName} onChange={(e) => changeForm('userName', e)} />
            <input type="text" className="c-form mb-3" placeholder="ユーザーID" value={this.state.userId} onChange={(e) => changeForm('userId', e)} />
            <input type="text" className="c-form mb-3" placeholder="メールアドレス" value={this.state.email} onChange={(e) => changeForm('email', e)} />
            <Relative>
              <input type={checkInputType()} className="c-form" placeholder="パスワード" value={this.state.password} onChange={(e) => changeForm('password', e)} />
              <Absolute onClick={showPassword}>
                <FontAwesomeIcon icon={this.state.iconName} style={Eye} />
              </Absolute>
            </Relative>
          </div>
          <div className="mb-5">
            <button className="c-button__orange w-100" onClick={postRegister}>登録</button>
          </div>
        </div>
      )
      : (
        <div>
          <div className="mb-4">
            <input type="text" className="c-form mb-3" placeholder="ユーザーID" />
            <Relative>
              <input type={checkInputType()} className="c-form" placeholder="パスワード" />
              <Absolute onClick={showPassword}>
                <FontAwesomeIcon icon={this.state.iconName} style={Eye} />
              </Absolute>
            </Relative>
          </div>
          <div className="mb-5">
            <button className="c-button__orange w-100">ログイン</button>
          </div>
        </div>
      )
  }
}
