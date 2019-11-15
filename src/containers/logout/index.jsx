import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from "../../middleware/auth";
import { logout } from "../../actions/auth/logout";

export class Logout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const logout = () => {
      this.props.post(this.props.accessToken);
    };

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

function mapDispatchToProps(dispatch) {
  return {
    post(payload) {
      dispatch(logout(payload));
    }
  }
}

Logout = connect(mapStateToProps, mapDispatchToProps)(Logout);

