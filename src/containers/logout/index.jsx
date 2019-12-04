import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { auth } from '../../middleware/auth';
import { logout } from '../../actions/auth/logout';
import { Loading } from '../../components/loading';

export class LogoutContainer extends Component {
  logout = () => {
    this.props.post(this.props.accessToken);
  };

  render() {
    return (
      <div>
        {auth(this.props.accessToken)}
        {this.props.loading && <Loading />}
        <div className="c-container__padding">
          <h1>ログアウト</h1>
          <button
            type="button"
            className="c-button__white"
            onClick={this.logout}
          >
            ログアウト
          </button>
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
      dispatch(logout(payload));
    }
  };
}

export const Logout = connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoutContainer);

LogoutContainer.propTypes = {
  accessToken: PropTypes.string,
  status: PropTypes.string,
  post: PropTypes.func,
  loading: PropTypes.bool
};
