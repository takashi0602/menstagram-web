import React, { Component } from 'react';
import { connect } from 'react-redux';
import {auth} from "../../middleware/auth";

export class Logout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const logout = () => {};

    return (
      <div className="c-container__padding">
        {auth(this.props.accessToken)}
        <h1>ログアウト</h1>
        <button type="button" className="c-button__white" onClick={logout}>ログアウト</button>
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

Logout = connect(mapStateToProps)(Logout);

