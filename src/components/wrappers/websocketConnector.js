import React, { Component } from 'react';
import { connect } from 'react-redux';
import { wsConnect }  from '../../store/slices/weatherSocketSlice';

class WebSocketConnection extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
      dispatch(wsConnect())
    }
  

  render() {
    return <div>{this.props.children}</div>;
  }
}

export default connect()(WebSocketConnection);