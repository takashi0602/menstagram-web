import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import {
  SlurpButton,
  DisabledSlurpButton,
  SlurpLabel,
  RenderImage,
  Times,
  TimesIcon,
  SlurpLabelDisabled
} from './styled';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../../middleware/auth';
import { slurp, failSlurp } from '../../actions/slurp';
import { notError } from '../../actions/error';
import { Loading } from '../../components/loading';
import { Redirect } from 'react-router-dom';
import { Error } from '../../components/error';

export class SlurpConatiner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      text: '',
      errorFile: false,
      errorText: false,
      errorFileFormat: false,
      errorFileCount: false,
      errorFileSize: false
    };
  }

  uploadImages = e => {
    this.setState({ errorFile: false });
    this.setState({ errorFileFormat: false });
    this.setState({ errorFileCount: false });
    this.setState({ errorFileSize: false });

    const total = this.state.files.length + e.target.files.length;
    if (total > 4) {
      this.setState({ errorFileCount: true });
      return;
    }

    const files = [];
    let errorFileFormat = false;
    let errorFileSize = false;
    for (let file of e.target.files) {
      if (!file.type.startsWith('image')) {
        errorFileFormat = true;
        this.setState({ errorFileFormat: true });
      } else if (file.size > 5120000) {
        errorFileSize = true;
        this.setState({ errorFileSize: true });
      } else {
        files.push(file);
      }
    }

    if (errorFileFormat || errorFileSize) return;
    this.setState({ files: this.state.files.concat(files) });
  };

  // TODO: 再レンダリングの際に画像も再レンダリングされる現象を解消
  changeText = e => {
    this.setState({ errorText: false });
    this.setState({ text: e.target.value });
    if (e.target.value.length > 256) {
      this.setState({ errorText: true });
    }
  };

  readerImages = () => {
    const files = this.state.files;
    return (
      <ul className="d-flex flex-wrap justify-content-between p-0">
        {this.mapImages(files)}
      </ul>
    );
  };

  mapImages = files => {
    const isRamen = this.props.status !== 406;
    return files.map((file, index) => {
      return (
        <li key={index} className="list-unstyled w-50 mb-2">
          <div className="position-relative px-2">
            {isRamen
              ? this.renderImage(file)
              : this.renderNotRamenImage(file, index)}
            <Times onClick={() => this.deleteFile(index)}>
              <FontAwesomeIcon icon={faTimesCircle} style={TimesIcon} />
            </Times>
          </div>
        </li>
      );
    });
  };

  renderImage = file => {
    const createObjectURL =
      (window.URL || window.webkitURL).createObjectURL ||
      window.createObjectURL;
    return (
      <RenderImage
        style={{ backgroundImage: `url('${createObjectURL(file)}')` }}
      />
    );
  };

  renderNotRamenImage = (file, idx) => {
    const createObjectURL =
      (window.URL || window.webkitURL).createObjectURL ||
      window.createObjectURL;
    if (this.props.isRamens[idx]) {
      return (
        <RenderImage
          style={{ backgroundImage: `url('${createObjectURL(file)}')` }}
        />
      );
    } else {
      return (
        <RenderImage
          style={{
            backgroundImage: `url('${createObjectURL(file)}')`,
            border: 'solid 5px red',
            borderRadius: '5px'
          }}
        />
      );
    }
  };

  deleteFile = index => {
    this.setState({ errorFile: false });
    this.setState({ errorFileFormat: false });
    this.setState({ errorFileCount: false });
    this.setState({ errorFileSize: false });

    const files = this.state.files;
    files.splice(index, 1);
    this.setState({ files: files });
    if (this.props.isRamens.length !== 0) {
      this.props.isRamens.splice(index, 1);
      const isRamen = this.props.isRamens.filter(isRamen => isRamen === false);
      if (isRamen.length === 0) this.props.initErrorStatus();
    }
  };

  sendImages = () => {
    if (this.validation()) return;
    const formData = new FormData();
    const files = this.state.files;
    files.map((file, index) => {
      return formData.append(`image${index + 1}`, file);
    });
    const payload = {
      formData,
      text: this.state.text
    };
    this.props.slurpImages(payload, this.props.accessToken);
  };

  validation = () => {
    let validation = false;
    this.setState({ errorFile: false });
    this.setState({ errorText: false });
    if (!this.state.files.length) {
      this.setState({ errorFile: true });
      validation = true;
    }
    if (this.state.text.length > 256) {
      this.setState({ errorText: true });
      validation = true;
    }
    return validation;
  };

  slurpSuccess = () => {
    this.props.changeSuccessValue();
    return <Redirect to={'/timeline/private'} />;
  };

  showActiveButton = () => {
    return (
      <SlurpButton type="button" onClick={() => this.sendImages()}>
        スラープする
      </SlurpButton>
    );
  };

  showNotActiveButton = () => {
    return <DisabledSlurpButton type="button">スラープする</DisabledSlurpButton>;
  };

  showInputFile = () => {
    if (this.state.files.length >= 4) {
      return <SlurpLabelDisabled>画像を追加する</SlurpLabelDisabled>;
    }
    return (
      <div>
        <SlurpLabel htmlFor="slurpImage">画像を追加する</SlurpLabel>
        <input
          id="slurpImage"
          type="file"
          className="d-none"
          accept="image/*"
          multiple
          onChange={e => {
            this.uploadImages(e);
          }}
          onClick={e => {
            e.target.value = '';
          }}
        />
      </div>
    );
  };

  showErrorMessage = () => {
    let errorMessages = [];
    if (this.state.errorText)
      errorMessages.push(
        <p className="text-danger">256文字以下で入力してください。</p>
      );
    if (this.state.errorFile)
      errorMessages.push(<p className="text-danger">画像は必須です。</p>);
    if (this.state.errorFileFormat)
      errorMessages.push(<p className="text-danger">画像のみ選択できます。</p>);
    if (this.state.errorFileCount)
      errorMessages.push(
        <p className="text-danger">画像は4枚まで選択可能です。</p>
      );
    if (this.state.errorFileSize)
      errorMessages.push(
        <p className="text-danger">画像1枚のサイズは5MBが上限です。</p>
      );

    if (errorMessages.length !== 0) {
      return <div>{errorMessages.map(errorMessage => errorMessage)}</div>;
    }
    return null;
  };

  render() {
    return (
      <div>
        {auth(this.props.accessToken)}
        {this.props.loading && <Loading />}
        {this.props.success && this.slurpSuccess()}
        <div className="position-relative py-3 border-bottom mb-3">
          <div className="text-center">新規スラープ</div>
          {this.state.files.length === 0 || this.props.status
            ? this.showNotActiveButton()
            : this.showActiveButton()}
        </div>
        <div className="c-container__padding">
          {this.props.status && <Error status={this.props.status} />}
          {this.showErrorMessage()}
          <textarea
            className="c-form__textArea mb-3"
            rows="4"
            placeholder="ラーメンをシェアしよう！"
            onChange={e => {
              this.changeText(e);
            }}
          />
          {this.showInputFile()}
          {this.state.files.length !== 0 && this.readerImages()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    status: state.error.status,
    loading: state.loading.loading,
    success: state.slurp.success,
    isRamens: state.slurp.isRamens
  };
}

function mapDispatchToProps(dispatch) {
  return {
    slurpImages(payload, accessToken) {
      dispatch(slurp(payload, accessToken));
    },
    changeSuccessValue() {
      dispatch(failSlurp());
    },
    initErrorStatus() {
      dispatch(notError());
    }
  };
}

export const Slurp = connect(
  mapStateToProps,
  mapDispatchToProps
)(SlurpConatiner);

SlurpConatiner.propTypes = {
  accessToken: PropTypes.string,
  status: PropTypes.number,
  loading: PropTypes.bool,
  slurpImages: PropTypes.func,
  success: PropTypes.bool,
  changeSuccessValue: PropTypes.func,
  isRamens: PropTypes.array,
  initErrorStatus: PropTypes.func
};
