import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisH,
  faUser,
  faHeart as solidHeart
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import {
  yumHeart,
  unyumHeart,
  ImageArea,
  RamenImage,
  UserImage,
  EllipsisH,
  faUserIcon,
  YumsImage,
  YumsIcon,
  SlurpText
} from './styled';
import { DetailModal } from '../modal/detail';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { express } from '../../helpers';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

export class SlurpComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

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

  slurpDetails = () => {
    return (
      <div className="c-container__padding">
        <div className="d-flex align-items-center mb-1">
          {this.showHeartIcon()}
          <div className="mr-2">{this.props.slurpItem.yum_count}</div>
          {this.showYums()}
        </div>
        <div className="mb-3">{this.props.slurpItem.created_at}</div>
        <SlurpText
          dangerouslySetInnerHTML={{
            __html: express(this.props.slurpItem.text, false)
          }}
        />
      </div>
    );
  };

  showHeartIcon = () => {
    if (this.props.slurpItem.is_yum) {
      return (
        <span onClick={this.props.unyum}>
          <FontAwesomeIcon icon={solidHeart} style={yumHeart} />
        </span>
      );
    }
    return (
      <span onClick={this.props.yum}>
        <FontAwesomeIcon icon={regularHeart} style={unyumHeart} />
      </span>
    );
  };

  showYums = () => {
    if (this.props.slurpItem.yums.length === 0) return;
    const yums = this.props.slurpItem.yums.map(user => {
      return (
        <Link key={user.user_id} to={`/user/${user.user_id}`}>
          {user.avatar ? (
            <YumsImage style={{ backgroundImage: `url(${user.avatar})` }} />
          ) : (
            <YumsImage>
              <FontAwesomeIcon icon={faUser} style={YumsIcon} />
            </YumsImage>
          )}
        </Link>
      );
    });
    if (this.props.slurpItem.yum_count > 5) {
      yums.push(
        <Link
          key={'more'}
          to={`/slurp/${this.props.slurpItem.id}/yums`}
          className="c-link__black"
        >
          ...
        </Link>
      );
    }
    return yums;
  };

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

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    return (
      <div>
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

        <div>
          <ImageArea className="mb-3">
            {this.props.slurpItem.images.length === 1
              ? this.showImage(this.props.slurpItem.images[0])
              : this.showImageSlick(this.props.slurpItem.images)}
          </ImageArea>
          {this.slurpDetails()}
        </div>
        {this.state.showModal && (
          <DetailModal number={1} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}

SlurpComponent.propTypes = {
  slurpItem: PropTypes.object,
  yum: PropTypes.func,
  unyum: PropTypes.func
};
