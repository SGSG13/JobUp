import React, {Component} from 'react';
import Task from './task'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {newTask,  setTasks} from '../../AC'
import {taskRef} from '../../api/firebase'

class TaskList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            modal: false
        }
    }

    static propTypes = {
        // from connect
        address: PropTypes.string,
        tasks: PropTypes.array.isRequired,
        newTask: PropTypes.func.isRequired,
        setTasks: PropTypes.func.isRequired
    };

    componentDidMount() {
        taskRef.on('value', snap => {
            let tasks = [];
            snap.forEach(task => {
                const {
                    id,
                    date,
                    address,
                    location,
                    serviceType,
                    taskType,
                    description
                } = task.val();
                const serverKey = task.key;
                tasks.push({
                    id,
                    date,
                    address,
                    location,
                    serviceType,
                    taskType,
                    description,
                    serverKey
                })
            });
            this.props.setTasks(tasks);
        })
    }
    
    rednderTask = (tasks) => {
        return tasks.map(task => <Task key={task.id} data={task}/>)
    };
    
    createTask= () => {
        if(this.props.address === '' || this.props.address === undefined) {
            this.setState({
                modal: true
            });
        }else{
            this.props.newTask();
        }
    };


    hideModal = () => {
        this.setState({
            modal: false
        })
    };
    
    render() {
        return (
            <div>
                <div className="task-list">
                    <div className="add-task" onClick={this.createTask}>
                        <span>+ New Task</span>
                    </div>
                    {this.rednderTask(this.props.tasks)}
                </div>
                <div className="static-modal">
                    <Modal show={this.state.modal}>
                        <Modal.Header>
                            <Modal.Title>Warning!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Select your location on the map
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.hideModal}>Ok</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        address: state.task.newTask.address,
        tasks: state.task.tasks
    }
}, {newTask, setTasks})(TaskList);

