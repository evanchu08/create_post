import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteComment} from '../../actions/postAction';

class CommentItem extends Component{
    onDeleteComment = (postId, commentId) =>{
        this.props.deleteComment(postId, commentId);
    }
    render(){
        const {comment, postId, auth} = this.props;
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <a href="profile.html">
                        <img
                            className="rounded-circle d-none d-md-block"
                            src={comment.avatar}
                            alt=""
                        />
                        </a>
                        <br />
                        <p className="text-center">{comment.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{comment.text}</p>
                        {comment.user === auth.user.id ?
                        (<button 
                            onClick={this.onDeleteComment.bind(this, postId, comment._id)}
                            type="button"
                            className ="btn btn-danger mr-1">
                            <i className="fas fa-times" />  
                            </button>  
                        )
                        : null}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.auth,
        error: state.error
    }
}

export default connect(mapStateToProps, {deleteComment})(CommentItem);

			