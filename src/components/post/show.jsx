import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEllipsisH, faHeart, faUser} from '@fortawesome/free-solid-svg-icons';
import { Like, ImageArea, RamenImage, UserImage, EllipsisH, faUserIcon, LikerImage, LikerIcon } from './styled';
import { DetailModal } from "../modal/detail";
import Slider from 'react-slick';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

export class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
  }

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

  postDetails = () => {
    return (
      <div className="px-3">
        <div>{this.props.postItem.created_at}</div>
        <p>{this.props.postItem.text}</p>
        <div className="d-flex align-items-center">
          <FontAwesomeIcon icon={faHeart} style={Like} />
          <div className="mr-2">{this.props.postItem.liked}</div>
          {this.showLiker()}
        </div>
      </div>
    );
  };

  showLiker = () => {
    const likerList = this.props.likers.map((liker) => {
      return (
        <Link key={liker.user.user_id} to={'/profile/' + liker.user.user_id}>
          {liker.user.avatar
            ? <LikerImage style={{backgroundImage: `url(${liker.user.avatar})`}} />
            : (<LikerImage>
                <FontAwesomeIcon icon={faUser} style={LikerIcon} />
              </LikerImage>)}
        </Link>
      );
    });
    if (this.props.postItem.liked > 5) {
      likerList.push(
        <Link key={'more'} to={'/liker/' + this.props.postItem.id} className="c-link__black">
          ...
        </Link>
      )
    }
    return likerList
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

        <div>
          <ImageArea className="mb-3">
            {this.props.postItem.images.length === 1
              ? this.showImage(this.props.postItem.images[0])
              : this.showImageSlick(this.props.postItem.images)}
          </ImageArea>
          {this.postDetails()}
        </div>
        {this.state.showModal && (
          <DetailModal
            number={1}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}

Post.propTypes = {
  parentRoute: PropTypes.string,
  postItem: PropTypes.object,
  likers: PropTypes.array
};
