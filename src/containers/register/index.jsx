import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import titleSvg from "../../assets/images/title.svg";
import { Relative, Absolute, Eye } from "./styled";

export class Register extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      iconName: faEye
    }
  }

  render() {
    const showPassword = () => {
      this.state.iconName === faEye
        ? this.setState((state)=>({
          iconName: faEyeSlash
        }))
        : this.setState((state)=>({
          iconName: faEye
        }));
    };

    const checkInputType = () => {
      return this.state.iconName === faEye ? 'password' : 'text';
    };

    return (
      <div className="c-container__padding">
        <div className="text-center pt-5 mb-5">
          <img src={titleSvg} alt="Menstagram" />
        </div>
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
        <div className="mb-3">
          <p className="mb-0">アカウントをお持ちですか？</p>
          <Link to="/login">ログインする</Link>
        </div>
        <Link to="/">トップへ戻る</Link>
      </div>
    );
  }
}
