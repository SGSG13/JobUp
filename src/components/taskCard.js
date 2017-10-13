import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import {connect} from 'react-redux'
import {createTask, editTask, setServices, setHeight} from '../AC'
import getHeight from '../utils/getHeight'
import {taskRef, servicesRef} from '../api/firebase'

class TaskCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            date: '',
            address: '',
            serviceType: '',
            taskType: '',
            description: '',
            serverKey: '',
            validAddress: true,
            validDate: true,
            modal: false
        }
    }

    static propTypes = {
        // from connect
        action: PropTypes.string.isRequired,
        newTask: PropTypes.object.isRequired,
        services: PropTypes.array.isRequired,
        createTask: PropTypes.func.isRequired,
        setHeight: PropTypes.func.isRequired,
        editTask: PropTypes.func.isRequired,
        setServices: PropTypes.func.isRequired
    };

    componentWillMount() {
        this.setState({
            ...this.props.newTask
        })
    }

    componentDidMount() {
        servicesRef.on('value', snap => {
            let services = [];
            for (var key in snap.val()) {
                services = snap.val()[key]
            }
            this.props.setServices(services);
        });

        this.props.setHeight(getHeight());
        
    }

    componentDidUpdate () {
        this.props.setHeight(getHeight());
    }
    
    componentWillReceiveProps() {
        this.setState({
            ...this.props.newTask
        })
    }

    validation = () => {
        this.state.date === '' ? this.setState({validDate: false}) : this.setState({validDate: true});
        this.state.address === '' ? this.setState({validAddress: false}) : this.setState({validAddress: true});
        this.state.serviceType === '' ? this.setState({modal: true}) : this.setState({modal: false});
        this.state.taskType === '' ? this.setState({modal: true}) : this.setState({modal: false})
    };

    handleCreateEditTask = () => {
        this.validation();
        if (
            this.state.date === ''
            || this.state.address === ''
            || this.state.serviceType === ''
            || this.state.taskType === ''
        ) return;

        const {
            id,
            date,
            address,
            serviceType,
            taskType,
            description
        } =  this.state;

        const task = {
            id,
            date,
            address,
            serviceType,
            taskType,
            description
        };

        if(this.props.action === 'Create') {
            this.props.createTask();
            taskRef.push(task);
        } else {
            this.props.editTask();
            taskRef.child(this.state.serverKey).update({
                date,
                address,
                serviceType,
                taskType,
                description
            });
        }
    };

    handleServiceType = (serviceType) => {
        this.setState({
            serviceType
        })
    };

    handleServiceTask = (taskType) => {
        this.setState({
            taskType
        })
    };

    renderService = (services) => {
        return services.map(service => {
            return (
                <li
                    key={service.type}
                    onClick={this.handleServiceType.bind(this, service.type)}
                    className={this.state.serviceType === service.type ? 'active-service' : ''}>
                    <div className="service-img"></div>
                    <span>{service.type}</span>
                </li>
            )
        })
    };

    renderServiceTasks = (services) => {
        const {serviceType} = this.state;
        let service = services.filter(service => service.type === serviceType);
        if (service.length < 1) return;

        return service[0].tasks.map(task => {
            return (
                <li
                    key={task}
                    onClick={this.handleServiceTask.bind(this, task)}
                    className={this.state.taskType === task ? 'active-task' : ''}>
                    {task}</li>
            )
        })
    };

    hideModal = () => {
        this.setState({
            modal: false
        })
    };
    
    render() {
        return (
            <div className="task-card">
                <div className="header">
                    <h4>{this.props.action === 'Create' ? 'New' : 'Edit'} Task</h4>
                    <div className="full-description">
                        <p>
                            {this.state.serviceType === '' ? '' : 'I need a '}<b>{this.state.serviceType.toLowerCase()}</b>
                            {this.state.taskType === '' ? '' : ' to '} <b>{this.state.taskType.toLowerCase()}</b>
                            {(this.state.description === '' || this.state.serviceType === '') ? '' : ', '}<b>{this.state.description}</b>
                        </p>
                        <p className="address"> {this.state.address === '' ? '' : 'My address is '} {this.state.address}</p>
                    </div>
                    <Button className="button-create blue-btn" onClick={this.handleCreateEditTask}>{this.props.action === 'Create' ? 'Create' : 'Edit'} Task</Button>
                </div>
                <div className="location option">
                    <h4>Location</h4>
                    <div className="address">
                        <FormGroup className={!this.state.validAddress ? 'has-error': ''}>
                            <FormControl
                                name="address"
                                type="text"
                                value={this.state.address}
                                onChange={ev => this.setState({address: ev.target.value})}
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className="date option">
                    <h4>Date</h4>
                    <div className="date">
                        <FormGroup className={!this.state.validDate ? 'has-error': ''}>
                            <FormControl
                                name="date"
                                type="datetime-local"
                                value={this.state.date}
                                onChange={ev => this.setState({date: ev.target.value})}
                            />
                        </FormGroup>
                    </div>
                </div>
                <div className="service-type option">
                    <h4>Service type</h4>
                    <ul>
                        {this.renderService(this.props.services)}
                    </ul>
                </div>
                {this.state.serviceType === ''
                    ? ''
                    :
                    <div className="task-type option">
                        <h4>{this.state.serviceType} tasks</h4>
                        <ul>
                            {this.renderServiceTasks(this.props.services)}
                        </ul>
                    </div>}

                <div className="description option">
                    <h4>Task description</h4>
                    <FormGroup >
                        <FormControl
                            componentClass="textarea"
                            value={this.state.description}
                            onChange={ev => this.setState({description: ev.target.value})}
                        />
                    </FormGroup>
                </div>
                <div className="static-modal">
                    <Modal show={this.state.modal}>
                        <Modal.Header>
                            <Modal.Title>Warning!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Select service type and task
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
        newTask: state.task.newTask,
        action: state.task.action,
        services: state.task.services
    }
}, {createTask, editTask, setServices, setHeight})(TaskCard);


