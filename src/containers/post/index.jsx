import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import {
  PostButton,
  DisabledPostButton,
  PostLabel,
  RenderImage,
  Times,
  TimesIcon,
  PostLabelDisabled
} from './styled';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../../middleware/auth';
import { post, failPost } from '../../actions/post';
import { notError } from '../../actions/error';
import { Loading } from '../../components/loading';
import { Redirect } from 'react-router-dom';
import { Error } from '../../components/error';

export class PostConatiner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      text: '',
      errorFile: false,
      errorText: false,
      errorFileFormat: false,
      errorFileCount: false
    };
  }

  uploadImages = e => {
    this.setState({ errorFile: false });
    this.setState({ errorFileFormat: false });
    this.setState({ errorFileCount: false });

    const total = this.state.files.length + e.target.files.length;
    if (total > 4) {
      this.setState({ errorFileCount: true });
      return;
    }

    const files = this.state.files;
    let errorFileFormat = false;
    for (let file of e.target.files) {
      if (!file.type.startsWith('image')) {
        console.log('画像じゃない');
        errorFileFormat = true;
      } else {
        files.push(file);
      }
    }

    if (errorFileFormat) {
      this.setState({ errorFileFormat: errorFileFormat });
    } else {
      this.setState({ files: files });
    }
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
    this.props.postImages(payload, this.props.accessToken);
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

  postSuccess = () => {
    this.props.changeSuccessValue();
    return <Redirect to={'/timeline/private'} />;
  };

  showActiveButton = () => {
    return (
      <PostButton type="button" onClick={() => this.sendImages()}>
        投稿する
      </PostButton>
    );
  };

  showNotActiveButton = () => {
    return <DisabledPostButton type="button">投稿する</DisabledPostButton>;
  };

  showInputFile = () => {
    if (this.state.files.length >= 4) {
      return <PostLabelDisabled>画像を追加する</PostLabelDisabled>;
    }
    return (
      <div>
        <PostLabel htmlFor="postImage">画像を追加する</PostLabel>
        <input
          id="postImage"
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
      errorMessages.push(<p className="text-danger">256文字以下で入力してください。</p>);
    if (this.state.errorFile)
      errorMessages.push(<p className="text-danger">画像は必須です。</p>);
    if (this.state.errorFileFormat)
      errorMessages.push(<p className="text-danger">画像のみ選択できます。</p>);
    if (this.state.errorFileCount)
      errorMessages.push(<p className="text-danger">画像は4枚まで選択可能です。</p>);

    if (errorMessages.length !== 0) {
      return (
        <div>
          {errorMessages.map(errorMessage => errorMessage)}
        </div>
      );
    }
    return null;
  };

  render() {
    return (
      <div>
        {auth(this.props.accessToken)}
        {this.props.loading && <Loading />}
        {this.props.success && this.postSuccess()}
        <div className="position-relative py-3 border-bottom mb-3">
          <div className="text-center">投稿</div>
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
    success: state.post.success,
    isRamens: state.post.isRamens
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postImages(payload, accessToken) {
      dispatch(post(payload, accessToken));
    },
    changeSuccessValue() {
      dispatch(failPost());
    },
    initErrorStatus() {
      dispatch(notError());
    }
  };
}

export const Post = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostConatiner);

PostConatiner.propTypes = {
  accessToken: PropTypes.string,
  status: PropTypes.number,
  loading: PropTypes.bool,
  postImages: PropTypes.func,
  success: PropTypes.bool,
  changeSuccessValue: PropTypes.func,
  isRamens: PropTypes.array,
  initErrorStatus: PropTypes.func
};
