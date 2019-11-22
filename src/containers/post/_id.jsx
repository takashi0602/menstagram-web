import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faEllipsisH,
  faHeart
} from '@fortawesome/free-solid-svg-icons';
import { BackButton, UserName, Menu, Like } from './styled';

export class PostDetail extends Component {
  render() {
    const parent_route = '/post';
    const data = {
      id: this.props.match.params.id,
      text:
        'Eum consequatur magnam laboriosam cumque blanditiis consequatur est in. Enim veniam fuga iure odio qui dolorem impedit alias. Itaque veniam odit aut. Provident eum sint quia rem impedit.',
      images: [
        'http://placehold.it/300x300?text=1',
        'http://placehold.it/300x300?text=2',
        'http://placehold.it/300x300?text=3',
        'http://placehold.it/300x300?text=4'
      ],
      liked: 1,
      user: {
        id: 1,
        user_id: 'J4N1AmVPxT',
        screen_name: 'user_name',
        avatar: 'http://placehold.it/100x100/?text=Icon'
      },
      created_at: '2019-11-18T13:52:25.000000Z',
      updated_at: '2019-11-18T13:52:25.000000Z'
    };
    const likers = [
      {
        id: 1,
        user: {
          user_id: 'abc',
          screen_name: 'test1',
          avatar: 'http://placehold.it/100x100/?text=Icon'
        }
      },
      {
        id: 2,
        user: {
          user_id: 'def',
          screen_name: 'test2',
          avatar: 'http://placehold.it/100x100/?text=Icon'
        }
      },
      {
        id: 3,
        user: {
          user_id: 'ghi',
          screen_name: 'test3',
          avatar: 'http://placehold.it/100x100/?text=Icon'
        }
      },
      {
        id: 4,
        user: {
          user_id: 'jkl',
          screen_name: 'test4',
          avatar: 'http://placehold.it/100x100/?text=Icon'
        }
      }
    ];
    const created = new Date(data.created_at);
    return (
      <div>
        <header className="py-3 px-3 border-bottom d-flex justify-content-between">
          <Link className="text-left" to={parent_route}>
            <FontAwesomeIcon icon={faChevronLeft} style={BackButton} />
          </Link>
          <h1 className="h5 mb-0 text-center">投稿</h1>
          <span></span>
        </header>
        <div className="py-3 px-4 border-bottom d-flex justify-content-between">
          <Link
            to={'/user/' + data.user.id}
            className="text-dark"
            style={UserName}
          >
            <img
              src={data.user.avatar}
              alt="user-icon"
              height="38px"
              width="38px"
              className="rounded-circle border"
            />
            <span className="ml-3 h5">{data.user.screen_name}</span>
          </Link>
          <FontAwesomeIcon
            className="text-right"
            icon={faEllipsisH}
            style={Menu}
          />
        </div>

        <div className="px-5">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  className="d-block w-100"
                  src={data.images[0]}
                  alt="First slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={data.images[1]}
                  alt="Second slide"
                />
              </div>
              <div className="carousel-item">
                <img
                  className="d-block w-100"
                  src={data.images[2]}
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

          <h6 className="mt-4">{created.toLocaleDateString()}</h6>

          <p>{data.text}</p>
          <span className="mr-1">
            <FontAwesomeIcon icon={faHeart} style={Like} />
            {data.liked}
          </span>
          {likers.map((user, idx) => {
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
          })}
        </div>
      </div>
    );
  }
}
