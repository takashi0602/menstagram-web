import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faEllipsisH,
  faHeart as solidHeart
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  UserImage,
  EllipsisH,
  RamenImage,
  ImageArea,
  LikedHeartIcon,
  NotLikedIcon,
  faUserIcon
} from './styled';
import { DetailModal } from '../../components/modal/detail';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

export class LikePostItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  showImage = image => {
    return <RamenImage style={{ backgroundImage: `url(${image})` }} />;
  };

  showImageSlick = images => {
    return (
      <Slider {...sliderSettings}>
        {images.map((image, index) => {
          return (
            <div key={index}>
              <RamenImage style={{ backgroundImage: `url(${image})` }} />
            </div>
          );
        })}
      </Slider>
    );
  };

  showLikePost = number => {
    return (
      <div>
        <span onClick={this.notLikePost}>
          <FontAwesomeIcon icon={solidHeart} style={LikedHeartIcon} />
        </span>
        <span className="align-top">{number}</span>
      </div>
    );
  };

  showNotLikedPost = number => {
    return (
      <div>
        <span onClick={this.likePost}>
          <FontAwesomeIcon icon={regularHeart} style={NotLikedIcon} />
        </span>
        <span className="align-top">{number}</span>
      </div>
    );
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  setUserImage = () => {
    return this.props.postItem.user.avatar ? (
      <UserImage
        style={{
          backgroundImage: `url(${this.props.postItem.user.avatar})`
        }}
      />
    ) : (
      <UserImage>
        <FontAwesomeIcon icon={faUser} style={faUserIcon} />
      </UserImage>
    );
  };

  likePost = () => {
    return this.props.likePost(this.props.postItem.id);
  };

  notLikePost = () => {
    return this.props.notLikePost(this.props.postItem.id);
  };

  render() {
    return (
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center py-2 px-3">
          <Link
            to={`/profile/${this.props.postItem.user.user_id}`}
            className="d-flex align-items-center c-link__black"
          >
            {this.setUserImage()}
            <div>{this.props.postItem.user.screen_name}</div>
          </Link>
          <div onClick={() => this.openModal()}>
            <FontAwesomeIcon icon={faEllipsisH} style={EllipsisH} />
          </div>
        </div>
        <ImageArea className="mb-3">
          {this.props.postItem.images.length === 1
            ? this.showImage(this.props.postItem.images[0])
            : this.showImageSlick(this.props.postItem.images)}
        </ImageArea>
        <div className="px-3">
          <div className="d-flex justify-content-between mb-2">
            {this.props.postItem.is_liked
              ? this.showLikePost(this.props.postItem.liked)
              : this.showNotLikedPost(this.props.postItem.liked)}
            <div>{this.props.postItem.created_at}</div>
          </div>
          <p>{this.props.postItem.text}</p>
        </div>
        {this.state.showModal && (
          <DetailModal
            number={2}
            closeModal={this.closeModal}
            postId={this.props.postItem.id}
          />
        )}
      </div>
    );
  }
}

LikePostItem.propTypes = {
  postItem: PropTypes.object,
  likePost: PropTypes.func,
  notLikePost: PropTypes.func
};
