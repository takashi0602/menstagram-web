import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { auth } from '../../middleware/auth';
import { logout } from '../../actions/auth/logout';
import { Loading } from '../../components/loading';
import { Error } from '../../components/error';

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
          {this.props.status && <Error status={this.props.status} />}
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
    status: state.error.status,
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
  status: PropTypes.number,
  post: PropTypes.func,
  loading: PropTypes.bool
};
