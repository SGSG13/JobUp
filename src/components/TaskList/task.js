import React, {Component} from 'react'
import Button from 'react-bootstrap/lib/Button'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {deleteTask, editTaskItem} from '../../AC'
import {dateToString} from '../../utils/dateToString'
import {taskRef} from '../../api/firebase'

class Task extends Component {

    static propTypes = {
        data: PropTypes.object.isRequired,
        // from connect
        deleteTask: PropTypes.func.isRequired,
        editTaskItem: PropTypes.func.isRequired
    };
    
    handledeleteTask = (key) => {
        taskRef.child(key).remove();
        this.props.deleteTask();
    };

    handleEditTask = (id) => {
        this.props.editTaskItem(id);
    };
    
    render() {
        const {data} = this.props;
        return (
                <div className="task-item">
                    <div className="task-date">{dateToString(data.date)}</div>
                    <div className="task-type">I need a {data.serviceType} to {data.taskType}</div>
                    <Button onClick={this.handleEditTask.bind(this, data.id)}>Edit</Button>
                    <Button onClick={this.handledeleteTask.bind(this, data.serverKey)}>Delete</Button>
                </div>
        );
    }
}

export default connect(null, {deleteTask, editTaskItem})(Task);




