import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {deletePost, likePost, unLikePost} from '../../actions/postAction';

class PostItem extends Component{
    onDeleteClick = (id) =>{
        this.props.deletePost(id);
    }
    unLikeClick = (id) =>{
        this.props.unLikePost(id)      
    }
    LikeClick = (id) =>{
        this.props.likePost(id)    
    }   
    findUserUnLike = (unlikes) =>{
        const {auth} = this.props;
        if (unlikes.filter(unlike => unlike.user === auth.user.id).length > 0){
            return true
        } else {
            return false;
        }
    }
    findUserLike = (likes) =>{
        const {auth} = this.props;
        if (likes.filter(like => like.user === auth.user.id).length > 0){
            return true
        } else return false
    }
    render(){
        const { post, auth, showAction} = this.props;    
        console.log(this.state)    
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                        <img
                            className="rounded-circle d-none d-md-block"
                            src={post.avatar}
                            alt=""
                        />
                        </a>
                        <br />
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{post.text}</p>
                        {showAction ? 
                            (<span>
                                <button 
                                    onClick ={this.LikeClick.bind(this, post._id)}
                                    type="button"
                                    className = "btn btn-light mr-l"
                                >
                                    <i className={classNames('fas fa-thumbs-up',
                                    {'text-info': this.findUserLike(post.likes)}
                                    )} />
                                    
                                </button>
                                <span className="badge badge-light">{post.likes.length}</span>
                                &emsp;
                                <button 
                                    onClick = {this.unLikeClick.bind(this, post._id)}
                                    type="button"
                                    className = "btn btn-light mr-l"
                                >
                                    <i className={classNames('text-secondary fas fa-thumbs-down',
                                        {'text-info': this.findUserUnLike(post.unlikes)
                                    })} />
                                    <span className="badge badge-light">{post.unlikes.length}</span>
                                </button>
                                &emsp; &emsp; &emsp;
                                <Link to = {`/post/${post._id}`} className="btn btn-info mr-l">
                                    Comments
                                </Link>
                                &emsp;
                                {post.user === auth.user.id ? (
                                    <button 
                                        onClick={this.onDeleteClick.bind(this, post._id)}
                                        type="button"
                                        className="btn btn-danger mr-l"
                                    >
                                        <i className="fas fa-times" />
                                    </button>)
                                    : null}
                                
                            </span>) : null}
                        </div>
                    </div>
                </div>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.auth,
    }
}
export default connect(mapStateToProps, {deletePost, likePost, unLikePost})(PostItem);
			




