import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import titleSvg from '../../assets/images/title.svg';
import { Form } from '../../components/form';
import { register } from '../../actions/auth/register';
import { noAuth } from '../../middleware/auth';

export class RegisterContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="c-container__padding">
        {noAuth(this.props.accessToken)}
        <div className="text-center pt-5 mb-5">
          <img src={titleSvg} alt="Menstagram" />
        </div>
        <Form
          formName="register"
          post={payload => this.props.post(payload)}
          status={this.props.status}
        />
        <div className="mb-3">
          <p className="mb-0">アカウントをお持ちですか？</p>
          <Link to="/login">ログインする</Link>
        </div>
        <Link to="/">トップへ戻る</Link>
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
  post: PropTypes.func
};
