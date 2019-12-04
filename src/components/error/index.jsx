import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { failLogin } from '../../actions/auth/login'
import { persistor } from '../../store/index';

export class Error extends Component {
  handle = (status) => {
    switch (status) {
      case 400:
        return <p className="text-danger">入力データに誤りがあります。</p>;
      case 401:
        persistor.purge();
        this.props.delete();
        return;
      default:
        return <p className="text-danger">エラーが発生しました。</p>
    }
  };

  render() {
    return (
      <div>
        { this.handle(this.props.status) }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    delete() {
      dispatch(failLogin());
    }
  };
}

Error = connect(
  null,
  mapDispatchToProps
)(Error);

Error.propTypes = {
  status: PropTypes.number,
  delete: PropTypes.func
};
