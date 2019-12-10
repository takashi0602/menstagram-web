import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal, ModalBack, ModalContainer, ModalItem, ModalCancel } from './styled';

export class DetailModal extends Component {
  showItem = () => {
    return (
      <ModalItem className="py-3">
        {/* TODO: リンク先 */}
        <Link to="" className="c-link__black">
          ラーメンじゃないよ報告
        </Link>
      </ModalItem>
    );
  };

  showTwoItem = () => {
    return (
      <div>
        <ModalItem>
          <Link to={`/post/${this.props.postId}`} className="c-link__black d-block py-3">
            投稿詳細
          </Link>
        </ModalItem>
        <ModalItem>
          {/* TODO: リンク先 */}
          <Link to="/" className="c-link__black d-block py-3">
            ラーメンじゃないよ報告
          </Link>
        </ModalItem>
      </div>
    );
  };

  render() {
    return (
      <Modal>
        <ModalBack onClick={this.props.closeModal} />
        <ModalContainer>
          {this.props.number === 1
            ? this.showItem(this.props.number)
            : this.showTwoItem(this.props.number)
          }
          <ModalCancel className="py-3" onClick={this.props.closeModal}>キャンセル</ModalCancel>
        </ModalContainer>
      </Modal>
    );
  }
}

DetailModal.propTypes = {
  number: PropTypes.number,
  closeModal: PropTypes.func,
  postId: PropTypes.number
};
