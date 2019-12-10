import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../../middleware/auth';
import { TimelineHeader } from '../../components/timeline/header';
import { TimelinePostItem } from '../../components/timeline/post';

const sample = [
  {
    id: 1,
    text: '今週食べたラーメンです！',
    images: [
      'http://placehold.it/300/?text=ramen1',
      'http://placehold.it/400/?text=ramen2',
      'http://placehold.it/300x500/?text=ramen3',
      'http://placehold.it/500x300/?text=ramen4'
    ],
    user: {
      id: 'ramentaro',
      screen_name: 'ramentaro',
      avatar: 'http://placehold.it/300/'
    },
    liked: 5,
    is_liked: true,
    created_at: '2019/12/1',
    updated_at: '2019/12/2'
  },
  {
    id: 2,
    text: '今週食べたラーメンです！',
    images: ['http://placehold.it/500x500/?text=ramen'],
    user: {
      id: 'ramenjiro',
      screen_name: 'ramenjio',
      avatar: 'http://placehold.it/300/'
    },
    liked: 0,
    is_liked: false,
    created_at: '2019/12/2',
    updated_at: '2019/12/3'
  }
];

export class TimelineContainer extends Component {
  constructor(props) {
    super(props);
  }

  isPathPrivate = () => {
    return window.location.pathname === '/timeline/private';
  };

  postItems = () => {
    return sample.map(item => (
      <TimelinePostItem key={item.id} postItem={item} />
    ));
  };

  render() {
    return (
      <div>
        {auth(this.props.accessToken)}
        <TimelineHeader isPrivate={this.isPathPrivate()} />
        <div>{this.postItems()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    status: state.error.status,
    loading: state.loading.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPostList() {
      dispatch();
    }
  };
}

export const Timeline = connect(
  mapStateToProps,
  mapDispatchToProps
)(TimelineContainer);

Timeline.propTypes = {
  accessToken: PropTypes.string,
  status: PropTypes.number,
  loading: PropTypes.bool,
  getPostList: PropTypes.func
};
