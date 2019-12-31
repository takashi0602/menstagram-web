import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalBack, ModalContainer } from './styled';

export class TwoChoiceModal extends Component {
  render() {
    return (
      <Modal>
        <ModalBack onClick={this.props.closeModal} />
        <ModalContainer className="p-4">
          <p className="text-left mb-5">{this.props.text}</p>
          <div className="d-flex justify-content-around">
            <button
              type="button"
              className="c-button__white"
              onClick={this.props.closeModal}
            >
              キャンセル
            </button>
            <button
              type="button"
              className="c-button__orange"
              onClick={this.props.submit}
            >
              {this.props.buttonName}
            </button>
          </div>
        </ModalContainer>
      </Modal>
    );
  }
}

TwoChoiceModal.propTypes = {
  text: PropTypes.string,
  buttonName: PropTypes.string,
  closeModal: PropTypes.func,
  submit: PropTypes.func
};
