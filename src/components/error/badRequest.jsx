import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { nl2br, hasProp } from '../../helpers';

export class ErrorMessage extends Component {
  getErrorMassage = () => {
    if (
      !Object.keys(this.props.errors).length ||
      !hasProp(this.props.errors, this.props.keyName)
    )
      return null;
    if (typeof this.props.errors[this.props.keyName] === 'string') {
      return (
        <p className="text-danger">{this.props.errors[this.props.keyName]}</p>
      );
    }
    if (this.props.errors[this.props.keyName].length === 1) {
      return (
        <p className="text-danger">
          {this.props.errors[this.props.keyName][0]}
        </p>
      );
    }
    let message = '';
    for (let error of this.props.errors[this.props.keyName]) {
      message = `${message}${error}\n`;
    }
    return (
      <p
        className="text-danger"
        dangerouslySetInnerHTML={{
          __html: nl2br(message)
        }}
      />
    );
  };

  render() {
    return this.getErrorMassage();
  }
}

ErrorMessage.propTypes = {
  errors: PropTypes.object,
  keyName: PropTypes.string
};
