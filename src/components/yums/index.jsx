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
  YumIcon,
  NotYumIcon,
  faUserIcon
} from './styled';
import { DetailModal } from '../../components/modal/detail';
import { express } from '../../helpers';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

export class YumsItem extends Component {
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

  showYum = number => {
    return (
      <div>
        <span onClick={this.unyum}>
          <FontAwesomeIcon icon={solidHeart} style={YumIcon} />
        </span>
        <span className="align-top">{number}</span>
      </div>
    );
  };

  showUnyum = number => {
    return (
      <div>
        <span onClick={this.yum}>
          <FontAwesomeIcon icon={regularHeart} style={NotYumIcon} />
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

  yum = () => {
    return this.props.yum(this.props.slurpItem.id, this.props.index);
  };

  unyum = () => {
    return this.props.unyum(this.props.slurpItem.id, this.props.index);
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
              ? this.showYum(this.props.slurpItem.yum_count)
              : this.showUnyum(this.props.slurpItem.yum_count)}
            <div>{this.props.slurpItem.created_at}</div>
          </div>
          <p
            className="text-break"
            dangerouslySetInnerHTML={{
              __html: express(this.props.slurpItem.text, false)
            }}
          />
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

YumsItem.propTypes = {
  slurpItem: PropTypes.object,
  yum: PropTypes.func,
  unyum: PropTypes.func,
  index: PropTypes.number
};
