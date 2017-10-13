import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Map from './Map'
import TaskList from './TaskList'
import TaskCard from './taskCard'
import {connect} from 'react-redux'
import getHeight from '../utils/getHeight'
import {setHeight} from '../AC'

class Dashboard extends Component {
    static propTypes = {
        // from connect
        showCard: PropTypes.bool.isRequired,
        setHeight: PropTypes.func.isRequired
    };
    componentDidMount() {
        this.props.setHeight(getHeight())
    }
    
    render() {
        return (
            <div style={{height: this.props.height  || 880, position: 'relative'}}>
                <Map />
                <TaskList />
                {this.props.showCard ? <TaskCard /> : ''}
            </div>
        );
    }
}

export default connect((state) => {
    return {
        showCard: state.task.showCard,
        height: state.task.height
    }
}, {setHeight})(Dashboard);
