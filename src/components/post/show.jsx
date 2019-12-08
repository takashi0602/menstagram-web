import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faHeart } from '@fortawesome/free-solid-svg-icons';

import { Relative, UserName, Menu, Like, MoreUser } from './styled';

export class Post extends Component {
  render() {
    const created = new Date(this.props.post.created_at);

    function ToggleView(props) {
      if (props.isTimeline) {
        // タイムライン
        return (
          <div>
            <div className="mt-4 d-flex justify-content-between">
              <span>
                <FontAwesomeIcon icon={faHeart} style={Like} />
                {props.post.liked}
              </span>
              <span>{created.toLocaleDateString()}</span>
            </div>
            <div>{props.post.text}</div>
          </div>
        );
      } else {
        // 詳細表示
        return (
          <div>
            <h6 className="mt-4">{created.toLocaleDateString()}</h6>
            <p>{props.post.text}</p>
            <span className="mr-1">
              <FontAwesomeIcon icon={faHeart} style={Like} />
              {props.post.liked}
            </span>
            {props.likers.map((user, idx) => {
              if (idx < 5) {
                return (
                  <Link key={idx} to={'/user/' + user.id}>
                    <img
                      alt="avatar"
                      src={user.user.avatar}
                      height="23px"
                      width="23px"
                      className="rounded-circle border mr-1"
                    />
                  </Link>
                );
              } else {
                return (
                  <Link
                    key={idx}
                    to={'/liker/' + props.post.id}
                    style={MoreUser}
                  >
                    ...
                  </Link>
                );
              }
            })}
          </div>
        );
      }
    }
    return (
      <Relative>
        <div>
          <div className="py-3 px-4 border-bottom d-flex justify-content-between">
            <Link
              to={'/user/' + this.props.post.user.id}
              className="text-dark"
              style={UserName}
            >
              <img
                src={this.props.post.user.avatar}
                alt="user-icon"
                height="38px"
                width="38px"
                className="rounded-circle border"
              />
              <span className="ml-3 h5">
                {this.props.post.user.screen_name}
              </span>
            </Link>
            <FontAwesomeIcon
              className="text-right"
              icon={faEllipsisH}
              style={Menu}
            />
          </div>

          <div className="px-0">
            <div
              id="carouselExampleControls"
              className="carousel slide"
              data-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className="d-block w-100"
                    src={this.props.post.images[0]}
                    alt="First slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src={this.props.post.images[1]}
                    alt="Second slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src={this.props.post.images[2]}
                    alt="Third slide"
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleControls"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleControls"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>

            <div className="px-3 pb-3">
              <ToggleView
                isTimeline={this.props.isTimeline}
                post={this.props.post}
                likers={this.props.likers}
              />
            </div>
          </div>
        </div>
      </Relative>
    );
  }
}

Post.propTypes = {
  isTimeline: PropTypes.bool,
  parentRoute: PropTypes.string,
  post: PropTypes.object,
  likers: PropTypes.array
};
