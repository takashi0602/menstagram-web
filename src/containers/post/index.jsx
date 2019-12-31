import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { PostButton, PostLabel, RenderImage, Times, TimesIcon } from './styled';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../../middleware/auth';
import { post, failPost } from '../../actions/post';
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
      errorFileFormat: false
    };
  }

  uploadImages = e => {
    this.setState({ errorFile: false });
    this.setState({ errorFileFormat: false });
    if (e.target.files && !e.target.files[0].type.startsWith('image')) {
      this.setState({ errorFileFormat: true });
      return;
    }
    const files = this.state.files;
    files.push(e.target.files[0]);
    this.setState({ files: files });
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
    const createObjectURL =
      (window.URL || window.webkitURL).createObjectURL ||
      window.createObjectURL;
    return files.map((file, index) => {
      return (
        <li key={index} className="list-unstyled w-50 mb-2">
          <div className="position-relative px-2">
            <RenderImage
              style={{ backgroundImage: `url('${createObjectURL(file)}')` }}
            />
            <Times onClick={() => this.deleteFile(index)}>
              <FontAwesomeIcon icon={faTimesCircle} style={TimesIcon} />
            </Times>
          </div>
        </li>
      );
    });
  };

  deleteFile = index => {
    const files = this.state.files;
    files.splice(index, 1);
    this.setState({ files: files });
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

  render() {
    return (
      <div>
        {auth(this.props.accessToken)}
        {this.props.loading && <Loading />}
        {this.props.success && this.postSuccess()}
        <div className="position-relative py-3 border-bottom mb-3">
          <div className="text-center">投稿</div>
          <PostButton type="button" onClick={() => this.sendImages()}>
            投稿する
          </PostButton>
        </div>
        <div className="c-container__padding">
          {this.props.status && <Error status={this.props.status} />}
          <textarea
            className="c-form__textArea mb-3"
            rows="4"
            placeholder="文章を記入してください"
            onChange={e => {
              this.changeText(e);
            }}
          />
          {this.state.errorText && (
            <p className="text-danger">256文字以下で入力してください。</p>
          )}
          {this.state.files.length <= 3 && (
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
          )}
          {this.state.errorFile && (
            <p className="text-danger">画像は必須です。</p>
          )}
          {this.state.errorFileFormat && (
            <p className="text-danger">画像のみ選択できます。</p>
          )}
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
    success: state.post.success
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postImages(payload, accessToken) {
      dispatch(post(payload, accessToken));
    },
    changeSuccessValue() {
      dispatch(failPost());
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
  changeSuccessValue: PropTypes.func
};
