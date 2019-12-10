import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { UserImage, EllipsisH, RamenImage, ImageArea, LikedHeartIcon, NotLikedIcon } from './styled';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

export class TimelinePostItem extends Component {
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
        <FontAwesomeIcon icon={solidHeart} style={LikedHeartIcon} />
        <span className="align-top">{number}</span>
      </div>
    );
  };

  showNotLikedPost = number => {
    return (
      <div>
        <FontAwesomeIcon icon={regularHeart} style={NotLikedIcon} />
        <span className="align-top">{number}</span>
      </div>
    );
  };

  render() {
    return (
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center py-2 px-3">
          <Link to="/" className="d-flex align-items-center c-link__black">
            <UserImage
              style={{
                backgroundImage: `url(${this.props.postItem.user.avatar})`
              }}
            />
            <div>{this.props.postItem.user.screen_name}</div>
          </Link>
          {/* TODO:クリック時モーダル表示 */}
          <FontAwesomeIcon icon={faEllipsisH} style={EllipsisH} />
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
              : this.showNotLikedPost(this.props.postItem.liked)
            }
            <div>{this.props.postItem.created_at}</div>
          </div>
          <p>{this.props.postItem.text}</p>
        </div>
      </div>
    );
  }
}

TimelinePostItem.propTypes = {
  postItem: PropTypes.object
};