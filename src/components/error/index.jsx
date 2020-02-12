import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { failLogin } from '../../actions/auth/login';
import { persistor } from '../../store/index';

export class ComponentError extends Component {
  handle = status => {
    switch (status) {
      case 400:
        return <p className="text-danger">入力データに誤りがあります。</p>;
      case 401:
        persistor.purge();
        this.props.delete();
        return;
      case 406:
        return (
          <p className="text-danger">
            選択された画像はラーメンではありません。
          </p>
        );
      default:
        return <p className="text-danger">エラーが発生しました。</p>;
    }
  };

  render() {
    return <div>{this.handle(this.props.status)}</div>;
  }
}

function mapDispatchToProps(dispatch) {
  return {
    delete() {
      dispatch(failLogin());
    }
  };
}

export const Error = connect(
  null,
  mapDispatchToProps
)(ComponentError);

ComponentError.propTypes = {
  status: PropTypes.number,
  delete: PropTypes.func
};
