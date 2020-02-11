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

export class TimelineSlurpItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

  showImage = image => {
    return (
      <div className="text-center">
        <RamenImage
          src={image}
          alt="ラーメン"
          onError={e => this.imageError(e)}
        />
      </div>
    );
  };

  showImageSlick = images => {
    return (
      <Slider {...sliderSettings}>
        {images.map((image, index) => {
          return (
            <div key={index} className="text-center">
              <RamenImage
                src={image}
                alt="ラーメン"
                onError={e => this.imageError(e)}
              />
            </div>
          );
        })}
      </Slider>
    );
  };

  showYumItem = number => {
    return (
      <div>
        <span
          onClick={() =>
            this.props.unyum(this.props.slurpItem.id, this.props.index)
          }
        >
          <FontAwesomeIcon icon={solidHeart} style={LikedHeartIcon} />
        </span>
        <span className="align-top">{number}</span>
      </div>
    );
  };

  showUnyumItem = number => {
    return (
      <div>
        <span
          onClick={() =>
            this.props.yum(this.props.slurpItem.id, this.props.index)
          }
        >
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
    return this.props.slurpItem.user.avatar ? (
      <UserImage
        style={{
          backgroundImage: `url(${this.props.slurpItem.user.avatar})`
        }}
      />
    ) : (
      <UserImage>
        <FontAwesomeIcon icon={faUser} style={faUserIcon} />
      </UserImage>
    );
  };

  imageError = e => {
    return (e.target.src = 'http://placehold.it/500/?text=NotFound');
  };

  render() {
    return (
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center py-2 px-3">
          <Link
            to={`/user/${this.props.slurpItem.user.user_id}`}
            className="d-flex align-items-center c-link__black"
          >
            {this.setUserImage()}
            <div>{this.props.slurpItem.user.user_name}</div>
          </Link>
          <div onClick={() => this.openModal()}>
            <FontAwesomeIcon icon={faEllipsisH} style={EllipsisH} />
          </div>
        </div>
        <ImageArea className="mb-3">
          {this.props.slurpItem.images.length === 1
            ? this.showImage(this.props.slurpItem.images[0])
            : this.showImageSlick(this.props.slurpItem.images)}
        </ImageArea>
        <div className="px-3">
          <div className="d-flex justify-content-between mb-2">
            {this.props.slurpItem.is_yum
              ? this.showYumItem(this.props.slurpItem.yum_count)
              : this.showUnyumItem(this.props.slurpItem.yum_count)}
            <div>{this.props.slurpItem.created_at}</div>
          </div>
          <p>{this.props.slurpItem.text}</p>
        </div>
        {this.state.showModal && (
          <DetailModal
            number={2}
            closeModal={this.closeModal}
            slurpId={this.props.slurpItem.id}
          />
        )}
      </div>
    );
  }
}

TimelineSlurpItem.propTypes = {
  slurpItem: PropTypes.object,
  yum: PropTypes.func,
  unyum: PropTypes.func,
  index: PropTypes.number
};