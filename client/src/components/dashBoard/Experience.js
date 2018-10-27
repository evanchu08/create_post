import React, {Component} from 'react';
import Moment from 'react-moment';
import {deleteExperience} from '../../actions/profileAction';
import { connect } from 'react-redux';

class Experience extends Component{
    onDeleteClick = (id) => {
        this.props.deleteExperience(id);
    }
    showExpereince = (experience) =>(
        experience.length > 0 ?
         experience.map(exp =>(
                    <tr key={exp._id}>
                        <td>{exp.company}</td>
                        <td>{exp.title}</td>
                        <td>
                            <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                            {exp.to === null ? 'Now' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
                        </td>
                        <td>
                            <button 
                                onClick={this.onDeleteClick.bind(this, exp._id)}
                                className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                )
            )
       : null
    )
    render(){
        const {experience} = this.props.profile
        return (
            <div>
                <h4 className="mb-4">Experience Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                        </tr>
                        {this.showExpereince(experience)}
                    </thead>
                </table>
            </div>
        )
    }
}

export default connect(null, {deleteExperience})(Experience);
			