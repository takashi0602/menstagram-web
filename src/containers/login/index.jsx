import React, { Component } from 'react';
import { Link } from "react-router-dom";
import titleSvg from "../../assets/images/title.svg";
import {Form} from "../../components/form";

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
        <Form formName="login" />
        <div className="mb-3">
          <p className="mb-0">アカウントをお持ちでないですか？</p>
          <Link to="/register">登録する</Link>
        </div>
        <Link to="/">トップへ戻る</Link>
      </div>
    );
  }
}
