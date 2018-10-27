import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../utils/textAreaGroup';
import {addComment} from '../../actions/postAction'; 

class CommentForm extends Component{
    state ={
        text: '',
        errors: {}
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.error){
            this.setState({errors: nextProps.error})
        }
    }
    onSubmit = (e) =>{
        e.preventDefault();

        const {user} = this.props.auth;
        const {postId} = this.props;
        
        const newComment = {
            user: user.id,
            name: user.name,
            avatar: user.avatar,
            text: this.state.text
        }
        this.props.addComment(postId, newComment);
        this.setState({text: ''});
    }
    onChange = (e) =>{
        this.setState({[e.target.name] : e.target.value})
    }
    render(){
        const {errors} = this.state;
        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        Make a comment...
                    </div>
                    <div className="card-body">
                        <form onSubmit ={this.onSubmit}>
                            <div className="form-group">
                                <TextAreaFieldGroup 
                                    placeholder = "Reply to post"
                                    className = {errors.text}
                                    name = "text"
                                    onChange ={this.onChange}
                                    value = {this.state.text}
                                    errors = {errors.text}
                                    type="text"
                                />
                            </div>
                            <button type="submit" className="btn btn-dark">
                                Sumbit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        auth: state.auth,
        error: state.error,
        post: state.post
    }
}
export default connect(mapStateToProps, {addComment})(CommentForm);
			