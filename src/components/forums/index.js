import React, { useState, useEffect} from "react";
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Segment} from 'semantic-ui-react';
import MenuForumsComponent from '../dummy/forums/menuForumcomponent';
import ErrorComponent from '../dummy/errorComponent';
import {fetchSiteData, fetchForums, fetchTopics,
        setForumsMenuActiveIndex,
        } from '../../store/slices/forumsSlice';
import TopicsContainer from '../dummy/forums/topicContainer';

const ForumsComponent = (props) => {
    
    useEffect(() => {
        props.fetchSiteData();
      }, []);

    useEffect(() =>{
        props.siteMenuActiveIndex != null && props.fetchForums();
    }, [props.siteMenuActiveIndex]);

    useEffect(() =>{
        props.forumsMenuActiveIndex != null && props.fetchTopics();
    }, [props.forumsMenuActiveIndex]);


    const handleForumMenuItemClick = (e) =>{
        console.log('menuClick')
        props.setForumsMenuActiveIndex(parseInt(e.target.id))
    }

    return (
        <Container>
            {props.error === null ?
                <Segment.Group>
                    <MenuForumsComponent siteData={props.siteData.data}
                                        activeIndex = {props.siteMenuActiveIndex}
                                        date = {props.date}
                    />
                    <TopicsContainer forums={props.forums}
                                     activeIndex={props.forumsMenuActiveIndex}
                                     topics = {props.topics}  
                                     onMenuClick = {handleForumMenuItemClick} 
                    />
                </Segment.Group>
            : <ErrorComponent/>
        } 
        </Container>
    )
}



const mapStateToProps = (state) => {
    return {
        siteData: state.forumsSlice.siteData,
        error: state.forumsSlice.error,
        date: state.forumsSlice.date,
        siteMenuActiveIndex: state.forumsSlice.siteMenuActiveIndex,
        forumsMenuActiveIndex: state.forumsSlice.forumsMenuActiveIndex,
        forums: state.forumsSlice.forums,
        topics: state.forumsSlice.topics,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        fetchSiteData, fetchForums, fetchTopics,
        setForumsMenuActiveIndex,
      
   }, dispatch)
  }

  export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ForumsComponent));
