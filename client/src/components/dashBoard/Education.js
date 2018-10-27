import React, {Component} from 'react';
import {connect } from 'react-redux';
import Moment from 'react-moment';
import {deleteEducation} from '../../actions/profileAction';

class Education extends Component{
    onDeleteClick = (id) =>{
        this.props.deleteEducation(id);
    }
    showEducation = (education) =>(
        education.length > 0 ?
            education.map(edu =>(
                <tr key={edu._id}>
                    <td>{edu.school}</td>
                    <td>{edu.degree}</td>
                    <td>{edu.fieldofstudy}</td>                    
                    <td>
                        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                        {edu.to === null ? 'Now' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
                    </td>
                    <td>
                        <button onClick={this.onDeleteClick.bind(this, edu._id)}
                                className="btn btn-danger">
                            Delete
                        </button>
                    </td>
                </tr>
            ))
        : null
    )
    render(){
        const {education} = this.props.profile;
        return (
            <div>
                <h4 className="mb-4">Education Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Field of Study</th>
                            <th>Years</th>
                        </tr>
                        {this.showEducation(education)}
                    </thead>
                </table>
            </div>
        )
    }
}

export default connect(null, {deleteEducation})(Education);
			