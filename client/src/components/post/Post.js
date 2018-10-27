import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {getPostById} from '../../actions/postAction';
import Spinner from '../utils/spinner';
import CommentForm from './CommentForm';
import CommentFeed from './CommentFeed';
import PostItem from '../posts/PostItem';

class Post extends Component{
    componentDidMount(){
        this.props.getPostById(this.props.match.params.id);
    }
    render(){
        const {post, isLoading} = this.props.post;
        let postContent;
        if (isLoading || post === null || Object.keys(post).length === 0){
            postContent = <Spinner />
        } else {
            postContent = (
                <div>
                    <PostItem post={post} showAction = {false} />
                    <CommentForm postId = {post._id} />
                    <CommentFeed postId = {post._id} comments={post.comments}/>
                </div>                
            )
        }
        return (
            <div className = "post">
                <div className = "container">
                    <div className="row">
                        <div className="col-md-12">
                            <Link to="/feed" className="btn btn-light mb-3">
                                Back to Feed
                            </Link>
                            {postContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        post: state.post
    }
}
export default connect(mapStateToProps, {getPostById})(Post);