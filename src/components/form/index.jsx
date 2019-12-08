import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
  import { Absolute, Eye, Relative } from './styled';

export class Form extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      iconName: faEye
    };
  }

  render() {
    const showPassword = () => {
      this.state.iconName === faEye
        ? this.setState({ iconName: faEyeSlash })
        : this.setState({ iconName: faEye });
    };

    const checkInputType = () => {
      return this.state.iconName === faEye ? 'password' : 'text';
    };

    return (
      <Relative>
        <input
          type={checkInputType()}
          className="c-form"
          placeholder="パスワード"
          value={this.props.password}
          onChange={e => this.props.changeForm('password', e)}
        />
        <Absolute onClick={showPassword}>
          <FontAwesomeIcon icon={this.state.iconName} style={Eye} />
        </Absolute>
      </Relative>
    );
  }
}

Form.propTypes = {
  password: PropTypes.string,
  changeForm: PropTypes.func
};
