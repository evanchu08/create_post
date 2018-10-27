import React, {Component} from 'react';
import {connect} from 'react-redux';
import TextAreaFieldGroup from '../utils/textAreaGroup'
import {addPost} from '../../actions/postAction';

class PostForm extends Component{
    state = {
        text: '',
        errors: {}
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.error){
            this.setState({
                errors: nextProps.error
            })
        }
    }
    onSubmit = (e) =>{
        e.preventDefault();
        const {user} = this.props.auth
        const newPost = {
            text: this.state.text,
            name: user.name,
            avatar: user.avatar
        }
        this.props.addPost(newPost);
        this.setState({
            text: ''
        })
    }
    onChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    render(){
        const {errors} = this.state
        return (
            <div className="post-form mb-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">Say Something ... </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className = "form-group">
                                  <TextAreaFieldGroup 
                                    placeholder="Create a post"
                                    name="text"
                                    value={this.state.text}
                                    onChange={this.onChange}
                                    type ="text"
                                    className ={errors.text}
                                    errors={errors.text}                           
                                  />
                                </div>
                                <button type="submit" className="btn btn-dark">
                                    Submit
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

export default connect(mapStateToProps, {addPost})(PostForm);
			