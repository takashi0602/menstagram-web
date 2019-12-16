import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../../middleware/auth';
import { TimelineHeader } from '../../components/timeline/header';
import { TimelinePostItem } from '../../components/timeline/post';
import { privateTimeline } from "../../actions/timeline/private";
import { globalTimeline } from "../../actions/timeline/global";

export class TimelineContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notGlobalTimelineMessage: '投稿がありません。',
      notPrivateTimelineMessage: 'グローバルタイムラインからお気に入りのユーザーをみつけフォローして、あなただけのタイムラインを作りましょう！'
    };
  }

  initSetTimeline = () => {
    const params = {};
    const pathName = this.isPathPrivate() ? 'private' : 'global';
    return {
      params,
      pathName,
      accessToken: this.props.accessToken
    };
  };

  initGetPrivateTimeline = () => {
    console.log('private', this.props.privateTimeline);
    if (this.props.privateStatus !== -1) return;
    this.props.getPrivateTimeline(this.initSetTimeline());
  };

  initGetGlobalTimeline = () => {
    console.log('global', this.props.globalTimeline);
    if (this.props.globalStatus !== -1) return;
    this.props.getGlobalTimeline(this.initSetTimeline());
  };

  isPathPrivate = () => {
    return this.props.history.location.pathname.split('/')[2] === 'private';
  };

  showPostItems = () => {
    if (this.isPathPrivate()) {
      if (this.props.privateTimeline.length === 0) return <p className="pt-3 px-3">{this.state.notPrivateTimelineMessage}</p>;
      return this.props.privateTimeline.map(item => (
        <TimelinePostItem key={item.id} postItem={item} />
      ))
    } else {
      if (this.props.globalTimeline.length === 0) return <p className="pt-3 px-3">{this.state.notGlobalTimelineMessage}</p>;
      return this.props.globalTimeline.map(item => (
        <TimelinePostItem key={item.id} postItem={item} />
      ));
    }
  };

  render() {
    return (
      <div>
        {auth(this.props.accessToken)}
        {this.isPathPrivate() ? this.initGetPrivateTimeline() : this.initGetGlobalTimeline()}
        <TimelineHeader isPrivate={this.isPathPrivate()} />
        {this.showPostItems()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accessToken: state.auth.accessToken,
    status: state.error.status,
    loading: state.loading.loading,
    privateTimeline: state.privateTimeline.postList,
    privateStatus: state.privateTimeline.status,
    globalTimeline: state.globalTimeline.postList,
    globalStatus: state.globalTimeline.status,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPrivateTimeline(payload) {
      dispatch(privateTimeline(payload));
    },
    getGlobalTimeline(payload) {
      dispatch(globalTimeline(payload));
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
  privateTimeline: PropTypes.array,
  privateStatus: PropTypes.number,
  globalTimeline: PropTypes.array,
  globalStatus: PropTypes.number,
  getPrivateTimeline: PropTypes.func,
  getGlobalTimeline: PropTypes.func
};
