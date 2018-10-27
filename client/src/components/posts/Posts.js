import React, {Component} from 'react';
import {connect} from 'react-redux';

import PostForm from './PostForm';
import {getPost} from '../../actions/postAction';
import Spinner from '../utils/spinner';
import PostFeed from './PostFeed';

class Posts extends Component{
    componentDidMount(){
        this.props.getPost();
    }
    render(){
        const {isLoading, posts} = this.props.post;
        let PostsContent;
        if (isLoading === true || posts === null){
            PostsContent = <Spinner />
        } else {
            PostsContent = <PostFeed posts = {posts} /> 
        }
        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <PostForm />
                            {PostsContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.auth,
        post: state.post
    }
}
export default connect(mapStateToProps, {getPost})(Posts);
			