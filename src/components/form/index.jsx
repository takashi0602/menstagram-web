import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import {Absolute, Eye, Relative} from "./styled";

export class Form extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      iconName: faEye
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

    return this.props.formName === 'register' ?
      (
        <div>
          <div className="mb-4">
            <input type="text" className="c-form mb-3" placeholder="ユーザーネーム" />
            <input type="text" className="c-form mb-3" placeholder="ユーザーID" />
            <input type="text" className="c-form mb-3" placeholder="メールアドレス" />
            <Relative>
              <input type={checkInputType()} className="c-form" placeholder="パスワード" />
              <Absolute onClick={showPassword}>
                <FontAwesomeIcon icon={this.state.iconName} style={Eye} />
              </Absolute>
            </Relative>
          </div>
          <div className="mb-5">
            <button className="c-button__orange w-100">登録</button>
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
