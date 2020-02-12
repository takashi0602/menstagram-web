import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalBack,
  ModalContainer,
  ModalItem,
  ModalCancel
} from './styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWrench } from '@fortawesome/free-solid-svg-icons';

export class DetailModal extends Component {
  showItem = () => {
    return (
      <ModalItem className="py-3">
        {/* TODO: 実装後、リンク追加 */}
        {/*<Link to="/report" className="c-link__black">*/}
        {/*ラーメンじゃないよ報告*/}
        {/*</Link>*/}
        <div className="c-text__lightgray">
          ラーメンじゃないよ報告
          <FontAwesomeIcon icon={faWrench} style={{ marginLeft: '10px' }} />
        </div>
      </ModalItem>
    );
  };

  showTwoItem = () => {
    return (
      <div>
        <ModalItem>
          <Link
            to={`/slurp/${this.props.slurpId}`}
            className="c-link__black d-block py-3"
          >
            詳細へ移動
          </Link>
        </ModalItem>
        <ModalItem>
          {/* TODO: 実装後、リンク追加 */}
          {/*<Link to="/report" className="c-link__black d-block py-3">*/}
          {/*ラーメンじゃないよ報告*/}
          {/*</Link>*/}
          <div className="c-text__lightgray py-3">
            ラーメンじゃないよ報告
            <FontAwesomeIcon icon={faWrench} style={{ marginLeft: '10px' }} />
          </div>
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
            : this.showTwoItem(this.props.number)}
          <ModalCancel className="py-3" onClick={this.props.closeModal}>
            キャンセル
          </ModalCancel>
        </ModalContainer>
      </Modal>
    );
  }
}

DetailModal.propTypes = {
  number: PropTypes.number,
  closeModal: PropTypes.func,
  slurpId: PropTypes.number
};
